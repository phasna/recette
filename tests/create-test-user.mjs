/**
 * Script pour créer un utilisateur de test
 */

import mysql from "mysql2/promise";
import bcrypt from "bcrypt";
import config from "./backend/config.js";

console.log("👤 Création d'un utilisateur de test\n");

async function createTestUser() {
  let connection;

  try {
    connection = await mysql.createConnection({
      host: config.database.host,
      user: config.database.user,
      password: config.database.password,
      database: config.database.database,
    });

    // Informations de l'utilisateur de test
    const testUser = {
      username: "testuser",
      email: "test@example.com",
      password: "password123",
      first_name: "Test",
      last_name: "User",
    };

    console.log("🔐 Hachage du mot de passe...");
    const hashedPassword = await bcrypt.hash(testUser.password, 10);

    // Vérifier si l'utilisateur existe déjà
    const [existing] = await connection.query(
      "SELECT id FROM users WHERE username = ? OR email = ?",
      [testUser.username, testUser.email]
    );

    if (existing.length > 0) {
      console.log("⚠️  Un utilisateur existe déjà avec ces identifiants");
      console.log("\n📝 Utilisez ces identifiants pour vous connecter :");
      console.log(`   Username : ${testUser.username}`);
      console.log(`   Password : ${testUser.password}`);
      return;
    }

    // Insérer l'utilisateur
    console.log("➕ Création de l'utilisateur...");
    const [result] = await connection.query(
      `INSERT INTO users (username, email, password, first_name, last_name) 
       VALUES (?, ?, ?, ?, ?)`,
      [
        testUser.username,
        testUser.email,
        hashedPassword,
        testUser.first_name,
        testUser.last_name,
      ]
    );

    console.log("✅ Utilisateur créé avec succès !\n");
    console.log("=".repeat(50));
    console.log("📝 IDENTIFIANTS DE CONNEXION");
    console.log("=".repeat(50));
    console.log(`Username : ${testUser.username}`);
    console.log(`Email    : ${testUser.email}`);
    console.log(`Password : ${testUser.password}`);
    console.log("=".repeat(50));
    console.log("\n🚀 Vous pouvez maintenant :");
    console.log("1. Aller sur http://localhost:3001");
    console.log("2. Cliquer sur 'Connexion'");
    console.log(`3. Entrer username: ${testUser.username}`);
    console.log(`4. Entrer password: ${testUser.password}`);
    console.log("5. Cliquer sur ❤️ pour ajouter aux favoris !\n");
  } catch (error) {
    console.error("❌ Erreur:", error.message);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

createTestUser();

