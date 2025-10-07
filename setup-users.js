/**
 * Script de configuration du système d'utilisateurs
 * Installe les dépendances et configure la base de données
 */

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

console.log("🚀 Configuration du système d'utilisateurs...\n");

// 1. Installer les nouvelles dépendances
console.log("📦 Installation des dépendances...");
try {
  execSync("cd backend && npm install bcryptjs jsonwebtoken", {
    stdio: "inherit",
  });
  console.log("✅ Dépendances installées avec succès\n");
} catch (error) {
  console.error(
    "❌ Erreur lors de l'installation des dépendances:",
    error.message
  );
  process.exit(1);
}

// 2. Vérifier que la base de données existe
console.log("🗄️ Configuration de la base de données...");
const dbScript = path.join(__dirname, "database_setup_users.sql");

if (!fs.existsSync(dbScript)) {
  console.error("❌ Fichier database_setup_users.sql non trouvé");
  process.exit(1);
}

console.log("✅ Script de base de données trouvé");
console.log(
  "📝 Veuillez exécuter le script SQL suivant dans phpMyAdmin ou MySQL :"
);
console.log("   Fichier: database_setup_users.sql");
console.log("   Ou exécutez: mysql -u root -p < database_setup_users.sql\n");

// 3. Créer un fichier de configuration d'environnement
console.log("🔧 Configuration de l'environnement...");
const envContent = `# Configuration de l'application
NODE_ENV=development
PORT=3000

# Configuration de la base de données
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=root
DB_NAME=recipe_app

# Configuration JWT
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Configuration CORS
CORS_ORIGIN=http://localhost:5001
`;

const envPath = path.join(__dirname, "backend", ".env");
if (!fs.existsSync(envPath)) {
  fs.writeFileSync(envPath, envContent);
  console.log("✅ Fichier .env créé dans le dossier backend");
} else {
  console.log("⚠️  Fichier .env existe déjà");
}

console.log("\n🎉 Configuration terminée !");
console.log("\n📋 Prochaines étapes :");
console.log("1. Exécutez le script SQL database_setup_users.sql");
console.log("2. Redémarrez le backend : cd backend && npm run dev");
console.log("3. Testez l'API : http://localhost:3000/api/test");
console.log("\n🔐 Nouvelles fonctionnalités disponibles :");
console.log("• POST /api/users/register - Inscription");
console.log("• POST /api/users/login - Connexion");
console.log("• GET /api/users/profile - Profil utilisateur");
console.log("• GET /api/recipes?my_recipes=true - Mes recettes");
console.log("\n🚀 Votre système d'utilisateurs est prêt !");
