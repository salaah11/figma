# Backend Express.js - Gestion des Stages

API REST pour la gestion des déclarations de stages étudiants.

## 🚀 Installation

### Prérequis

- Node.js (v14 ou supérieur)
- MySQL (v5.7 ou supérieur)
- npm ou yarn

### Étapes d'installation

1. **Installer les dépendances**
```bash
cd backend
npm install
```

2. **Configurer les variables d'environnement**
```bash
# Copier le fichier .env.example
cp .env.example .env

# Éditer le fichier .env avec vos informations
nano .env
```

3. **Créer la base de données**
```bash
# Option 1 : Utiliser le script d'initialisation
npm run init-db

# Option 2 : Manuellement avec MySQL
mysql -u root -p
CREATE DATABASE gestion_stages CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

4. **Démarrer le serveur**
```bash
# Mode développement (avec nodemon)
npm run dev

# Mode production
npm start
```

Le serveur démarre sur `http://localhost:5000`

## 📊 Structure de la Base de Données

### Table: `users` (optionnel)
```sql
id          INT PRIMARY KEY AUTO_INCREMENT
nom         VARCHAR(255)
email       VARCHAR(255) UNIQUE
role        ENUM('etudiant', 'admin')
created_at  TIMESTAMP
```

### Table: `stages` (principale)
```sql
id               INT PRIMARY KEY AUTO_INCREMENT
id_etudiant      VARCHAR(100)
nom_etudiant     VARCHAR(255)
email_etudiant   VARCHAR(255)
entreprise       VARCHAR(255)
sujet            TEXT
date_debut       DATE
date_fin         DATE
statut           ENUM('en attente', 'validé', 'refusé')
date_soumission  TIMESTAMP
updated_at       TIMESTAMP
```

## 🔌 Endpoints API

### 1. Récupérer tous les stages
```http
GET /api/stages
```

**Réponse:**
```json
[
  {
    "id": 1,
    "id_etudiant": "ETU001",
    "nom_etudiant": "Sophie Bernard",
    "email_etudiant": "sophie.bernard@ecole.fr",
    "entreprise": "TechSolutions SA",
    "sujet": "Développement web...",
    "date_debut": "2025-02-01",
    "date_fin": "2025-07-31",
    "statut": "en attente",
    "date_soumission": "2024-12-10T09:30:00.000Z"
  }
]
```

### 2. Récupérer un stage par ID
```http
GET /api/stages/:id
```

### 3. Créer une nouvelle déclaration
```http
POST /api/stages
Content-Type: application/json

{
  "id_etudiant": "ETU123",
  "nom_etudiant": "Jean Dupont",
  "email_etudiant": "jean.dupont@ecole.fr",
  "entreprise": "Ma Company",
  "sujet": "Description du stage...",
  "date_debut": "2025-03-01",
  "date_fin": "2025-08-31"
}
```

### 4. Mettre à jour le statut
```http
PUT /api/stages/:id/status
Content-Type: application/json

{
  "statut": "validé"
}
```

Statuts possibles: `"en attente"`, `"validé"`, `"refusé"`

### 5. Supprimer un stage
```http
DELETE /api/stages/:id
```

### 6. Obtenir les statistiques
```http
GET /api/stages/stats/summary
```

**Réponse:**
```json
{
  "total": 5,
  "en_attente": 2,
  "valides": 2,
  "refuses": 1
}
```

## 🔧 Configuration

### Variables d'environnement (.env)

```env
PORT=5000                    # Port du serveur
DB_HOST=localhost            # Hôte MySQL
DB_USER=root                 # Utilisateur MySQL
DB_PASSWORD=votre_password   # Mot de passe MySQL
DB_NAME=gestion_stages       # Nom de la base de données
```

## 🧪 Test de l'API

### Avec cURL

```bash
# Récupérer tous les stages
curl http://localhost:5000/api/stages

# Créer un stage
curl -X POST http://localhost:5000/api/stages \
  -H "Content-Type: application/json" \
  -d '{
    "id_etudiant": "ETU999",
    "nom_etudiant": "Test User",
    "email_etudiant": "test@ecole.fr",
    "entreprise": "Test Company",
    "sujet": "Stage de test",
    "date_debut": "2025-06-01",
    "date_fin": "2025-12-31"
  }'

# Valider un stage
curl -X PUT http://localhost:5000/api/stages/1/status \
  -H "Content-Type: application/json" \
  -d '{"statut": "validé"}'
```

### Avec Postman

1. Importer la collection depuis `/backend/postman_collection.json` (à créer)
2. Tester les différents endpoints

## 🛡️ Sécurité (À implémenter)

Pour la production, pensez à ajouter:

- ✅ Authentification JWT
- ✅ Validation des données (express-validator)
- ✅ Rate limiting (express-rate-limit)
- ✅ Helmet.js pour les headers de sécurité
- ✅ Encryption des mots de passe (bcrypt)
- ✅ Variables d'environnement sécurisées

## 📝 Logs

Les logs sont affichés dans la console. Pour la production, utilisez un système de logging comme:
- Winston
- Morgan
- Bunyan

## 🐛 Débogage

```bash
# Vérifier la connexion MySQL
mysql -u root -p -e "SHOW DATABASES;"

# Vérifier les tables
mysql -u root -p gestion_stages -e "SHOW TABLES;"

# Voir les données
mysql -u root -p gestion_stages -e "SELECT * FROM stages;"
```

## 📦 Scripts npm

```bash
npm start        # Démarrer en production
npm run dev      # Démarrer en développement (nodemon)
npm run init-db  # Initialiser la base de données
```

## 🤝 Support

Pour toute question ou problème, consultez la documentation ou créez une issue.
