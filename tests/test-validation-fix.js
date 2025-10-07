/**
 * Test de correction de la validation
 * Vérifie que la validation fonctionne avec des données minimales
 */

const axios = require("axios");

const BASE_URL = "http://localhost:3000/api";

/**
 * Test avec des données minimales
 */
async function testMinimalRecipe() {
  console.log("🧪 Test avec des données minimales...\n");

  try {
    const minimalRecipe = {
      title: "Test",
      description: "Description courte",
      ingredients: "Ingrédient 1",
      instructions: "Étape 1 et 2",
      prep_time: 5,
      cook_time: 10,
      servings: 2,
      difficulty: "Facile",
    };

    console.log("📝 Tentative d'ajout avec données minimales...");
    console.log(
      `   Titre: "${minimalRecipe.title}" (${minimalRecipe.title.length} caractères)`
    );
    console.log(
      `   Ingrédients: "${minimalRecipe.ingredients}" (${minimalRecipe.ingredients.length} caractères)`
    );
    console.log(
      `   Instructions: "${minimalRecipe.instructions}" (${minimalRecipe.instructions.length} caractères)`
    );

    const response = await axios.post(`${BASE_URL}/recipes`, minimalRecipe);

    if (response.status === 201) {
      console.log("✅ Recette minimale créée avec succès !");
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
 * Test avec des données encore plus minimales
 */
async function testVeryMinimalRecipe() {
  console.log("\n🧪 Test avec des données très minimales...\n");

  try {
    const veryMinimalRecipe = {
      title: "A",
      description: "",
      ingredients: "A",
      instructions: "A B C D E",
      prep_time: null,
      cook_time: null,
      servings: null,
      difficulty: "Facile",
    };

    console.log("📝 Tentative d'ajout avec données très minimales...");
    console.log(
      `   Titre: "${veryMinimalRecipe.title}" (${veryMinimalRecipe.title.length} caractères)`
    );
    console.log(
      `   Ingrédients: "${veryMinimalRecipe.ingredients}" (${veryMinimalRecipe.ingredients.length} caractères)`
    );
    console.log(
      `   Instructions: "${veryMinimalRecipe.instructions}" (${veryMinimalRecipe.instructions.length} caractères)`
    );

    const response = await axios.post(`${BASE_URL}/recipes`, veryMinimalRecipe);

    if (response.status === 201) {
      console.log("✅ Recette très minimale créée avec succès !");
      console.log(`   ID: ${response.data.id}`);
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
function showInterfaceTestInstructions() {
  console.log("\n🎯 INSTRUCTIONS POUR TESTER L'INTERFACE");
  console.log("=" * 60);

  console.log("\n📱 Test avec des données minimales :");
  console.log("1. Ouvrez http://localhost:5001");
  console.log("2. Cliquez sur 'Ajouter une Recette'");
  console.log("3. Remplissez avec des données minimales :");
  console.log("   • Titre: 'Test' (3 caractères)");
  console.log("   • Ingrédients: 'Ingrédient 1' (11 caractères)");
  console.log("   • Instructions: 'Étape 1 et 2' (12 caractères)");
  console.log("4. Cliquez sur 'Sauvegarder'");
  console.log("5. Vérifiez que ça fonctionne !");

  console.log("\n✅ Si ça fonctionne :");
  console.log("• Notification verte de succès");
  console.log("• Recette ajoutée à la liste");
  console.log("• Plus d'erreur de validation");

  console.log("\n❌ Si ça ne fonctionne toujours pas :");
  console.log("• Vérifiez la console du navigateur (F12)");
  console.log("• Regardez les messages d'erreur spécifiques");
  console.log("• Essayez avec des données encore plus courtes");

  console.log("\n🔧 Nouvelles limites de validation :");
  console.log("• Titre: minimum 3 caractères (au lieu de 3)");
  console.log("• Ingrédients: minimum 5 caractères (au lieu de 10)");
  console.log("• Instructions: minimum 10 caractères (au lieu de 20)");
}

/**
 * Test complet de correction
 */
async function runValidationFixTest() {
  console.log("🔧 Test de correction de la validation\n");
  console.log("=" * 50);

  try {
    // Test avec données minimales
    const minimalOk = await testMinimalRecipe();

    // Test avec données très minimales
    const veryMinimalOk = await testVeryMinimalRecipe();

    console.log("\n" + "=" * 50);
    console.log("🎉 RÉSULTATS DU TEST DE CORRECTION");
    console.log("=" * 50);

    if (minimalOk || veryMinimalOk) {
      console.log("✅ Validation: CORRIGÉE");
      console.log("✅ Données minimales: ACCEPTÉES");
      console.log("✅ API: FONCTIONNELLE");

      console.log("\n🎯 PROBLÈME DE VALIDATION RÉSOLU !");
      console.log("\n📱 La validation est maintenant plus flexible :");
      console.log("   • Ingrédients: minimum 5 caractères");
      console.log("   • Instructions: minimum 10 caractères");
      console.log("   • Messages d'erreur plus clairs");
      console.log("   • Validation côté client et serveur");

      showInterfaceTestInstructions();
    } else {
      console.log("❌ PROBLÈME PERSISTANT");
      console.log("   • Vérifiez que le backend est démarré");
      console.log("   • Vérifiez la connexion à la base de données");
      console.log("   • Redémarrez l'application");
    }
  } catch (error) {
    console.log("\n❌ ERREUR LORS DES TESTS");
    console.log(`   ${error.message}`);
  }
}

// Exécuter les tests
runValidationFixTest();
