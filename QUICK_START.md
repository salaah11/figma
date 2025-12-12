# ⚡ Quick Start - Démarrage Rapide

Guide ultra-rapide pour démarrer le projet en 5 minutes.

## 📦 Ce dont vous avez besoin

- ✅ Node.js installé
- ✅ MySQL installé et démarré
- ✅ 10 minutes de votre temps

## 🚀 Démarrage en 4 Étapes

### 1️⃣ Installation Backend

```bash
# Terminal 1
cd backend
npm install
```

### 2️⃣ Configuration Base de Données

```bash
# Créer le fichier .env
cp .env.example .env

# Éditer .env et mettre votre mot de passe MySQL
# nano .env ou avec votre éditeur préféré
```

**Fichier `.env` minimum:**
```env
DB_PASSWORD=votre_mot_de_passe_mysql
```

```bash
# Initialiser la base de données
npm run init-db
```

### 3️⃣ Démarrer le Backend

```bash
# Dans backend/
npm run dev
```

✅ Vous devriez voir: `🚀 Serveur démarré sur http://localhost:5000`

### 4️⃣ Démarrer le Frontend

```bash
# Terminal 2 - À la racine du projet
npm install
npm run dev
```

✅ Vous devriez voir: `➜ Local: http://localhost:5173/`

## 🎉 C'est prêt !

Ouvrez votre navigateur sur **http://localhost:5173**

## 🧪 Tester que tout fonctionne

### Option 1 : Interface Web

1. Aller sur http://localhost:5173
2. Cliquer sur "Interface Étudiant"
3. Créer un stage
4. Aller sur "Interface Administration"
5. Valider le stage

### Option 2 : Test API

```bash
# Dans backend/
node test-api.js
```

Vous devriez voir tous les tests passer en vert ✅

### Option 3 : Test Manuel API

```bash
# Tester l'API directement
curl http://localhost:5000/api/stages
```

## 📁 Structure des Fichiers Importants

```
projet/
├── backend/
│   ├── .env              ← CRÉER CE FICHIER (copier .env.example)
│   ├── server.js         ← Serveur principal
│   └── package.json
├── src/
│   └── app/
│       └── App.tsx       ← Application React
└── package.json
```

## 🔧 Commandes Essentielles

| Commande | Description |
|----------|-------------|
| `cd backend && npm run dev` | Démarrer le backend |
| `npm run dev` | Démarrer le frontend |
| `npm run init-db` | Réinitialiser la DB |
| `node test-api.js` | Tester l'API |

## ❌ Problèmes Courants

### "Cannot connect to MySQL"

**Solution:**
```bash
# Démarrer MySQL
# Windows:
net start MySQL80

# macOS:
mysql.server start

# Linux:
sudo systemctl start mysql
```

### "Port 5000 already in use"

**Solution:** Tuer le processus ou changer le port dans `backend/.env`

```bash
# Trouver et tuer le processus (Linux/Mac)
lsof -ti:5000 | xargs kill -9

# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### "Table doesn't exist"

**Solution:**
```bash
cd backend
npm run init-db
```

### Le frontend ne charge pas les données

**Vérifier:**
1. Le backend tourne sur port 5000
2. Pas d'erreurs dans la console navigateur (F12)
3. L'URL de l'API est correcte

## 🎯 Ports Utilisés

- **Frontend:** http://localhost:5173
- **Backend:** http://localhost:5000
- **MySQL:** localhost:3306

## 📖 Documentations Complètes

- 📘 [INSTALLATION.md](INSTALLATION.md) - Guide détaillé
- 📙 [README.md](README.md) - Documentation complète
- 📗 [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) - Structure du projet
- 📕 [backend/README.md](backend/README.md) - API Documentation

## 🆘 Besoin d'Aide ?

1. Vérifier que MySQL tourne
2. Vérifier les logs dans les terminaux
3. Ouvrir la console du navigateur (F12)
4. Consulter [INSTALLATION.md](INSTALLATION.md)
5. Relire ce guide

## ✅ Checklist de Démarrage

- [ ] MySQL installé et démarré
- [ ] Node.js installé (v14+)
- [ ] Dépendances backend installées (`cd backend && npm install`)
- [ ] Fichier `backend/.env` créé avec mot de passe MySQL
- [ ] Base de données initialisée (`npm run init-db`)
- [ ] Backend démarré (`npm run dev`) - port 5000
- [ ] Dépendances frontend installées (`npm install`)
- [ ] Frontend démarré (`npm run dev`) - port 5173
- [ ] Application accessible sur http://localhost:5173
- [ ] Tests API réussis (`node test-api.js`)

## 🎊 Prêt à Développer !

Vous êtes maintenant prêt à utiliser l'application !

**Prochaines étapes :**
- Tester les deux interfaces (Étudiant et Admin)
- Explorer le code dans `src/app/`
- Consulter l'API dans `backend/server.js`
- Personnaliser selon vos besoins

**Bon développement ! 🚀**
