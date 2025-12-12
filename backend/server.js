const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Configuration de la base de données MySQL
const db = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'gestion_stages',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Promisify pour utiliser async/await
const promisePool = db.promise();

// Test de connexion à la base de données
db.getConnection((err, connection) => {
  if (err) {
    console.error('❌ Erreur de connexion à MySQL:', err.message);
  } else {
    console.log('✅ Connecté à la base de données MySQL');
    connection.release();
  }
});

// ==================== ROUTES API ====================

// GET - Récupérer tous les stages
app.get('/api/stages', async (req, res) => {
  try {
    const [rows] = await promisePool.query(
      'SELECT * FROM stages ORDER BY date_soumission DESC'
    );
    res.json(rows);
  } catch (error) {
    console.error('Erreur lors de la récupération des stages:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// GET - Récupérer un stage par ID
app.get('/api/stages/:id', async (req, res) => {
  try {
    const [rows] = await promisePool.query(
      'SELECT * FROM stages WHERE id = ?',
      [req.params.id]
    );
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Stage non trouvé' });
    }
    
    res.json(rows[0]);
  } catch (error) {
    console.error('Erreur lors de la récupération du stage:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// POST - Créer une nouvelle déclaration de stage
app.post('/api/stages', async (req, res) => {
  try {
    const {
      id_etudiant,
      nom_etudiant,
      email_etudiant,
      entreprise,
      sujet,
      date_debut,
      date_fin
    } = req.body;

    // Validation des champs requis
    if (!nom_etudiant || !email_etudiant || !entreprise || !sujet || !date_debut || !date_fin) {
      return res.status(400).json({ error: 'Tous les champs sont requis' });
    }

    const [result] = await promisePool.query(
      `INSERT INTO stages 
       (id_etudiant, nom_etudiant, email_etudiant, entreprise, sujet, date_debut, date_fin, statut, date_soumission) 
       VALUES (?, ?, ?, ?, ?, ?, ?, 'en attente', NOW())`,
      [id_etudiant, nom_etudiant, email_etudiant, entreprise, sujet, date_debut, date_fin]
    );

    // Récupérer le stage créé
    const [newStage] = await promisePool.query(
      'SELECT * FROM stages WHERE id = ?',
      [result.insertId]
    );

    res.status(201).json(newStage[0]);
  } catch (error) {
    console.error('Erreur lors de la création du stage:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// PUT - Mettre à jour le statut d'un stage (valider/refuser)
app.put('/api/stages/:id/status', async (req, res) => {
  try {
    const { statut } = req.body;
    const { id } = req.params;

    // Validation du statut
    if (!['en attente', 'validé', 'refusé'].includes(statut)) {
      return res.status(400).json({ error: 'Statut invalide' });
    }

    const [result] = await promisePool.query(
      'UPDATE stages SET statut = ? WHERE id = ?',
      [statut, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Stage non trouvé' });
    }

    // Récupérer le stage mis à jour
    const [updatedStage] = await promisePool.query(
      'SELECT * FROM stages WHERE id = ?',
      [id]
    );

    res.json(updatedStage[0]);
  } catch (error) {
    console.error('Erreur lors de la mise à jour du statut:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// DELETE - Supprimer un stage
app.delete('/api/stages/:id', async (req, res) => {
  try {
    const [result] = await promisePool.query(
      'DELETE FROM stages WHERE id = ?',
      [req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Stage non trouvé' });
    }

    res.json({ message: 'Stage supprimé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression du stage:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// GET - Statistiques
app.get('/api/stages/stats/summary', async (req, res) => {
  try {
    const [stats] = await promisePool.query(`
      SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN statut = 'en attente' THEN 1 ELSE 0 END) as en_attente,
        SUM(CASE WHEN statut = 'validé' THEN 1 ELSE 0 END) as valides,
        SUM(CASE WHEN statut = 'refusé' THEN 1 ELSE 0 END) as refuses
      FROM stages
    `);
    
    res.json(stats[0]);
  } catch (error) {
    console.error('Erreur lors de la récupération des statistiques:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Route par défaut
app.get('/', (req, res) => {
  res.json({ 
    message: 'API Gestion des Stages',
    version: '1.0.0',
    endpoints: {
      'GET /api/stages': 'Récupérer tous les stages',
      'GET /api/stages/:id': 'Récupérer un stage par ID',
      'POST /api/stages': 'Créer une nouvelle déclaration',
      'PUT /api/stages/:id/status': 'Mettre à jour le statut',
      'DELETE /api/stages/:id': 'Supprimer un stage',
      'GET /api/stages/stats/summary': 'Statistiques globales'
    }
  });
});

// Gestion des erreurs 404
app.use((req, res) => {
  res.status(404).json({ error: 'Route non trouvée' });
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
});
