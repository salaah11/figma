# 📦 Guide d'Installation Complet - Plateforme de Gestion des Stages

Ce guide vous accompagne pas à pas pour installer et démarrer l'application complète (Frontend + Backend).

## 🎯 Architecture du Projet

```
projet-stages/
├── backend/              # Serveur Express.js + MySQL
│   ├── server.js
│   ├── init-database.js
│   ├── package.json
│   └── .env
├── src/                  # Frontend React + TypeScript
│   ├── app/
│   │   ├── App.tsx
│   │   ├── components/
│   │   └── services/
│   └── styles/
├── package.json
└── vite.config.ts
```

## 📋 Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- **Node.js** (v14 ou supérieur) - [Télécharger](https://nodejs.org/)
- **MySQL** (v5.7 ou supérieur) - [Télécharger](https://dev.mysql.com/downloads/)
- **npm** ou **yarn** (inclus avec Node.js)
- Un éditeur de code (VS Code recommandé)

### Vérifier les installations

```bash
node --version    # Doit afficher v14.x ou supérieur
npm --version     # Doit afficher 6.x ou supérieur
mysql --version   # Doit afficher MySQL
```

## 🚀 Installation

### Étape 1 : Cloner ou télécharger le projet

```bash
# Si vous utilisez git
git clone <url-du-projet>
cd projet-stages

# Ou décompressez simplement le dossier téléchargé
```

### Étape 2 : Configuration de la Base de Données MySQL

#### 2.1 Démarrer MySQL

```bash
# Windows (dans Services ou)
net start MySQL80

# macOS
mysql.server start

# Linux
sudo systemctl start mysql
```

#### 2.2 Se connecter à MySQL

```bash
mysql -u root -p
# Entrez votre mot de passe root
```

#### 2.3 Créer la base de données (Optionnel)

```sql
CREATE DATABASE gestion_stages CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
exit;
```

> **Note :** Cette étape est optionnelle car le script d'initialisation le fera automatiquement.

### Étape 3 : Configuration du Backend

#### 3.1 Installer les dépendances du backend

```bash
cd backend
npm install
```

#### 3.2 Configurer les variables d'environnement

```bash
# Copier le fichier exemple
cp .env.example .env

# Éditer le fichier .env
nano .env  # ou utilisez votre éditeur préféré
```

**Contenu du fichier `.env` :**

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=votre_mot_de_passe_mysql
DB_NAME=gestion_stages
```

> ⚠️ **Important :** Remplacez `votre_mot_de_passe_mysql` par votre vrai mot de passe MySQL root.

#### 3.3 Initialiser la base de données

```bash
npm run init-db
```

Vous devriez voir :

```
✅ Base de données créée avec succès
✅ Tables créées avec succès
✅ Données de test insérées
📊 Base de données prête à être utilisée!
```

#### 3.4 Démarrer le serveur backend

```bash
# Mode développement (avec rechargement automatique)
npm run dev

# OU mode production
npm start
```

Vous devriez voir :

```
✅ Connecté à la base de données MySQL
🚀 Serveur démarré sur http://localhost:5000
```

**Gardez cette fenêtre de terminal ouverte !**

### Étape 4 : Configuration du Frontend

#### 4.1 Ouvrir un nouveau terminal

Ouvrez un **nouveau** terminal (gardez le backend en cours d'exécution).

```bash
# Retournez à la racine du projet
cd ..  # Si vous êtes dans /backend
```

#### 4.2 Installer les dépendances du frontend

```bash
npm install
```

#### 4.3 Configurer l'URL de l'API (Optionnel)

```bash
# Créer le fichier .env à la racine
cp .env.example .env
```

**Contenu du fichier `.env` (racine) :**

```env
VITE_API_URL=http://localhost:5000/api
```

> Par défaut, l'application utilisera déjà cette URL.

#### 4.4 Démarrer le frontend

```bash
npm run dev
```

Vous devriez voir :

```
  VITE v6.x.x  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### Étape 5 : Accéder à l'application

Ouvrez votre navigateur et allez sur :

🌐 **http://localhost:5173**

Vous devriez voir l'écran de sélection de rôle (Étudiant ou Administration).

## ✅ Vérification de l'Installation

### Test 1 : Backend

Ouvrez un navigateur ou utilisez curl :

```bash
curl http://localhost:5000/api/stages
```

Vous devriez voir un tableau JSON avec les stages de test.

### Test 2 : Frontend

1. Accédez à http://localhost:5173
2. Cliquez sur "Interface Étudiant"
3. Vous devriez voir les stages de test
4. Essayez de déclarer un nouveau stage

### Test 3 : Communication Frontend ↔ Backend

1. En mode Étudiant, créez un nouveau stage
2. Passez en mode Administration
3. Le nouveau stage doit apparaître dans la liste
4. Validez-le
5. Revenez en mode Étudiant
6. Le stage doit avoir le statut "validé"

## 🐛 Résolution des Problèmes

### Problème : "Cannot connect to MySQL"

**Solution :**
```bash
# Vérifier que MySQL est démarré
mysql -u root -p -e "SELECT 1;"

# Vérifier les identifiants dans backend/.env
cat backend/.env
```

### Problème : "Port 5000 already in use"

**Solution :**
```bash
# Changer le port dans backend/.env
PORT=5001

# Puis mettre à jour l'URL dans frontend/.env
VITE_API_URL=http://localhost:5001/api

# Redémarrer les deux serveurs
```

### Problème : "Network Error" dans le navigateur

**Solutions :**

1. Vérifier que le backend tourne (localhost:5000)
2. Vérifier les CORS dans `backend/server.js`
3. Ouvrir la console du navigateur (F12) pour voir l'erreur exacte

### Problème : "Table doesn't exist"

**Solution :**
```bash
cd backend
npm run init-db
```

### Problème : Frontend ne charge pas les données

**Solution :**

1. Ouvrir la console du navigateur (F12)
2. Onglet "Network" → Voir les requêtes HTTP
3. Vérifier que l'URL de l'API est correcte dans `.env`

## 📊 Structure des Ports

| Service | Port | URL |
|---------|------|-----|
| Frontend (Vite) | 5173 | http://localhost:5173 |
| Backend (Express) | 5000 | http://localhost:5000 |
| MySQL | 3306 | localhost:3306 |

## 🔒 Sécurité (Pour Production)

⚠️ **Cette configuration est pour le développement uniquement !**

Pour la production, ajoutez :

1. ✅ Authentification JWT
2. ✅ HTTPS/SSL
3. ✅ Variables d'environnement sécurisées
4. ✅ Rate limiting
5. ✅ Validation des données
6. ✅ Helmet.js pour les headers
7. ✅ Protection CSRF

## 📝 Commandes Utiles

### Backend

```bash
cd backend
npm start           # Démarrer en production
npm run dev         # Démarrer en développement
npm run init-db     # Réinitialiser la base de données
```

### Frontend

```bash
npm run dev         # Démarrer en développement
npm run build       # Compiler pour production
npm run preview     # Prévisualiser le build
```

### Base de données

```bash
# Se connecter à MySQL
mysql -u root -p

# Utiliser la base de données
USE gestion_stages;

# Voir toutes les tables
SHOW TABLES;

# Voir les stages
SELECT * FROM stages;

# Compter les stages par statut
SELECT statut, COUNT(*) FROM stages GROUP BY statut;
```

## 🎉 Prochaines Étapes

Une fois l'installation réussie :

1. ✅ Testez toutes les fonctionnalités
2. ✅ Personnalisez les styles si nécessaire
3. ✅ Ajoutez l'authentification (optionnel)
4. ✅ Déployez sur un serveur (production)

## 📞 Support

Si vous rencontrez des problèmes :

1. Vérifiez les logs dans les terminaux
2. Consultez la console du navigateur (F12)
3. Vérifiez que tous les services sont démarrés
4. Relisez ce guide étape par étape

## 📚 Documentation Additionnelle

- [Documentation Express.js](https://expressjs.com/)
- [Documentation React](https://react.dev/)
- [Documentation MySQL](https://dev.mysql.com/doc/)
- [Documentation Vite](https://vitejs.dev/)

---

**Bonne utilisation ! 🚀**
