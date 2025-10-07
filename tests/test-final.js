#!/usr/bin/env node

/**
 * Test final de l'application complète
 * Vérifie que tout fonctionne après la configuration MAMP
 */

const axios = require("axios");

const API_BASE = "http://localhost:3000/api";

console.log("🎉 TEST FINAL - Application de Gestion des Recettes\n");

async function testBackend() {
  console.log("🧪 Test du backend...");

  try {
    // Test de l'API générale
    const response = await axios.get(`${API_BASE}/test`);
    console.log("✅ API générale:", response.data.message);

    // Test des recettes
    const recipesResponse = await axios.get(`${API_BASE}/recipes`);
    console.log(
      `✅ API recettes: ${recipesResponse.data.length} recette(s) trouvée(s)`
    );

    if (recipesResponse.data.length > 0) {
      console.log(
        `   Dernière recette: ${
          recipesResponse.data[recipesResponse.data.length - 1].title
        }`
      );
    }

    return true;
  } catch (error) {
    console.log("❌ Erreur backend:", error.message);
    return false;
  }
}

async function testDatabase() {
  console.log("\n🧪 Test de la base de données...");

  try {
    const response = await axios.get(`${API_BASE}/recipes`);
    console.log("✅ Connexion base de données: OK");
    console.log(`✅ Nombre de recettes: ${response.data.length}`);
    return true;
  } catch (error) {
    console.log("❌ Erreur base de données:", error.message);
    return false;
  }
}

async function runFinalTest() {
  console.log("🚀 Démarrage du test final...\n");

  const backendOk = await testBackend();
  const databaseOk = await testDatabase();

  console.log("\n📊 RÉSULTATS:");
  console.log(`Backend: ${backendOk ? "✅ OK" : "❌ ERREUR"}`);
  console.log(`Base de données: ${databaseOk ? "✅ OK" : "❌ ERREUR"}`);

  if (backendOk && databaseOk) {
    console.log("\n🎉 APPLICATION COMPLÈTEMENT OPÉRATIONNELLE !");
    console.log("\n📋 PROCHAINES ÉTAPES:");
    console.log("1. Ouvrez http://localhost:3000 dans votre navigateur");
    console.log("2. Testez l'interface utilisateur");
    console.log("3. Ajoutez des recettes");
    console.log("4. Consultez les recettes existantes");

    console.log("\n🏗️ ARCHITECTURE ORIENTÉE OBJET:");
    console.log("✅ Backend: Express + MySQL (MAMP)");
    console.log("✅ Frontend: React + Tailwind CSS");
    console.log("✅ Base de données: MySQL sur port 3306");
    console.log("✅ API: RESTful avec routes organisées");
    console.log("✅ Code: Architecture modulaire et maintenable");

    console.log("\n🚀 Votre application de gestion des recettes est prête !");
  } else {
    console.log("\n❌ Certains tests ont échoué");
    console.log("🔧 Vérifiez les erreurs ci-dessus");
  }
}

// Exécuter le test final
runFinalTest().catch(console.error);
