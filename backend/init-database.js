const mysql = require('mysql2');
require('dotenv').config();

// Connexion pour créer la base de données
const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  multipleStatements: true
});

const SQL_INIT = `
-- Créer la base de données si elle n'existe pas
CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME || 'gestion_stages'} 
CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE ${process.env.DB_NAME || 'gestion_stages'};

-- Table users (optionnel pour l'authentification future)
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  role ENUM('etudiant', 'admin') NOT NULL DEFAULT 'etudiant',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_role (role)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table stages (déclarations de stage)
CREATE TABLE IF NOT EXISTS stages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_etudiant VARCHAR(100) NOT NULL,
  nom_etudiant VARCHAR(255) NOT NULL,
  email_etudiant VARCHAR(255) NOT NULL,
  entreprise VARCHAR(255) NOT NULL,
  sujet TEXT NOT NULL,
  date_debut DATE NOT NULL,
  date_fin DATE NOT NULL,
  statut ENUM('en attente', 'validé', 'refusé') NOT NULL DEFAULT 'en attente',
  date_soumission TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_statut (statut),
  INDEX idx_etudiant (id_etudiant),
  INDEX idx_email (email_etudiant),
  INDEX idx_date_soumission (date_soumission)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insertion de données de test
INSERT INTO stages (id_etudiant, nom_etudiant, email_etudiant, entreprise, sujet, date_debut, date_fin, statut, date_soumission) VALUES
('ETU001', 'Sophie Bernard', 'sophie.bernard@ecole.fr', 'TechSolutions SA', 'Développement d''une application web de gestion avec React et Node.js. Participation à la conception de l''architecture et aux tests.', '2025-02-01', '2025-07-31', 'en attente', '2024-12-10 09:30:00'),
('ETU002', 'Thomas Dubois', 'thomas.dubois@ecole.fr', 'Innovation Labs', 'Stage en data science : analyse de données, création de modèles prédictifs et visualisation avec Python.', '2025-03-01', '2025-08-31', 'validé', '2024-12-08 14:15:00'),
('ETU003', 'Emma Martin', 'emma.martin@ecole.fr', 'Digital Agency', 'Design UI/UX pour applications mobiles. Création de maquettes, prototypes interactifs et tests utilisateurs.', '2025-01-15', '2025-04-15', 'en attente', '2024-12-11 16:45:00'),
('ETU004', 'Lucas Petit', 'lucas.petit@ecole.fr', 'StartupTech', 'Développement mobile avec React Native. Intégration d''APIs REST et gestion d''état avec Redux.', '2025-02-15', '2025-05-15', 'validé', '2024-12-09 11:20:00'),
('ETU005', 'Chloé Moreau', 'chloe.moreau@ecole.fr', 'Consulting Group', 'Analyse de processus métier et optimisation. Participation aux missions de conseil client.', '2025-03-10', '2025-09-10', 'refusé', '2024-12-07 15:30:00')
ON DUPLICATE KEY UPDATE id=id;

-- Insertion d'utilisateurs de test (optionnel)
INSERT INTO users (nom, email, role) VALUES
('Admin System', 'admin@ecole.fr', 'admin'),
('Sophie Bernard', 'sophie.bernard@ecole.fr', 'etudiant'),
('Thomas Dubois', 'thomas.dubois@ecole.fr', 'etudiant'),
('Emma Martin', 'emma.martin@ecole.fr', 'etudiant')
ON DUPLICATE KEY UPDATE id=id;
`;

console.log('🔄 Initialisation de la base de données...\n');

connection.query(SQL_INIT, (err, results) => {
  if (err) {
    console.error('❌ Erreur lors de l\'initialisation:', err.message);
    process.exit(1);
  }

  console.log('✅ Base de données créée avec succès');
  console.log('✅ Tables créées avec succès');
  console.log('✅ Données de test insérées\n');
  console.log('📊 Base de données prête à être utilisée!\n');

  connection.end();
});
