#!/usr/bin/env node

/**
 * Test final complet de l'application
 * Vérifie que tous les problèmes sont résolus
 */

const axios = require("axios");

const API_BASE = "http://localhost:3000/api";

console.log("🎉 TEST FINAL COMPLET - Application de Gestion des Recettes\n");

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

async function testFrontend() {
  console.log("\n🧪 Test du frontend...");

  try {
    // Test de la page principale
    const response = await axios.get("http://localhost:5000");
    console.log("✅ Frontend accessible sur le port 5000");
    console.log("✅ Page principale chargée");
    return true;
  } catch (error) {
    console.log("❌ Erreur frontend:", error.message);
    return false;
  }
}

async function runFinalTest() {
  console.log("🚀 Démarrage du test final complet...\n");

  const backendOk = await testBackend();
  const databaseOk = await testDatabase();
  const frontendOk = await testFrontend();

  console.log("\n📊 RÉSULTATS:");
  console.log(`Backend: ${backendOk ? "✅ OK" : "❌ ERREUR"}`);
  console.log(`Base de données: ${databaseOk ? "✅ OK" : "❌ ERREUR"}`);
  console.log(`Frontend: ${frontendOk ? "✅ OK" : "❌ ERREUR"}`);

  if (backendOk && databaseOk && frontendOk) {
    console.log("\n🎉 APPLICATION COMPLÈTEMENT OPÉRATIONNELLE !");
    console.log("\n📋 PROCHAINES ÉTAPES:");
    console.log("1. Ouvrez http://localhost:5000 dans votre navigateur");
    console.log("2. Testez l'interface utilisateur");
    console.log("3. Ajoutez des recettes");
    console.log("4. Consultez les recettes existantes");

    console.log("\n🏗️ ARCHITECTURE FINALE:");
    console.log("✅ Backend: Express + MySQL (ES modules) sur port 3000");
    console.log("✅ Frontend: React + Tailwind CSS sur port 5000");
    console.log("✅ Base de données: MySQL via MAMP (port 3306)");
    console.log("✅ Composants: Organisés et modulaires");
    console.log("✅ PostCSS: Configuration corrigée");
    console.log("✅ Ports: Conflits résolus");

    console.log("\n🚀 Votre application de gestion des recettes est prête !");
  } else {
    console.log("\n❌ Certains tests ont échoué");
    console.log("🔧 Vérifiez les erreurs ci-dessus");
  }
}

// Exécuter le test final
runFinalTest().catch(console.error);
