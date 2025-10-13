-- Script pour ajouter la colonne country dans la table users
-- Exécuter ce script pour mettre à jour la base de données

USE recipe_app;

-- Ajouter la colonne country dans la table users
ALTER TABLE users ADD COLUMN IF NOT EXISTS country VARCHAR(100) DEFAULT NULL AFTER last_name;

-- Vérifier la structure mise à jour
DESCRIBE users;

-- Afficher un message de confirmation
SELECT 'Colonne country ajoutée avec succès!' as status;

