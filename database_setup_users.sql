-- Script de création de la base de données avec système d'utilisateurs
-- Base de données pour l'application de gestion des recettes avec utilisateurs

-- Créer la base de données si elle n'existe pas
CREATE DATABASE IF NOT EXISTS recipe_app;
USE recipe_app;

-- Table des utilisateurs
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    avatar_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Modifier la table recipes pour ajouter l'association avec les utilisateurs
ALTER TABLE recipes ADD COLUMN user_id INT;
ALTER TABLE recipes ADD FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

-- Ajouter un index pour améliorer les performances
CREATE INDEX idx_recipes_user_id ON recipes(user_id);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_username ON users(username);

-- Insérer des utilisateurs de test
INSERT INTO users (username, email, password, first_name, last_name) VALUES
('john_doe', 'john@example.com', '$2b$10$example_hash_1', 'John', 'Doe'),
('jane_smith', 'jane@example.com', '$2b$10$example_hash_2', 'Jane', 'Smith'),
('chef_mario', 'mario@example.com', '$2b$10$example_hash_3', 'Mario', 'Rossi');

-- Mettre à jour les recettes existantes avec un utilisateur par défaut
UPDATE recipes SET user_id = 1 WHERE user_id IS NULL;

-- Afficher la structure des tables
DESCRIBE users;
DESCRIBE recipes;

-- Afficher les utilisateurs créés
SELECT id, username, email, first_name, last_name, created_at FROM users;

-- Afficher les recettes avec leurs utilisateurs
SELECT r.id, r.title, r.user_id, u.username, u.first_name, u.last_name 
FROM recipes r 
LEFT JOIN users u ON r.user_id = u.id;
