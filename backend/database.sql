-- ============================================
-- Script SQL pour Gestion des Stages
-- Base de données: gestion_stages
-- ============================================

-- Créer la base de données
CREATE DATABASE IF NOT EXISTS gestion_stages 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE gestion_stages;

-- ============================================
-- Table: users (optionnel pour authentification future)
-- ============================================
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  role ENUM('etudiant', 'admin') NOT NULL DEFAULT 'etudiant',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  INDEX idx_email (email),
  INDEX idx_role (role)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Table: stages (déclarations de stage)
-- ============================================
CREATE TABLE IF NOT EXISTS stages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_etudiant VARCHAR(100) NOT NULL COMMENT 'Identifiant de l\'étudiant',
  nom_etudiant VARCHAR(255) NOT NULL COMMENT 'Nom complet de l\'étudiant',
  email_etudiant VARCHAR(255) NOT NULL COMMENT 'Email de l\'étudiant',
  entreprise VARCHAR(255) NOT NULL COMMENT 'Nom de l\'entreprise d\'accueil',
  sujet TEXT NOT NULL COMMENT 'Description du sujet du stage',
  date_debut DATE NOT NULL COMMENT 'Date de début du stage',
  date_fin DATE NOT NULL COMMENT 'Date de fin du stage',
  statut ENUM('en attente', 'validé', 'refusé') NOT NULL DEFAULT 'en attente' COMMENT 'Statut de la déclaration',
  date_soumission TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Date de soumission de la déclaration',
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Dernière modification',
  
  INDEX idx_statut (statut),
  INDEX idx_etudiant (id_etudiant),
  INDEX idx_email (email_etudiant),
  INDEX idx_date_soumission (date_soumission)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Insertion de données de test
-- ============================================

-- Utilisateurs de test
INSERT INTO users (nom, email, role) VALUES
('Admin System', 'admin@ecole.fr', 'admin'),
('Sophie Bernard', 'sophie.bernard@ecole.fr', 'etudiant'),
('Thomas Dubois', 'thomas.dubois@ecole.fr', 'etudiant'),
('Emma Martin', 'emma.martin@ecole.fr', 'etudiant'),
('Lucas Petit', 'lucas.petit@ecole.fr', 'etudiant'),
('Chloé Moreau', 'chloe.moreau@ecole.fr', 'etudiant')
ON DUPLICATE KEY UPDATE id=id;

-- Stages de test
INSERT INTO stages (id_etudiant, nom_etudiant, email_etudiant, entreprise, sujet, date_debut, date_fin, statut, date_soumission) VALUES
(
  'ETU001', 
  'Sophie Bernard', 
  'sophie.bernard@ecole.fr', 
  'TechSolutions SA', 
  'Développement d\'une application web de gestion avec React et Node.js. Participation à la conception de l\'architecture et aux tests. Utilisation de Git pour la gestion de version et collaboration avec l\'équipe de développement.',
  '2025-02-01', 
  '2025-07-31', 
  'en attente', 
  '2024-12-10 09:30:00'
),
(
  'ETU002', 
  'Thomas Dubois', 
  'thomas.dubois@ecole.fr', 
  'Innovation Labs', 
  'Stage en data science : analyse de données, création de modèles prédictifs et visualisation avec Python. Travail sur des projets de machine learning et deep learning avec TensorFlow.',
  '2025-03-01', 
  '2025-08-31', 
  'validé', 
  '2024-12-08 14:15:00'
),
(
  'ETU003', 
  'Emma Martin', 
  'emma.martin@ecole.fr', 
  'Digital Agency', 
  'Design UI/UX pour applications mobiles. Création de maquettes, prototypes interactifs et tests utilisateurs. Utilisation de Figma et Adobe XD pour la conception.',
  '2025-01-15', 
  '2025-04-15', 
  'en attente', 
  '2024-12-11 16:45:00'
),
(
  'ETU004', 
  'Lucas Petit', 
  'lucas.petit@ecole.fr', 
  'StartupTech', 
  'Développement mobile avec React Native. Intégration d\'APIs REST et gestion d\'état avec Redux. Développement de fonctionnalités pour une application de e-commerce.',
  '2025-02-15', 
  '2025-05-15', 
  'validé', 
  '2024-12-09 11:20:00'
),
(
  'ETU005', 
  'Chloé Moreau', 
  'chloe.moreau@ecole.fr', 
  'Consulting Group', 
  'Analyse de processus métier et optimisation. Participation aux missions de conseil client. Rédaction de rapports d\'analyse et recommandations stratégiques.',
  '2025-03-10', 
  '2025-09-10', 
  'refusé', 
  '2024-12-07 15:30:00'
)
ON DUPLICATE KEY UPDATE id=id;

-- ============================================
-- Vues utiles
-- ============================================

-- Vue: Statistiques globales
CREATE OR REPLACE VIEW v_statistiques_globales AS
SELECT 
  COUNT(*) as total_stages,
  SUM(CASE WHEN statut = 'en attente' THEN 1 ELSE 0 END) as stages_en_attente,
  SUM(CASE WHEN statut = 'validé' THEN 1 ELSE 0 END) as stages_valides,
  SUM(CASE WHEN statut = 'refusé' THEN 1 ELSE 0 END) as stages_refuses,
  ROUND(SUM(CASE WHEN statut = 'validé' THEN 1 ELSE 0 END) * 100.0 / COUNT(*), 2) as taux_validation
FROM stages;

-- Vue: Stages récents
CREATE OR REPLACE VIEW v_stages_recents AS
SELECT 
  id,
  nom_etudiant,
  entreprise,
  sujet,
  statut,
  date_soumission,
  DATEDIFF(date_fin, date_debut) as duree_jours
FROM stages
ORDER BY date_soumission DESC
LIMIT 10;

-- ============================================
-- Requêtes utiles
-- ============================================

-- Afficher toutes les statistiques
SELECT * FROM v_statistiques_globales;

-- Afficher les stages récents
SELECT * FROM v_stages_recents;

-- Stages en attente de validation
SELECT nom_etudiant, entreprise, date_soumission 
FROM stages 
WHERE statut = 'en attente' 
ORDER BY date_soumission ASC;

-- Stages par entreprise
SELECT entreprise, COUNT(*) as nombre_stages 
FROM stages 
GROUP BY entreprise 
ORDER BY nombre_stages DESC;

-- Durée moyenne des stages
SELECT 
  AVG(DATEDIFF(date_fin, date_debut)) as duree_moyenne_jours,
  ROUND(AVG(DATEDIFF(date_fin, date_debut)) / 30, 1) as duree_moyenne_mois
FROM stages;

-- ============================================
-- Procédures stockées
-- ============================================

DELIMITER $$

-- Procédure: Valider un stage
CREATE PROCEDURE sp_valider_stage(IN stage_id INT)
BEGIN
  UPDATE stages 
  SET statut = 'validé' 
  WHERE id = stage_id;
  
  SELECT 'Stage validé avec succès' as message;
END$$

-- Procédure: Refuser un stage
CREATE PROCEDURE sp_refuser_stage(IN stage_id INT)
BEGIN
  UPDATE stages 
  SET statut = 'refusé' 
  WHERE id = stage_id;
  
  SELECT 'Stage refusé' as message;
END$$

-- Procédure: Obtenir les statistiques d'un étudiant
CREATE PROCEDURE sp_stats_etudiant(IN etudiant_id VARCHAR(100))
BEGIN
  SELECT 
    COUNT(*) as total_declarations,
    SUM(CASE WHEN statut = 'validé' THEN 1 ELSE 0 END) as valides,
    SUM(CASE WHEN statut = 'refusé' THEN 1 ELSE 0 END) as refuses,
    SUM(CASE WHEN statut = 'en attente' THEN 1 ELSE 0 END) as en_attente
  FROM stages
  WHERE id_etudiant = etudiant_id;
END$$

DELIMITER ;

-- ============================================
-- Triggers
-- ============================================

DELIMITER $$

-- Trigger: Validation des dates
CREATE TRIGGER tr_check_dates BEFORE INSERT ON stages
FOR EACH ROW
BEGIN
  IF NEW.date_fin <= NEW.date_debut THEN
    SIGNAL SQLSTATE '45000' 
    SET MESSAGE_TEXT = 'La date de fin doit être après la date de début';
  END IF;
END$$

DELIMITER ;

-- ============================================
-- Index de performance
-- ============================================

-- Index composite pour recherches fréquentes
CREATE INDEX idx_statut_date ON stages(statut, date_soumission);
CREATE INDEX idx_entreprise ON stages(entreprise);

-- ============================================
-- Affichage final
-- ============================================

SELECT '✅ Base de données initialisée avec succès!' as message;
SELECT * FROM v_statistiques_globales;
