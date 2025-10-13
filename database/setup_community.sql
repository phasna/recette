-- ============================================
-- Script de création des tables pour la dimension communautaire
-- ============================================

-- Table des relations de suivi entre utilisateurs
CREATE TABLE IF NOT EXISTS user_follows (
    id INT AUTO_INCREMENT PRIMARY KEY,
    follower_id INT NOT NULL,
    followed_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (follower_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (followed_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY unique_follow (follower_id, followed_id),
    INDEX idx_follower (follower_id),
    INDEX idx_followed (followed_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table des commentaires sur les recettes
CREATE TABLE IF NOT EXISTS recipe_comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    recipe_id INT NOT NULL,
    user_id INT NOT NULL,
    comment_text TEXT NOT NULL,
    rating INT DEFAULT NULL CHECK (rating >= 1 AND rating <= 5),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_recipe (recipe_id),
    INDEX idx_user (user_id),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table des likes sur les commentaires
CREATE TABLE IF NOT EXISTS comment_likes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    comment_id INT NOT NULL,
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (comment_id) REFERENCES recipe_comments(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY unique_comment_like (comment_id, user_id),
    INDEX idx_comment (comment_id),
    INDEX idx_user (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table des badges disponibles
CREATE TABLE IF NOT EXISTS badges (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    icon VARCHAR(255),
    color VARCHAR(50) DEFAULT 'gray',
    level INT DEFAULT 1,
    requirement_type VARCHAR(50) NOT NULL COMMENT 'recipes_count, followers_count, comments_count, etc.',
    requirement_value INT NOT NULL COMMENT 'Nombre requis pour obtenir le badge',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_requirement (requirement_type, requirement_value)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table des badges obtenus par les utilisateurs
CREATE TABLE IF NOT EXISTS user_badges (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    badge_id INT NOT NULL,
    earned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (badge_id) REFERENCES badges(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_badge (user_id, badge_id),
    INDEX idx_user (user_id),
    INDEX idx_badge (badge_id),
    INDEX idx_earned_at (earned_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table des statistiques des recettes (pour le classement)
CREATE TABLE IF NOT EXISTS recipe_stats (
    recipe_id INT PRIMARY KEY,
    views_count INT DEFAULT 0,
    favorites_count INT DEFAULT 0,
    comments_count INT DEFAULT 0,
    average_rating DECIMAL(3,2) DEFAULT 0.00,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE,
    INDEX idx_views (views_count),
    INDEX idx_favorites (favorites_count),
    INDEX idx_rating (average_rating),
    INDEX idx_comments (comments_count)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Ajouter des colonnes aux utilisateurs pour les statistiques communautaires
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS bio TEXT,
ADD COLUMN IF NOT EXISTS cooking_level VARCHAR(50) DEFAULT 'Débutant',
ADD COLUMN IF NOT EXISTS total_recipes INT DEFAULT 0,
ADD COLUMN IF NOT EXISTS total_followers INT DEFAULT 0,
ADD COLUMN IF NOT EXISTS total_following INT DEFAULT 0,
ADD COLUMN IF NOT EXISTS total_badges INT DEFAULT 0,
ADD COLUMN IF NOT EXISTS community_score INT DEFAULT 0;

-- Insérer les badges de base
INSERT INTO badges (name, description, icon, color, level, requirement_type, requirement_value) VALUES
('Premier Pas', 'Créez votre première recette', '🍳', 'bronze', 1, 'recipes_count', 1),
('Chef Maison', 'Partagez 5 recettes', '👨‍🍳', 'silver', 2, 'recipes_count', 5),
('Cordon Bleu', 'Partagez 10 recettes', '🎖️', 'gold', 3, 'recipes_count', 10),
('Grand Chef', 'Partagez 25 recettes', '👑', 'platinum', 4, 'recipes_count', 25),
('Maître Cuisinier', 'Partagez 50 recettes', '⭐', 'diamond', 5, 'recipes_count', 50),

('Populaire', 'Obtenez 10 abonnés', '📢', 'bronze', 1, 'followers_count', 10),
('Influenceur', 'Obtenez 50 abonnés', '🌟', 'silver', 2, 'followers_count', 50),
('Star de la Cuisine', 'Obtenez 100 abonnés', '💫', 'gold', 3, 'followers_count', 100),

('Commentateur', 'Laissez 10 commentaires', '💬', 'bronze', 1, 'comments_count', 10),
('Critique Culinaire', 'Laissez 50 commentaires', '📝', 'silver', 2, 'comments_count', 50),
('Expert Gastronome', 'Laissez 100 commentaires', '🍷', 'gold', 3, 'comments_count', 100),

('Social', 'Suivez 10 cuisiniers', '🤝', 'bronze', 1, 'following_count', 10),
('Explorateur', 'Suivez 50 cuisiniers', '🔍', 'silver', 2, 'following_count', 50),

('Favoris Lover', 'Ajoutez 25 recettes aux favoris', '❤️', 'bronze', 1, 'favorites_count', 25),
('Collectionneur', 'Ajoutez 100 recettes aux favoris', '📚', 'gold', 2, 'favorites_count', 100)
ON DUPLICATE KEY UPDATE description=VALUES(description);

-- ============================================
-- Triggers pour mettre à jour automatiquement les statistiques
-- ============================================

-- Trigger pour mettre à jour le nombre de followers
DELIMITER //

CREATE TRIGGER IF NOT EXISTS after_follow_insert
AFTER INSERT ON user_follows
FOR EACH ROW
BEGIN
    UPDATE users SET total_followers = total_followers + 1 WHERE id = NEW.followed_id;
    UPDATE users SET total_following = total_following + 1 WHERE id = NEW.follower_id;
END//

CREATE TRIGGER IF NOT EXISTS after_follow_delete
AFTER DELETE ON user_follows
FOR EACH ROW
BEGIN
    UPDATE users SET total_followers = GREATEST(total_followers - 1, 0) WHERE id = OLD.followed_id;
    UPDATE users SET total_following = GREATEST(total_following - 1, 0) WHERE id = OLD.follower_id;
END//

-- Trigger pour mettre à jour le nombre de commentaires
CREATE TRIGGER IF NOT EXISTS after_comment_insert
AFTER INSERT ON recipe_comments
FOR EACH ROW
BEGIN
    -- Mettre à jour le compteur de commentaires de la recette
    UPDATE recipe_stats 
    SET comments_count = comments_count + 1 
    WHERE recipe_id = NEW.recipe_id;
    
    -- Recalculer la moyenne des notes si une note est donnée
    IF NEW.rating IS NOT NULL THEN
        UPDATE recipe_stats 
        SET average_rating = (
            SELECT AVG(rating) 
            FROM recipe_comments 
            WHERE recipe_id = NEW.recipe_id AND rating IS NOT NULL
        )
        WHERE recipe_id = NEW.recipe_id;
    END IF;
END//

CREATE TRIGGER IF NOT EXISTS after_comment_delete
AFTER DELETE ON recipe_comments
FOR EACH ROW
BEGIN
    -- Mettre à jour le compteur de commentaires de la recette
    UPDATE recipe_stats 
    SET comments_count = GREATEST(comments_count - 1, 0) 
    WHERE recipe_id = OLD.recipe_id;
    
    -- Recalculer la moyenne des notes
    UPDATE recipe_stats 
    SET average_rating = COALESCE((
        SELECT AVG(rating) 
        FROM recipe_comments 
        WHERE recipe_id = OLD.recipe_id AND rating IS NOT NULL
    ), 0)
    WHERE recipe_id = OLD.recipe_id;
END//

-- Trigger pour créer automatiquement les stats d'une recette
CREATE TRIGGER IF NOT EXISTS after_recipe_insert
AFTER INSERT ON recipes
FOR EACH ROW
BEGIN
    INSERT INTO recipe_stats (recipe_id, views_count, favorites_count, comments_count, average_rating)
    VALUES (NEW.id, 0, 0, 0, 0.00);
    
    -- Mettre à jour le compteur de recettes de l'utilisateur
    UPDATE users SET total_recipes = total_recipes + 1 WHERE id = NEW.user_id;
END//

CREATE TRIGGER IF NOT EXISTS after_recipe_delete
AFTER DELETE ON recipes
FOR EACH ROW
BEGIN
    -- Le stats sera supprimé automatiquement par ON DELETE CASCADE
    -- Mettre à jour le compteur de recettes de l'utilisateur
    UPDATE users SET total_recipes = GREATEST(total_recipes - 1, 0) WHERE id = OLD.user_id;
END//

-- Trigger pour mettre à jour le nombre de favoris
CREATE TRIGGER IF NOT EXISTS after_favorite_insert
AFTER INSERT ON favorites
FOR EACH ROW
BEGIN
    UPDATE recipe_stats 
    SET favorites_count = favorites_count + 1 
    WHERE recipe_id = NEW.recipe_id;
END//

CREATE TRIGGER IF NOT EXISTS after_favorite_delete
AFTER DELETE ON favorites
FOR EACH ROW
BEGIN
    UPDATE recipe_stats 
    SET favorites_count = GREATEST(favorites_count - 1, 0) 
    WHERE recipe_id = OLD.recipe_id;
END//

DELIMITER ;

-- ============================================
-- Initialiser les statistiques pour les recettes existantes
-- ============================================
INSERT IGNORE INTO recipe_stats (recipe_id, views_count, favorites_count, comments_count, average_rating)
SELECT id, 0, 0, 0, 0.00 FROM recipes;

-- Mettre à jour le nombre de favoris pour chaque recette
UPDATE recipe_stats rs
SET favorites_count = (
    SELECT COUNT(*) FROM favorites f WHERE f.recipe_id = rs.recipe_id
)
WHERE EXISTS (SELECT 1 FROM recipes r WHERE r.id = rs.recipe_id);

-- Mettre à jour le compteur de recettes pour chaque utilisateur
UPDATE users u
SET total_recipes = (
    SELECT COUNT(*) FROM recipes r WHERE r.user_id = u.id
);

-- ============================================
-- Vues utiles pour les classements et statistiques
-- ============================================

-- Vue des utilisateurs les plus actifs
CREATE OR REPLACE VIEW v_top_users AS
SELECT 
    u.id,
    u.username,
    u.first_name,
    u.last_name,
    u.avatar_url,
    u.cooking_level,
    u.total_recipes,
    u.total_followers,
    u.total_following,
    u.total_badges,
    u.community_score,
    COUNT(DISTINCT ub.badge_id) as badges_earned
FROM users u
LEFT JOIN user_badges ub ON u.id = ub.user_id
GROUP BY u.id
ORDER BY u.community_score DESC, u.total_followers DESC;

-- Vue des recettes les plus populaires
CREATE OR REPLACE VIEW v_top_recipes AS
SELECT 
    r.id,
    r.title,
    r.description,
    r.difficulty,
    r.created_at,
    r.user_id,
    u.username,
    u.first_name,
    u.last_name,
    rs.views_count,
    rs.favorites_count,
    rs.comments_count,
    rs.average_rating,
    (rs.favorites_count * 3 + rs.comments_count * 2 + rs.views_count * 0.1) as popularity_score
FROM recipes r
JOIN users u ON r.user_id = u.id
JOIN recipe_stats rs ON r.id = rs.recipe_id
WHERE r.is_shared = 1
ORDER BY popularity_score DESC;

-- Vue des commentaires récents avec les détails utilisateur
CREATE OR REPLACE VIEW v_recent_comments AS
SELECT 
    rc.id,
    rc.recipe_id,
    rc.user_id,
    rc.comment_text,
    rc.rating,
    rc.created_at,
    u.username,
    u.first_name,
    u.last_name,
    u.avatar_url,
    r.title as recipe_title,
    (SELECT COUNT(*) FROM comment_likes cl WHERE cl.comment_id = rc.id) as likes_count
FROM recipe_comments rc
JOIN users u ON rc.user_id = u.id
JOIN recipes r ON rc.recipe_id = r.id
ORDER BY rc.created_at DESC;

-- ============================================
-- Procédures stockées utiles
-- ============================================

DELIMITER //

-- Procédure pour mettre à jour le score communautaire d'un utilisateur
CREATE PROCEDURE IF NOT EXISTS update_user_community_score(IN p_user_id INT)
BEGIN
    DECLARE v_score INT DEFAULT 0;
    
    -- Calculer le score basé sur différents critères
    SELECT 
        (total_recipes * 10) +              -- 10 points par recette
        (total_followers * 5) +              -- 5 points par follower
        (total_badges * 20) +                -- 20 points par badge
        (COALESCE(comments_count, 0) * 2)    -- 2 points par commentaire
    INTO v_score
    FROM users u
    LEFT JOIN (
        SELECT user_id, COUNT(*) as comments_count 
        FROM recipe_comments 
        WHERE user_id = p_user_id
    ) c ON u.id = c.user_id
    WHERE u.id = p_user_id;
    
    -- Mettre à jour le score
    UPDATE users 
    SET community_score = v_score 
    WHERE id = p_user_id;
END//

-- Procédure pour vérifier et attribuer les badges à un utilisateur
CREATE PROCEDURE IF NOT EXISTS check_and_award_badges(IN p_user_id INT)
BEGIN
    -- Badges basés sur le nombre de recettes
    INSERT IGNORE INTO user_badges (user_id, badge_id)
    SELECT p_user_id, b.id
    FROM badges b
    JOIN users u ON u.id = p_user_id
    WHERE b.requirement_type = 'recipes_count' 
    AND u.total_recipes >= b.requirement_value;
    
    -- Badges basés sur le nombre de followers
    INSERT IGNORE INTO user_badges (user_id, badge_id)
    SELECT p_user_id, b.id
    FROM badges b
    JOIN users u ON u.id = p_user_id
    WHERE b.requirement_type = 'followers_count' 
    AND u.total_followers >= b.requirement_value;
    
    -- Badges basés sur le nombre de following
    INSERT IGNORE INTO user_badges (user_id, badge_id)
    SELECT p_user_id, b.id
    FROM badges b
    JOIN users u ON u.id = p_user_id
    WHERE b.requirement_type = 'following_count' 
    AND u.total_following >= b.requirement_value;
    
    -- Badges basés sur le nombre de commentaires
    INSERT IGNORE INTO user_badges (user_id, badge_id)
    SELECT p_user_id, b.id
    FROM badges b
    LEFT JOIN (
        SELECT user_id, COUNT(*) as count 
        FROM recipe_comments 
        WHERE user_id = p_user_id
    ) c ON 1=1
    WHERE b.requirement_type = 'comments_count' 
    AND COALESCE(c.count, 0) >= b.requirement_value;
    
    -- Badges basés sur le nombre de favoris
    INSERT IGNORE INTO user_badges (user_id, badge_id)
    SELECT p_user_id, b.id
    FROM badges b
    LEFT JOIN (
        SELECT user_id, COUNT(*) as count 
        FROM favorites 
        WHERE user_id = p_user_id
    ) f ON 1=1
    WHERE b.requirement_type = 'favorites_count' 
    AND COALESCE(f.count, 0) >= b.requirement_value;
    
    -- Mettre à jour le compteur de badges
    UPDATE users 
    SET total_badges = (SELECT COUNT(*) FROM user_badges WHERE user_id = p_user_id)
    WHERE id = p_user_id;
    
    -- Mettre à jour le score communautaire
    CALL update_user_community_score(p_user_id);
END//

DELIMITER ;

-- ============================================
-- Fin du script
-- ============================================

SELECT 'Tables communautaires créées avec succès!' as status;

