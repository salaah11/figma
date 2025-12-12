# 🎓 Plateforme de Déclaration & Suivi de Stages

Une application web complète pour la gestion des déclarations de stages étudiants avec interface étudiant et administration.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![React](https://img.shields.io/badge/React-18.3.1-61dafb.svg)
![Express](https://img.shields.io/badge/Express-4.18.2-green.svg)
![MySQL](https://img.shields.io/badge/MySQL-8.0-orange.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)

## 📋 Table des Matières

- [Aperçu](#-aperçu)
- [Fonctionnalités](#-fonctionnalités)
- [Technologies](#-technologies)
- [Installation](#-installation)
- [Utilisation](#-utilisation)
- [API Documentation](#-api-documentation)
- [Structure du Projet](#-structure-du-projet)
- [Screenshots](#-screenshots)
- [Contribution](#-contribution)
- [Licence](#-licence)

## 🎯 Aperçu

Cette plateforme permet aux étudiants de déclarer leurs stages et à l'administration de valider ou refuser ces déclarations. L'application offre deux interfaces distinctes sans nécessiter d'authentification.

### Problème résolu

Les étudiants doivent effectuer un stage pendant leur formation. L'administration doit suivre les déclarations de stages et les valider. Cette application centralise et simplifie ce processus.

### Solution proposée

- Interface étudiant intuitive pour déclarer un stage
- Interface administration pour gérer et valider les déclarations
- Base de données MySQL pour la persistance
- API REST pour la communication client-serveur
- Design moderne et responsive

## ✨ Fonctionnalités

### 👨‍🎓 Interface Étudiant

- ✅ Déclarer un nouveau stage (entreprise, sujet, dates)
- ✅ Consulter toutes ses déclarations
- ✅ Voir le statut de chaque déclaration (en attente, validé, refusé)
- ✅ Affichage des détails complets de chaque stage
- ✅ Interface intuitive et responsive

### 👨‍💼 Interface Administration

- ✅ Voir la liste complète de tous les stages déclarés
- ✅ Dashboard avec statistiques en temps réel
- ✅ Valider les stages en attente
- ✅ Refuser les stages inadéquats
- ✅ Filtrage et tri des déclarations
- ✅ Indicateurs visuels par statut

### 🔧 Fonctionnalités Générales

- ✅ Pas d'authentification requise (sélection de rôle)
- ✅ Stockage persistant dans MySQL
- ✅ Notifications en temps réel (toast)
- ✅ Design responsive (mobile + desktop)
- ✅ Gestion d'erreurs robuste
- ✅ Données de démonstration incluses

## 🛠️ Technologies

### Frontend

- **React** 18.3.1 - Framework UI
- **TypeScript** - Typage statique
- **Tailwind CSS** 4.1.12 - Framework CSS
- **Vite** 6.3.5 - Build tool
- **Radix UI** - Composants accessibles
- **Lucide React** - Icônes
- **Sonner** - Notifications toast

### Backend

- **Node.js** - Runtime JavaScript
- **Express.js** 4.18.2 - Framework web
- **MySQL** 8.0 - Base de données
- **MySQL2** - Driver MySQL
- **CORS** - Gestion des requêtes cross-origin
- **dotenv** - Variables d'environnement

## 🚀 Installation

### Prérequis

- Node.js (v14 ou supérieur)
- MySQL (v5.7 ou supérieur)
- npm ou yarn

### Installation Rapide

```bash
# 1. Cloner le projet
git clone <url-du-projet>
cd plateforme-gestion-stages

# 2. Installer les dépendances backend
cd backend
npm install

# 3. Configurer la base de données
cp .env.example .env
# Éditer .env avec vos identifiants MySQL
npm run init-db

# 4. Démarrer le backend
npm run dev

# 5. Dans un nouveau terminal, installer le frontend
cd ..
npm install

# 6. Démarrer le frontend
npm run dev
```

L'application est maintenant accessible sur **http://localhost:5173**

📖 **Pour un guide détaillé, consultez [INSTALLATION.md](INSTALLATION.md)**

## 📖 Utilisation

### Démarrage

1. **Démarrer le backend** (Terminal 1)
```bash
cd backend
npm run dev
```

2. **Démarrer le frontend** (Terminal 2)
```bash
npm run dev
```

3. **Accéder à l'application**
   - Ouvrir http://localhost:5173
   - Choisir votre rôle (Étudiant ou Administration)

### Interface Étudiant

1. Cliquer sur "Interface Étudiant"
2. Cliquer sur "Déclarer un stage"
3. Remplir le formulaire
4. Soumettre la déclaration
5. Consulter le statut dans la liste

### Interface Administration

1. Cliquer sur "Interface Administration"
2. Consulter le dashboard et les statistiques
3. Parcourir la liste des déclarations
4. Cliquer sur "Valider" ou "Refuser" pour chaque stage

## 🔌 API Documentation

### Base URL

```
http://localhost:5000/api
```

### Endpoints

#### GET /api/stages
Récupérer tous les stages

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

#### POST /api/stages
Créer une nouvelle déclaration

**Body:**
```json
{
  "id_etudiant": "ETU123",
  "nom_etudiant": "Jean Dupont",
  "email_etudiant": "jean.dupont@ecole.fr",
  "entreprise": "Ma Company",
  "sujet": "Description...",
  "date_debut": "2025-03-01",
  "date_fin": "2025-08-31"
}
```

#### PUT /api/stages/:id/status
Mettre à jour le statut

**Body:**
```json
{
  "statut": "validé"
}
```

#### DELETE /api/stages/:id
Supprimer un stage

#### GET /api/stages/stats/summary
Obtenir les statistiques

**Réponse:**
```json
{
  "total": 5,
  "en_attente": 2,
  "valides": 2,
  "refuses": 1
}
```

📖 **Documentation complète de l'API: [backend/README.md](backend/README.md)**

## 📁 Structure du Projet

```
plateforme-gestion-stages/
├── backend/              # Backend Express.js
│   ├── server.js         # Serveur principal
│   ├── init-database.js  # Init base de données
│   ├── database.sql      # Script SQL
│   └── package.json      # Dépendances backend
├── src/                  # Frontend React
│   ├── app/
│   │   ├── App.tsx       # Composant principal
│   │   ├── components/   # Composants React
│   │   └── services/     # Services API
│   └── styles/           # Fichiers CSS
├── package.json          # Dépendances frontend
└── vite.config.ts        # Config Vite
```

📖 **Structure complète: [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)**

## 📊 Base de Données

### Schéma Principal

**Table: stages**

| Champ           | Type        | Description              |
|-----------------|-------------|--------------------------|
| id              | INT         | Identifiant unique       |
| id_etudiant     | VARCHAR     | ID de l'étudiant         |
| nom_etudiant    | VARCHAR     | Nom complet              |
| email_etudiant  | VARCHAR     | Email                    |
| entreprise      | VARCHAR     | Nom de l'entreprise      |
| sujet           | TEXT        | Description du stage     |
| date_debut      | DATE        | Date de début            |
| date_fin        | DATE        | Date de fin              |
| statut          | ENUM        | en attente/validé/refusé |
| date_soumission | TIMESTAMP   | Date de soumission       |

### Index

- `idx_statut` - Performance sur les requêtes par statut
- `idx_etudiant` - Recherche par étudiant
- `idx_email` - Recherche par email
- `idx_date_soumission` - Tri chronologique

## 🖼️ Screenshots

### Écran de Sélection
<img src="docs/screenshots/selection.png" width="600" alt="Écran de sélection">

### Interface Étudiant
<img src="docs/screenshots/etudiant.png" width="600" alt="Interface étudiant">

### Interface Administration
<img src="docs/screenshots/admin.png" width="600" alt="Interface administration">

## 🧪 Tests

```bash
# Tester l'API backend
curl http://localhost:5000/api/stages

# Créer un stage via API
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
```

## 🐛 Dépannage

### Le backend ne démarre pas

```bash
# Vérifier MySQL
mysql -u root -p -e "SELECT 1;"

# Réinitialiser la base de données
cd backend
npm run init-db
```

### Erreur "Cannot connect to MySQL"

Vérifier le fichier `backend/.env`:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=votre_mot_de_passe
DB_NAME=gestion_stages
```

### Port déjà utilisé

Changer le port dans `backend/.env`:
```env
PORT=5001
```

Puis mettre à jour `.env` à la racine:
```env
VITE_API_URL=http://localhost:5001/api
```

## 📝 Scripts Disponibles

### Backend

```bash
npm start          # Démarrer en production
npm run dev        # Démarrer en dev (nodemon)
npm run init-db    # Initialiser la base de données
```

### Frontend

```bash
npm run dev        # Démarrer en développement
npm run build      # Build pour production
npm run preview    # Prévisualiser le build
```

## 🔐 Sécurité

⚠️ **Cette configuration est pour le développement uniquement !**

Pour la production, implémentez :

- ✅ Authentification JWT
- ✅ HTTPS/SSL
- ✅ Rate limiting
- ✅ Validation des données
- ✅ Helmet.js
- ✅ Protection CSRF
- ✅ Encryption des données sensibles

## 🚢 Déploiement

### Frontend (Vercel/Netlify)

```bash
npm run build
# Déployer le dossier dist/
```

### Backend (Heroku/Railway/Render)

```bash
cd backend
# Ajouter les variables d'environnement
# Déployer avec git
```

### Base de données

- Utiliser un service cloud MySQL (PlanetScale, AWS RDS, etc.)
- Mettre à jour les variables d'environnement

## 🤝 Contribution

Les contributions sont les bienvenues !

1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit (`git commit -m 'Add AmazingFeature'`)
4. Push (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 👥 Auteurs

- **Votre Nom** - Développement initial

## 🙏 Remerciements

- Radix UI pour les composants accessibles
- Tailwind CSS pour le framework CSS
- shadcn/ui pour les composants UI
- La communauté open source

## 📞 Support

Pour toute question ou problème :

- 📧 Email: support@example.com
- 🐛 Issues: [GitHub Issues](https://github.com/...)
- 📖 Documentation: Consultez les fichiers .md du projet

## 🗺️ Roadmap

- [ ] Authentification JWT
- [ ] Export PDF des déclarations
- [ ] Envoi d'emails automatiques
- [ ] Tableau de bord avancé
- [ ] Filtres et recherche avancée
- [ ] Upload de documents (convention de stage)
- [ ] Historique des modifications
- [ ] Multi-langue (i18n)

## 📊 Statistiques du Projet

- **Lignes de code:** ~2000+
- **Composants React:** 15+
- **Endpoints API:** 6
- **Tables de base de données:** 2
- **Tests:** À venir

---

**Fait avec ❤️ par [Votre Nom]**

*Dernière mise à jour: Décembre 2024*
