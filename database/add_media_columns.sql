-- ============================================
-- Migration : Ajout des colonnes image_url et video_url
-- Date : 21 octobre 2025
-- Description : Ajoute la possibilité d'ajouter une photo et un lien vidéo aux recettes
-- ============================================

USE recipe_app;

-- Ajouter les colonnes pour la photo et la vidéo
ALTER TABLE recipes 
ADD COLUMN image_url VARCHAR(500) DEFAULT NULL COMMENT 'URL de l\'image de la recette',
ADD COLUMN video_url VARCHAR(500) DEFAULT NULL COMMENT 'URL de la vidéo (YouTube, etc.)';

-- Créer des index pour améliorer les performances si nécessaire
-- (Optionnel mais recommandé pour les recherches)

-- Afficher la structure mise à jour
DESCRIBE recipes;

-- Message de confirmation
SELECT 'Migration terminée : colonnes image_url et video_url ajoutées avec succès !' AS Status;

