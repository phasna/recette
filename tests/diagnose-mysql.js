#!/usr/bin/env node

/**
 * Script de diagnostic MySQL
 * Identifie les problèmes de connexion et propose des solutions
 */

const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

console.log("🔍 Diagnostic MySQL - Identification des problèmes\n");

/**
 * Vérifier si MySQL est installé et démarré
 */
async function checkMySQLStatus() {
  console.log("1️⃣ Vérification du statut MySQL...");

  return new Promise((resolve) => {
    exec("mysql --version", (error, stdout, stderr) => {
      if (error) {
        console.log("❌ MySQL n'est pas installé ou pas dans le PATH");
        console.log("💡 Solution: Installez MySQL");
        resolve(false);
      } else {
        console.log("✅ MySQL installé:", stdout.trim());

        // Vérifier si MySQL est démarré
        exec("pgrep mysql || pgrep mysqld", (error, stdout, stderr) => {
          if (error) {
            console.log("❌ MySQL n'est pas démarré");
            console.log("💡 Solution: Démarrez MySQL");
            resolve(false);
          } else {
            console.log("✅ MySQL est démarré (PID:", stdout.trim(), ")");
            resolve(true);
          }
        });
      }
    });
  });
}

/**
 * Tester différentes configurations de connexion
 */
async function testConnectionConfigs() {
  console.log("\n2️⃣ Test des configurations de connexion...");

  const configs = [
    { user: "root", password: "", description: "root sans mot de passe" },
    {
      user: "root",
      password: "root",
      description: 'root avec mot de passe "root"',
    },
    {
      user: "root",
      password: "password",
      description: 'root avec mot de passe "password"',
    },
    {
      user: "root",
      password: "admin",
      description: 'root avec mot de passe "admin"',
    },
    {
      user: "root",
      password: "mysql",
      description: 'root avec mot de passe "mysql"',
    },
  ];

  for (const config of configs) {
    console.log(`\n🧪 Test: ${config.description}`);

    const mysqlCommand = config.password
      ? `mysql -u ${config.user} -p${config.password} -e "SELECT 1;" 2>/dev/null`
      : `mysql -u ${config.user} -e "SELECT 1;" 2>/dev/null`;

    return new Promise((resolve) => {
      exec(mysqlCommand, (error, stdout, stderr) => {
        if (error) {
          console.log("❌ Échec:", error.message.split("\n")[0]);
        } else {
          console.log("✅ Succès! Configuration fonctionnelle");
          console.log(
            "📝 Utilisez cette configuration dans backend/config.js:"
          );
          console.log(`   user: "${config.user}"`);
          console.log(`   password: "${config.password}"`);
          resolve(config);
        }
      });
    });
  }
}

/**
 * Vérifier les ports utilisés
 */
async function checkPorts() {
  console.log("\n3️⃣ Vérification des ports...");

  return new Promise((resolve) => {
    exec("lsof -i :3306", (error, stdout, stderr) => {
      if (error) {
        console.log("❌ Port 3306 non utilisé - MySQL n'est pas démarré");
        console.log("💡 Solution: Démarrez MySQL");
      } else {
        console.log("✅ Port 3306 utilisé par MySQL");
        console.log("📊 Détails:", stdout.trim());
      }

      exec("lsof -i :3000", (error, stdout, stderr) => {
        if (error) {
          console.log("✅ Port 3000 libre pour l'application");
        } else {
          console.log("⚠️ Port 3000 déjà utilisé");
          console.log("📊 Détails:", stdout.trim());
        }
        resolve();
      });
    });
  });
}

/**
 * Proposer des solutions
 */
function proposeSolutions() {
  console.log("\n🔧 Solutions proposées:\n");

  console.log("📋 Solution 1: Configuration MySQL");
  console.log("1. Ouvrez un terminal");
  console.log("2. Tapez: mysql -u root -p");
  console.log("3. Entrez votre mot de passe (ou appuyez sur Entrée si aucun)");
  console.log("4. Si ça fonctionne, notez le mot de passe");
  console.log("5. Mettez à jour backend/config.js avec le bon mot de passe\n");

  console.log("📋 Solution 2: Réinitialiser le mot de passe MySQL");
  console.log("1. Arrêtez MySQL: sudo service mysql stop");
  console.log(
    "2. Démarrez en mode sécurisé: sudo mysqld_safe --skip-grant-tables &"
  );
  console.log("3. Connectez-vous: mysql -u root");
  console.log(
    "4. Réinitialisez: ALTER USER 'root'@'localhost' IDENTIFIED BY '';"
  );
  console.log("5. Redémarrez MySQL: sudo service mysql restart\n");

  console.log("📋 Solution 3: Utiliser phpMyAdmin");
  console.log("1. Ouvrez http://localhost/phpmyadmin");
  console.log('2. Créez la base de données "recipe_app"');
  console.log("3. Importez le fichier database_setup.sql\n");

  console.log("📋 Solution 4: Créer un nouvel utilisateur");
  console.log("1. Connectez-vous à MySQL: mysql -u root -p");
  console.log(
    "2. Créez un utilisateur: CREATE USER 'recipe_user'@'localhost' IDENTIFIED BY 'recipe_password';"
  );
  console.log(
    "3. Donnez les permissions: GRANT ALL PRIVILEGES ON recipe_app.* TO 'recipe_user'@'localhost';"
  );
  console.log("4. Mettez à jour backend/config.js avec ces informations\n");
}

/**
 * Générer un fichier de configuration
 */
function generateConfigFile(workingConfig) {
  if (workingConfig) {
    const configContent = `module.exports = {
  database: {
    host: "localhost",
    port: 3306,
    user: "${workingConfig.user}",
    password: "${workingConfig.password}",
    database: "recipe_app",
  },
  port: 3000,
};
`;

    const configPath = path.join(__dirname, "backend", "config.js");

    try {
      fs.writeFileSync(configPath, configContent);
      console.log("✅ Configuration sauvegardée dans backend/config.js");
    } catch (error) {
      console.log("❌ Erreur sauvegarde config:", error.message);
    }
  }
}

/**
 * Exécuter le diagnostic complet
 */
async function runDiagnostic() {
  try {
    const mysqlRunning = await checkMySQLStatus();

    if (mysqlRunning) {
      await checkPorts();
      const workingConfig = await testConnectionConfigs();

      if (workingConfig) {
        generateConfigFile(workingConfig);
        console.log("\n🎉 Configuration trouvée et appliquée!");
        console.log("✅ Votre application devrait maintenant fonctionner");
      } else {
        proposeSolutions();
      }
    } else {
      console.log("\n🔧 MySQL n'est pas démarré");
      console.log("💡 Solutions:");
      console.log("   - Sur macOS: brew services start mysql");
      console.log("   - Sur Ubuntu: sudo service mysql start");
      console.log("   - Sur Windows: Démarrez MySQL Service");
    }
  } catch (error) {
    console.error("❌ Erreur lors du diagnostic:", error.message);
  }
}

// Exécuter le diagnostic
runDiagnostic();
