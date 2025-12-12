# 📁 Structure Complète du Projet

## Vue d'ensemble

```
plateforme-gestion-stages/
│
├── 📂 backend/                          # Backend Express.js + MySQL
│   ├── server.js                        # Serveur principal Express
│   ├── init-database.js                 # Script d'initialisation DB
│   ├── database.sql                     # Script SQL complet
│   ├── package.json                     # Dépendances backend
│   ├── .env.example                     # Exemple de configuration
│   ├── .env                            # Configuration (à créer)
│   ├── .gitignore                      # Fichiers ignorés par git
│   └── README.md                       # Documentation backend
│
├── 📂 src/                              # Frontend React + TypeScript
│   ├── 📂 app/
│   │   ├── App.tsx                      # Composant principal
│   │   ├── 📂 components/
│   │   │   ├── student-view.tsx         # Interface étudiant
│   │   │   ├── admin-view.tsx           # Interface administration
│   │   │   └── 📂 ui/                   # Composants UI (shadcn/ui)
│   │   │       ├── button.tsx
│   │   │       ├── card.tsx
│   │   │       ├── input.tsx
│   │   │       ├── label.tsx
│   │   │       ├── textarea.tsx
│   │   │       ├── table.tsx
│   │   │       ├── badge.tsx
│   │   │       ├── sonner.tsx
│   │   │       ├── tabs.tsx
│   │   │       └── ... (autres composants)
│   │   └── 📂 services/
│   │       └── api.ts                   # Service API REST
│   │
│   └── 📂 styles/
│       ├── fonts.css                    # Polices personnalisées
│       ├── index.css                    # Styles principaux
│       ├── tailwind.css                 # Configuration Tailwind
│       └── theme.css                    # Thème et variables CSS
│
├── 📂 node_modules/                     # Dépendances (généré)
│
├── 📄 package.json                      # Dépendances frontend
├── 📄 package-lock.json                 # Verrouillage des versions
├── 📄 vite.config.ts                    # Configuration Vite
├── 📄 postcss.config.mjs                # Configuration PostCSS
├── 📄 tsconfig.json                     # Configuration TypeScript
│
├── 📄 .env.example                      # Exemple config frontend
├── 📄 .env                             # Config frontend (à créer)
├── 📄 .gitignore                       # Fichiers ignorés
│
├── 📄 INSTALLATION.md                   # Guide d'installation
├── 📄 PROJECT_STRUCTURE.md              # Ce fichier
└── 📄 README.md                         # Documentation principale
```

## 📊 Détails des Fichiers Principaux

### Backend (Node.js + Express + MySQL)

#### `backend/server.js` (206 lignes)
- Serveur Express.js principal
- Configuration MySQL avec pool de connexions
- Routes API RESTful pour CRUD stages
- Middleware CORS et JSON
- Gestion d'erreurs

**Endpoints:**
- `GET /api/stages` - Liste tous les stages
- `GET /api/stages/:id` - Stage par ID
- `POST /api/stages` - Créer un stage
- `PUT /api/stages/:id/status` - Modifier statut
- `DELETE /api/stages/:id` - Supprimer un stage
- `GET /api/stages/stats/summary` - Statistiques

#### `backend/init-database.js` (80 lignes)
- Script d'initialisation automatique
- Crée la base de données
- Crée les tables (users, stages)
- Insert des données de test
- Gestion des erreurs

#### `backend/database.sql` (250+ lignes)
- Script SQL complet et documenté
- Création de tables avec indexes
- Vues pour statistiques
- Procédures stockées
- Triggers de validation
- Données de test

### Frontend (React + TypeScript + Tailwind)

#### `src/app/App.tsx` (250 lignes)
- Composant racine de l'application
- Gestion de l'état global
- Sélection de rôle (Étudiant/Admin)
- Appels API vers le backend
- Gestion des erreurs et loading

**Fonctionnalités:**
- ✅ Écran de sélection de rôle
- ✅ Chargement des données depuis l'API
- ✅ Gestion des erreurs réseau
- ✅ Notifications toast

#### `src/app/components/student-view.tsx` (249 lignes)
Interface pour les étudiants:
- ✅ Formulaire de déclaration de stage
- ✅ Liste des déclarations personnelles
- ✅ Affichage du statut de validation
- ✅ Validation des champs

#### `src/app/components/admin-view.tsx` (210 lignes)
Interface pour l'administration:
- ✅ Dashboard avec statistiques
- ✅ Tableau de toutes les déclarations
- ✅ Boutons Valider/Refuser
- ✅ Filtrage et tri
- ✅ Indicateurs visuels

#### `src/app/services/api.ts` (95 lignes)
Service de communication avec l'API:
- ✅ Méthodes GET, POST, PUT, DELETE
- ✅ Gestion des erreurs HTTP
- ✅ TypeScript typé
- ✅ Configuration dynamique de l'URL

### Configuration

#### `package.json` (racine)
Dépendances frontend:
- React 18.3.1
- TypeScript
- Tailwind CSS 4.1.12
- Vite 6.3.5
- Radix UI (composants)
- Lucide React (icônes)
- Sonner (notifications)

#### `backend/package.json`
Dépendances backend:
- Express.js 4.18.2
- MySQL2 3.6.5
- CORS 2.8.5
- dotenv 16.3.1
- nodemon 3.0.2 (dev)

#### `vite.config.ts`
- Plugin React
- Plugin Tailwind CSS
- Alias de chemins
- Configuration du build

#### `.env` files
Variables d'environnement:

**Backend (.env):**
```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=xxx
DB_NAME=gestion_stages
```

**Frontend (.env):**
```env
VITE_API_URL=http://localhost:5000/api
```

## 📈 Flux de Données

```
┌─────────────┐         HTTP/REST        ┌─────────────┐
│             │ ───────────────────────> │             │
│   React     │   GET /api/stages        │  Express    │
│  Frontend   │   POST /api/stages       │   Backend   │
│             │ <─────────────────────── │             │
└─────────────┘         JSON             └─────────────┘
                                                 │
                                                 │ SQL
                                                 ▼
                                          ┌─────────────┐
                                          │    MySQL    │
                                          │  Database   │
                                          └─────────────┘
```

## 🗄️ Schéma de Base de Données

```
┌─────────────────────────────────────────────────────────┐
│                     Table: stages                       │
├──────────────┬──────────────────┬─────────────────────┤
│ Champ        │ Type             │ Description          │
├──────────────┼──────────────────┼─────────────────────┤
│ id           │ INT (PK, AI)     │ ID unique            │
│ id_etudiant  │ VARCHAR(100)     │ ID de l'étudiant     │
│ nom_etudiant │ VARCHAR(255)     │ Nom complet          │
│ email_etud.  │ VARCHAR(255)     │ Email                │
│ entreprise   │ VARCHAR(255)     │ Nom entreprise       │
│ sujet        │ TEXT             │ Description stage    │
│ date_debut   │ DATE             │ Date de début        │
│ date_fin     │ DATE             │ Date de fin          │
│ statut       │ ENUM             │ en attente/validé/   │
│              │                  │ refusé               │
│ date_soum.   │ TIMESTAMP        │ Date soumission      │
│ updated_at   │ TIMESTAMP        │ Dernière MAJ         │
└──────────────┴──────────────────┴─────────────────────┘

Index:
- idx_statut (statut)
- idx_etudiant (id_etudiant)
- idx_email (email_etudiant)
- idx_date_soumission (date_soumission)
```

## 🎨 Stack Technologique

### Frontend
- **Framework:** React 18.3.1
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4.1.12
- **Build Tool:** Vite 6.3.5
- **UI Components:** Radix UI + shadcn/ui
- **Icons:** Lucide React
- **Notifications:** Sonner

### Backend
- **Runtime:** Node.js (v14+)
- **Framework:** Express.js 4.18.2
- **Database:** MySQL 5.7+ / 8.0
- **ORM:** MySQL2 (driver natif)
- **Environment:** dotenv

### DevOps
- **Version Control:** Git
- **Package Manager:** npm
- **Dev Server:** Vite (Frontend), Nodemon (Backend)

## 📦 Tailles Approximatives

```
backend/node_modules/     ~50 MB
node_modules/            ~400 MB
src/                      ~2 MB
backend/ (code)          ~15 KB
Total (sans deps)        ~2-3 MB
Total (avec deps)        ~450 MB
```

## 🚀 Commandes Principales

### Installation
```bash
# Backend
cd backend && npm install

# Frontend
npm install
```

### Développement
```bash
# Backend (terminal 1)
cd backend && npm run dev

# Frontend (terminal 2)
npm run dev
```

### Production
```bash
# Backend
cd backend && npm start

# Frontend
npm run build
npm run preview
```

### Base de données
```bash
# Initialiser
cd backend && npm run init-db

# Accéder à MySQL
mysql -u root -p gestion_stages
```

## 📚 Documentation

- `INSTALLATION.md` - Guide d'installation pas à pas
- `backend/README.md` - Documentation API backend
- `PROJECT_STRUCTURE.md` - Ce fichier
- `README.md` - Documentation générale du projet

## 🔐 Sécurité

**Fichiers sensibles à ne PAS commit:**
- `backend/.env`
- `.env`
- `node_modules/`
- `backend/node_modules/`

**Fichiers à commit:**
- `.env.example`
- `backend/.env.example`
- Tous les fichiers de code source

## 🎯 Points d'Entrée

| Type | Fichier | Description |
|------|---------|-------------|
| Frontend | `src/app/App.tsx` | Point d'entrée React |
| Backend | `backend/server.js` | Serveur Express |
| Base de données | `backend/database.sql` | Script SQL |
| Styles | `src/styles/index.css` | Styles globaux |
| API | `src/app/services/api.ts` | Client API |

---

**Version:** 1.0.0  
**Dernière mise à jour:** Décembre 2024
