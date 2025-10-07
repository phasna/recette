-- Script de création de la base de données pour l'application de gestion des recettes
-- Exécutez ce script dans phpMyAdmin ou MySQL pour créer la base de données

-- Créer la base de données
CREATE DATABASE IF NOT EXISTS recipe_app CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Utiliser la base de données
USE recipe_app;

-- Créer la table des recettes
CREATE TABLE IF NOT EXISTS recipes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    ingredients TEXT NOT NULL,
    instructions TEXT NOT NULL,
    prep_time INT,
    cook_time INT,
    servings INT,
    difficulty ENUM('Facile', 'Moyen', 'Difficile') DEFAULT 'Facile',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insérer quelques recettes d'exemple
INSERT INTO recipes (title, description, ingredients, instructions, prep_time, cook_time, servings, difficulty) VALUES
(
    'Pâtes Carbonara',
    'Un classique italien crémeux et savoureux',
    '400g de spaghetti
200g de pancetta ou lardons
4 œufs
100g de parmesan râpé
2 gousses d\'ail
Poivre noir
Sel',
    '1. Faire cuire les pâtes dans l\'eau bouillante salée selon les instructions
2. Pendant ce temps, faire revenir la pancetta dans une poêle
3. Dans un bol, battre les œufs avec le parmesan et le poivre
4. Égoutter les pâtes en gardant un peu d\'eau de cuisson
5. Mélanger les pâtes avec la pancetta
6. Retirer du feu et ajouter le mélange œufs-parmesan en remuant rapidement
7. Ajouter un peu d\'eau de cuisson si nécessaire
8. Servir immédiatement avec du parmesan supplémentaire',
    15,
    15,
    4,
    'Moyen'
),
(
    'Salade César',
    'Une salade fraîche et croquante',
    '1 cœur de romaine
100g de parmesan
2 œufs
2 gousses d\'ail
2 c. à soupe de jus de citron
1 c. à soupe de moutarde de Dijon
1/2 tasse d\'huile d\'olive
Croûtons
Anchois (optionnel)',
    '1. Laver et couper la romaine en morceaux
2. Faire cuire les œufs mollets (6 minutes)
3. Préparer la vinaigrette : mélanger ail, citron, moutarde
4. Ajouter l\'huile d\'olive en fouettant
5. Mélanger la salade avec la vinaigrette
6. Ajouter les croûtons et le parmesan
7. Servir avec les œufs mollets sur le dessus',
    20,
    10,
    2,
    'Facile'
),
(
    'Tarte aux Pommes',
    'Un dessert traditionnel français',
    '1 pâte brisée
6 pommes
100g de sucre
2 œufs
200ml de crème fraîche
1 c. à soupe de cannelle
Beurre pour le moule',
    '1. Préchauffer le four à 180°C
2. Étaler la pâte dans un moule beurré
3. Éplucher et couper les pommes en lamelles
4. Disposer les pommes sur la pâte
5. Mélanger les œufs, le sucre, la crème et la cannelle
6. Verser sur les pommes
7. Enfourner 35-40 minutes jusqu\'à ce que la tarte soit dorée
8. Laisser refroidir avant de servir',
    30,
    40,
    8,
    'Moyen'
);

-- Afficher les recettes insérées
SELECT * FROM recipes;
