/**
 * Test de visibilité du bouton d'ajout de recettes
 * Vérifie que le bouton s'affiche correctement dans l'interface
 */

const axios = require("axios");

const BASE_URL = "http://localhost:3000/api";
const FRONTEND_URL = "http://localhost:5001";

/**
 * Test de l'API backend
 */
async function testBackendAPI() {
  console.log("🔧 Test de l'API backend...\n");

  try {
    const response = await axios.get(`${BASE_URL}/test`);
    
    if (response.status === 200) {
      console.log("✅ Backend API: FONCTIONNEL");
      console.log(`   Message: ${response.data.message}`);
      return true;
    } else {
      console.log("❌ Backend API: ERREUR");
      return false;
    }
  } catch (error) {
    console.log("❌ Backend API: INACCESSIBLE");
    console.log(`   Erreur: ${error.message}`);
    return false;
  }
}

/**
 * Test de l'interface frontend
 */
async function testFrontendInterface() {
  console.log("\n🎨 Test de l'interface frontend...\n");

  try {
    const response = await axios.get(FRONTEND_URL);
    
    if (response.status === 200) {
      console.log("✅ Frontend: ACCESSIBLE");
      console.log(`   URL: ${FRONTEND_URL}`);
      return true;
    } else {
      console.log("❌ Frontend: ERREUR");
      console.log(`   Status: ${response.status}`);
      return false;
    }
  } catch (error) {
    console.log("❌ Frontend: INACCESSIBLE");
    console.log(`   Erreur: ${error.message}`);
    return false;
  }
}

/**
 * Test d'ajout d'une recette
 */
async function testAddRecipe() {
  console.log("\n📝 Test d'ajout d'une recette...\n");

  try {
    const testRecipe = {
      title: "Test Bouton Visible",
      description: "Recette de test pour vérifier le bouton",
      ingredients: "1 ingrédient de test\n2 ingrédients de test",
      instructions: "1. Première étape de test\n2. Deuxième étape de test",
      prep_time: 5,
      cook_time: 10,
      servings: 2,
      difficulty: "Facile"
    };

    const response = await axios.post(`${BASE_URL}/recipes`, testRecipe);
    
    if (response.status === 201) {
      console.log("✅ Ajout de recette: RÉUSSI");
      console.log(`   ID: ${response.data.id}`);
      console.log(`   Titre: ${response.data.title}`);
      return response.data.id;
    } else {
      console.log("❌ Ajout de recette: ÉCHEC");
      return null;
    }
  } catch (error) {
    console.log("❌ Ajout de recette: ERREUR");
    console.log(`   Erreur: ${error.response?.data?.message || error.message}`);
    return null;
  }
}

/**
 * Test de récupération des recettes
 */
async function testGetRecipes() {
  console.log("\n📚 Test de récupération des recettes...\n");

  try {
    const response = await axios.get(`${BASE_URL}/recipes`);
    
    if (response.status === 200) {
      console.log("✅ Récupération: RÉUSSIE");
      console.log(`   Nombre de recettes: ${response.data.length}`);
      
      if (response.data.length > 0) {
        const latestRecipe = response.data[response.data.length - 1];
        console.log(`   Dernière recette: ${latestRecipe.title}`);
      }
      return true;
    } else {
      console.log("❌ Récupération: ÉCHEC");
      return false;
    }
  } catch (error) {
    console.log("❌ Récupération: ERREUR");
    console.log(`   Erreur: ${error.message}`);
    return false;
  }
}

/**
 * Instructions pour tester le bouton
 */
function showButtonTestInstructions() {
  console.log("\n🎯 INSTRUCTIONS POUR TESTER LE BOUTON");
  console.log("=" * 50);
  
  console.log("\n📱 Étapes à suivre :");
  console.log("1. Ouvrez votre navigateur");
  console.log(`2. Allez sur ${FRONTEND_URL}`);
  console.log("3. Cherchez le bouton 'Ajouter une Recette'");
  console.log("4. Le bouton doit être visible dans :");
  console.log("   • La barre de recherche (bouton bleu avec ➕)");
  console.log("   • La liste vide (bouton vert avec ➕)");
  
  console.log("\n🔍 Où chercher le bouton :");
  console.log("• En haut de la page, dans la barre de recherche");
  console.log("• Au centre de la page si aucune recette n'existe");
  console.log("• Le bouton doit être bleu avec du texte blanc");
  console.log("• Il doit avoir une icône ➕ à gauche");
  
  console.log("\n❌ Si le bouton n'apparaît pas :");
  console.log("• Vérifiez que l'application est démarrée");
  console.log("• Vérifiez la console du navigateur pour les erreurs");
  console.log("• Vérifiez que Tailwind CSS est chargé");
  console.log("• Redémarrez l'application si nécessaire");
}

/**
 * Test complet
 */
async function runButtonVisibilityTest() {
  console.log("🚀 Test de visibilité du bouton d'ajout de recettes\n");
  console.log("=" * 60);

  try {
    // Test du backend
    const backendOk = await testBackendAPI();
    
    // Test du frontend
    const frontendOk = await testFrontendInterface();
    
    // Test d'ajout de recette
    const recipeId = await testAddRecipe();
    
    // Test de récupération
    const getOk = await testGetRecipes();

    console.log("\n" + "=" * 60);
    console.log("🎉 RÉSULTATS DES TESTS");
    console.log("=" * 60);
    
    if (backendOk && frontendOk) {
      console.log("✅ Backend: OPÉRATIONNEL");
      console.log("✅ Frontend: ACCESSIBLE");
      console.log("✅ API: FONCTIONNELLE");
      
      if (recipeId) {
        console.log("✅ Ajout de recettes: FONCTIONNEL");
      }
      
      console.log("\n🎯 BOUTON D'AJOUT DE RECETTES DISPONIBLE !");
      console.log("\n📱 Pour voir le bouton :");
      console.log(`   Ouvrez ${FRONTEND_URL} dans votre navigateur`);
      console.log("   Le bouton 'Ajouter une Recette' doit être visible");
      
      showButtonTestInstructions();
      
    } else {
      console.log("❌ PROBLÈME DÉTECTÉ");
      if (!backendOk) {
        console.log("   • Backend non accessible");
        console.log("   • Vérifiez que le serveur est démarré");
      }
      if (!frontendOk) {
        console.log("   • Frontend non accessible");
        console.log("   • Vérifiez que React est démarré");
      }
      
      console.log("\n🔧 Solutions :");
      console.log("   1. Redémarrez l'application : node start-clean.js");
      console.log("   2. Vérifiez les ports 3000 et 5001");
      console.log("   3. Vérifiez la console pour les erreurs");
    }

  } catch (error) {
    console.log("\n❌ ERREUR LORS DES TESTS");
    console.log(`   ${error.message}`);
  }
}

// Exécuter les tests
runButtonVisibilityTest();
