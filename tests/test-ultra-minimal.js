/**
 * Test avec des données ultra-minimales
 * Vérifie que "ddd" et "dd" passent la validation
 */

const axios = require("axios");

const BASE_URL = "http://localhost:3000/api";

/**
 * Test avec des données ultra-minimales comme dans l'interface
 */
async function testUltraMinimalRecipe() {
  console.log("🧪 Test avec des données ultra-minimales...\n");

  try {
    const ultraMinimalRecipe = {
      title: "pate au crême",
      description: "ddd",
      ingredients: "ddd",
      instructions: "dd",
      prep_time: 11,
      cook_time: 39,
      servings: 3,
      difficulty: "Facile",
    };

    console.log("📝 Tentative d'ajout avec données ultra-minimales...");
    console.log(
      `   Titre: "${ultraMinimalRecipe.title}" (${ultraMinimalRecipe.title.length} caractères)`
    );
    console.log(
      `   Ingrédients: "${ultraMinimalRecipe.ingredients}" (${ultraMinimalRecipe.ingredients.length} caractères)`
    );
    console.log(
      `   Instructions: "${ultraMinimalRecipe.instructions}" (${ultraMinimalRecipe.instructions.length} caractères)`
    );

    const response = await axios.post(
      `${BASE_URL}/recipes`,
      ultraMinimalRecipe
    );

    if (response.status === 201) {
      console.log("✅ Recette ultra-minimale créée avec succès !");
      console.log(`   ID: ${response.data.id}`);
      console.log(`   Titre: ${response.data.title}`);
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
 * Instructions pour tester l'interface
 */
function showUltraMinimalTestInstructions() {
  console.log("\n🎯 INSTRUCTIONS POUR TESTER L'INTERFACE");
  console.log("=" * 60);

  console.log("\n📱 Test avec vos données exactes :");
  console.log("1. Ouvrez http://localhost:5001");
  console.log("2. Cliquez sur 'Ajouter une Recette'");
  console.log("3. Remplissez avec vos données :");
  console.log("   • Titre: 'pate au crême'");
  console.log("   • Description: 'ddd'");
  console.log("   • Ingrédients: 'ddd' (3 caractères)");
  console.log("   • Instructions: 'dd' (2 caractères)");
  console.log("   • Temps: 11 min préparation, 39 min cuisson");
  console.log("   • Portions: 3");
  console.log("   • Difficulté: Facile");
  console.log("4. Cliquez sur 'Sauvegarder'");
  console.log("5. Ça devrait fonctionner maintenant !");

  console.log("\n✅ Nouvelles limites de validation :");
  console.log("• Titre: minimum 3 caractères");
  console.log("• Ingrédients: minimum 3 caractères (au lieu de 5)");
  console.log("• Instructions: minimum 3 caractères (au lieu de 10)");

  console.log("\n🎉 Résultat attendu :");
  console.log("• Plus d'erreur de validation");
  console.log("• Notification verte de succès");
  console.log("• Recette ajoutée à la liste");
}

/**
 * Test complet
 */
async function runUltraMinimalTest() {
  console.log("🔧 Test avec données ultra-minimales\n");
  console.log("=" * 50);

  try {
    const ultraMinimalOk = await testUltraMinimalRecipe();

    console.log("\n" + "=" * 50);
    console.log("🎉 RÉSULTATS DU TEST ULTRA-MINIMAL");
    console.log("=" * 50);

    if (ultraMinimalOk) {
      console.log("✅ Validation: ULTRA-FLEXIBLE");
      console.log("✅ Données ultra-minimales: ACCEPTÉES");
      console.log("✅ API: FONCTIONNELLE");

      console.log("\n🎯 PROBLÈME DE VALIDATION DÉFINITIVEMENT RÉSOLU !");
      console.log("\n📱 La validation accepte maintenant :");
      console.log("   • Ingrédients: minimum 3 caractères");
      console.log("   • Instructions: minimum 3 caractères");
      console.log("   • Vos données 'ddd' et 'dd' fonctionnent !");

      showUltraMinimalTestInstructions();
    } else {
      console.log("❌ PROBLÈME PERSISTANT");
      console.log("   • Vérifiez que le backend est démarré");
      console.log("   • Redémarrez l'application");
    }
  } catch (error) {
    console.log("\n❌ ERREUR LORS DES TESTS");
    console.log(`   ${error.message}`);
  }
}

// Exécuter les tests
runUltraMinimalTest();
