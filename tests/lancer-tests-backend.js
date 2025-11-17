/**
 * Script pour lancer tous les tests backend
 * Usage: node tests/lancer-tests-backend.js
 */

const { execSync } = require("child_process");
const path = require("path");

// Couleurs pour l'affichage
const colors = {
  green: "\x1b[32m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  reset: "\x1b[0m",
};

let modelPassed = false;
let apiPassed = false;

console.log("\n" + "=".repeat(60));
console.log(`${colors.blue}🧪 TESTS BACKEND - AddRecipe${colors.reset}`);
console.log("=".repeat(60));
console.log("");

// ============================================
// TEST 1 : Modèle Recipe (pas besoin de backend)
// ============================================

console.log(`${colors.blue}1️⃣ TEST UNITAIRE - Modèle Recipe${colors.reset}`);
console.log("-".repeat(60));

try {
  console.log("⏳ Exécution...\n");
  execSync("node tests/unitaire/modeles/test-recipe.js", {
    cwd: path.resolve(__dirname, ".."),
    stdio: "inherit",
    encoding: "utf-8",
  });
  console.log(`${colors.green}✅ Test Modèle Recipe réussi !${colors.reset}`);
  modelPassed = true;
} catch (error) {
  console.log(`${colors.red}❌ Test Modèle Recipe échoué${colors.reset}`);
  modelPassed = false;
}

console.log("\n");

// ============================================
// TEST 2 : API Recette (besoin du backend)
// ============================================

console.log(`${colors.blue}2️⃣ TEST UNITAIRE - API Recette${colors.reset}`);
console.log("-".repeat(60));

try {
  console.log("⏳ Exécution...");
  console.log(
    "   ⚠️  Nécessite le backend démarré (cd backend && npm start)\n"
  );

  execSync("node tests/unitaire/api/test-api-recette.js", {
    cwd: path.resolve(__dirname, ".."),
    stdio: "inherit",
    encoding: "utf-8",
  });

  console.log(`${colors.green}✅ Test API Recette réussi !${colors.reset}`);
  apiPassed = true;
} catch (error) {
  console.log(`${colors.red}❌ Test API Recette échoué${colors.reset}`);
  console.log("💡 Assurez-vous que le backend est démarré :");
  console.log("   cd backend && npm start");
  apiPassed = false;
}

// ============================================
// RÉSUMÉ
// ============================================

console.log("\n" + "=".repeat(60));
console.log(`${colors.blue}📊 RÉSUMÉ${colors.reset}`);
console.log("=".repeat(60));
console.log("");

console.log(
  `${modelPassed ? colors.green : colors.red}✅ Modèle Recipe : ${
    modelPassed ? "PASS" : "FAIL"
  }${colors.reset}`
);
console.log(
  `${apiPassed ? colors.green : colors.red}✅ API Recette : ${
    apiPassed ? "PASS" : "FAIL"
  }${colors.reset}`
);

const allPassed = modelPassed && apiPassed;

if (allPassed) {
  console.log(
    `\n${colors.green}🎉 TOUS LES TESTS BACKEND SONT PASSÉS !${colors.reset}\n`
  );
  process.exit(0);
} else {
  console.log(`\n${colors.yellow}⚠️  CERTAINS TESTS ONT ÉCHOUÉ${colors.reset}`);
  console.log("");
  if (!apiPassed) {
    console.log("💡 Pour résoudre :");
    console.log("   1. Démarrer le backend : cd backend && npm start");
    console.log("   2. Vérifier que le port 3000 est libre");
    console.log("   3. Vérifier la connexion à la base de données");
  }
  console.log("");
  process.exit(1);
}
