-- ============================================
-- Migration : Correction de la colonne image_url pour supporter Base64
-- Date : 21 octobre 2025
-- Description : Modifie la colonne image_url pour supporter les images Base64 (jusqu'à 1MB)
-- ============================================

USE recipe_app;

-- Modifier la colonne image_url pour supporter les images Base64
-- Base64 d'une image 1MB = ~1.3MB = ~1,300,000 caractères
-- On utilise LONGTEXT qui peut contenir jusqu'à 4GB
ALTER TABLE recipes 
MODIFY COLUMN image_url LONGTEXT DEFAULT NULL COMMENT 'URL de l\'image ou données Base64 de l\'image';

-- Afficher la structure mise à jour
DESCRIBE recipes;

-- Message de confirmation
SELECT 'Migration terminée : colonne image_url modifiée pour supporter Base64 !' AS Status;
