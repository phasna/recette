#!/usr/bin/env node

/**
 * Test simple de connexion MySQL
 * Teste différentes configurations automatiquement
 */

const mysql = require("mysql2");

console.log("🧪 Test simple de connexion MySQL\n");

// Configurations à tester
const configs = [
  { user: "root", password: "", name: "root sans mot de passe" },
  { user: "root", password: "root", name: 'root avec mot de passe "root"' },
  {
    user: "root",
    password: "password",
    name: 'root avec mot de passe "password"',
  },
  { user: "root", password: "admin", name: 'root avec mot de passe "admin"' },
  { user: "root", password: "mysql", name: 'root avec mot de passe "mysql"' },
];

async function testConfig(config) {
  return new Promise((resolve) => {
    console.log(`🔍 Test: ${config.name}...`);

    const connection = mysql.createConnection({
      host: "localhost",
      port: 3306,
      user: config.user,
      password: config.password,
    });

    connection.connect((err) => {
      if (err) {
        console.log(`❌ Échec: ${err.message.split("\n")[0]}`);
        connection.end();
        resolve(null);
      } else {
        console.log(`✅ Succès! Configuration fonctionnelle`);

        // Tester la création de base de données
        connection.query("CREATE DATABASE IF NOT EXISTS recipe_app", (err) => {
          if (err) {
            console.log(`❌ Erreur création DB: ${err.message}`);
            connection.end();
            resolve(null);
          } else {
            console.log(`✅ Base de données 'recipe_app' créée`);
            connection.end();
            resolve(config);
          }
        });
      }
    });
  });
}

async function runTests() {
  console.log("🚀 Démarrage des tests de connexion...\n");

  for (const config of configs) {
    const result = await testConfig(config);

    if (result) {
      console.log("\n🎉 Configuration trouvée!");
      console.log("📝 Mettez à jour backend/config.js avec :");
      console.log(`   user: "${result.user}"`);
      console.log(`   password: "${result.password}"`);
      console.log("\n✅ Votre application devrait maintenant fonctionner!");
      return;
    }
  }

  console.log("\n❌ Aucune configuration n'a fonctionné");
  console.log("\n🔧 Solutions possibles :");
  console.log("1. Vérifiez que MySQL est démarré");
  console.log("2. Réinitialisez le mot de passe MySQL");
  console.log("3. Créez un nouvel utilisateur MySQL");
  console.log("4. Consultez FIX_MYSQL_QUICK.md pour plus d'aide");
}

// Exécuter les tests
runTests().catch(console.error);
