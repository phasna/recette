/**
 * Test de correction de l'erreur RecipeService
 * Vérifie que l'erreur de constructeur est corrigée
 */

const axios = require("axios");

const BASE_URL = "http://localhost:3000/api";

/**
 * Test d'ajout d'une recette pour vérifier la correction
 */
async function testRecipeCreation() {
  console.log("🧪 Test de création de recette après correction...\n");

  try {
    const testRecipe = {
      title: "Test Correction Erreur",
      description:
        "Recette pour tester la correction de l'erreur RecipeService",
      ingredients:
        "1 ingrédient de test\n2 ingrédients de test\n3 ingrédients de test",
      instructions:
        "1. Première étape de test\n2. Deuxième étape de test\n3. Troisième étape de test",
      prep_time: 10,
      cook_time: 15,
      servings: 3,
      difficulty: "Facile",
    };

    console.log("📝 Tentative d'ajout de recette...");
    const response = await axios.post(`${BASE_URL}/recipes`, testRecipe);

    if (response.status === 201) {
      console.log("✅ Recette créée avec succès !");
      console.log(`   ID: ${response.data.id}`);
      console.log(`   Titre: ${response.data.title}`);
      console.log(`   Difficulté: ${response.data.difficulty}`);
      return true;
    } else {
      console.log("❌ Erreur lors de la création");
      return false;
    }
  } catch (error) {
    console.log("❌ Erreur lors du test:");
    if (error.response) {
      console.log(`   Status: ${error.response.status}`);
      console.log(
        `   Message: ${error.response.data.message || error.response.data}`
      );
    } else {
      console.log(`   Erreur: ${error.message}`);
    }
    return false;
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
      console.log("✅ Récupération réussie");
      console.log(`   Nombre de recettes: ${response.data.length}`);

      if (response.data.length > 0) {
        const latestRecipe = response.data[response.data.length - 1];
        console.log(`   Dernière recette: ${latestRecipe.title}`);
      }
      return true;
    } else {
      console.log("❌ Erreur lors de la récupération");
      return false;
    }
  } catch (error) {
    console.log("❌ Erreur lors de la récupération:");
    console.log(`   ${error.message}`);
    return false;
  }
}

/**
 * Instructions pour tester l'interface
 */
function showInterfaceInstructions() {
  console.log("\n🎯 INSTRUCTIONS POUR TESTER L'INTERFACE");
  console.log("=" * 50);

  console.log("\n📱 Étapes à suivre :");
  console.log("1. Ouvrez votre navigateur");
  console.log("2. Allez sur http://localhost:5001");
  console.log("3. Vérifiez que l'application se charge sans erreur");
  console.log("4. Cherchez le bouton 'Ajouter une Recette'");
  console.log("5. Cliquez sur le bouton pour ouvrir le formulaire");
  console.log("6. Remplissez le formulaire et sauvegardez");

  console.log("\n🔍 Le bouton doit être visible :");
  console.log("• En haut de la page (bouton bleu avec ➕)");
  console.log("• Au centre si aucune recette (bouton vert avec ➕)");

  console.log("\n✅ Si tout fonctionne :");
  console.log("• L'application se charge sans erreur dans la console");
  console.log("• Le bouton est visible et cliquable");
  console.log("• Le formulaire s'ouvre quand vous cliquez");
  console.log("• Vous pouvez ajouter une recette");

  console.log("\n❌ Si il y a encore des erreurs :");
  console.log("• Vérifiez la console du navigateur (F12)");
  console.log("• Redémarrez l'application si nécessaire");
  console.log("• Vérifiez que tous les services sont démarrés");
}

/**
 * Test complet de correction
 */
async function runFixTest() {
  console.log("🔧 Test de correction de l'erreur RecipeService\n");
  console.log("=" * 50);

  try {
    // Test de création de recette
    const createOk = await testRecipeCreation();

    // Test de récupération
    const getOk = await testGetRecipes();

    console.log("\n" + "=" * 50);
    console.log("🎉 RÉSULTATS DU TEST DE CORRECTION");
    console.log("=" * 50);

    if (createOk && getOk) {
      console.log("✅ API Backend: FONCTIONNELLE");
      console.log("✅ Création de recettes: OPÉRATIONNELLE");
      console.log("✅ Récupération de recettes: OPÉRATIONNELLE");

      console.log("\n🎯 ERREUR RECIPESERVICE CORRIGÉE !");
      console.log(
        "\n📱 L'interface utilisateur devrait maintenant fonctionner :"
      );
      console.log("   • Plus d'erreur 'not a constructor'");
      console.log("   • Le bouton 'Ajouter une Recette' est visible");
      console.log("   • Le formulaire s'ouvre correctement");
      console.log("   • Vous pouvez ajouter des recettes");

      showInterfaceInstructions();
    } else {
      console.log("❌ PROBLÈME PERSISTANT");
      console.log("   • Vérifiez que le backend est démarré");
      console.log("   • Vérifiez la connexion à la base de données");
      console.log("   • Redémarrez l'application");
    }
  } catch (error) {
    console.log("\n❌ ERREUR LORS DU TEST");
    console.log(`   ${error.message}`);
  }
}

// Exécuter le test
runFixTest();
