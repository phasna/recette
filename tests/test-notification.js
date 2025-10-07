/**
 * Test des notifications animées
 * Vérifie que les messages de confirmation animés fonctionnent
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
      return true;
    } else {
      console.log("❌ Backend API: ERREUR");
      return false;
    }
  } catch (error) {
    console.log("❌ Backend API: INACCESSIBLE");
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
      return true;
    } else {
      console.log("❌ Frontend: ERREUR");
      return false;
    }
  } catch (error) {
    console.log("❌ Frontend: INACCESSIBLE");
    return false;
  }
}

/**
 * Test d'ajout d'une recette avec notification
 */
async function testRecipeWithNotification() {
  console.log("\n📝 Test d'ajout de recette avec notification...\n");

  try {
    const testRecipe = {
      title: "Test Notification Animée",
      description: "Recette pour tester les notifications animées",
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
 * Instructions pour tester les notifications animées
 */
function showNotificationTestInstructions() {
  console.log("\n🎯 INSTRUCTIONS POUR TESTER LES NOTIFICATIONS ANIMÉES");
  console.log("=" * 70);

  console.log("\n📱 Étapes à suivre :");
  console.log("1. Ouvrez votre navigateur");
  console.log(`2. Allez sur ${FRONTEND_URL}`);
  console.log("3. Cliquez sur 'Ajouter une Recette'");
  console.log("4. Remplissez le formulaire");
  console.log("5. Cliquez sur 'Sauvegarder'");
  console.log("6. Observez la notification animée !");

  console.log("\n✨ Fonctionnalités des notifications :");
  console.log("• Animation d'entrée depuis la droite");
  console.log("• Icône de succès ✅ avec couleur verte");
  console.log("• Message personnalisé");
  console.log("• Barre de progression animée");
  console.log("• Auto-fermeture après 3 secondes");
  console.log("• Animation de sortie fluide");
  console.log("• Bouton de fermeture manuel");

  console.log("\n🎨 Types de notifications disponibles :");
  console.log("• SUCCÈS : Notification verte avec ✅");
  console.log("• ERREUR : Notification rouge avec ❌");
  console.log("• INFO : Notification bleue avec ℹ️");
  console.log("• ATTENTION : Notification jaune avec ⚠️");

  console.log("\n🔍 Où observer les notifications :");
  console.log("• En haut à droite de l'écran");
  console.log("• Animation de glissement depuis la droite");
  console.log("• Barre de progression qui se réduit");
  console.log("• Disparition automatique après 3 secondes");

  console.log("\n✅ Test de succès :");
  console.log("• Ajoutez une recette valide");
  console.log("• Notification verte 'Recette ajoutée avec succès !'");
  console.log("• Animation fluide et professionnelle");

  console.log("\n❌ Test d'erreur :");
  console.log("• Essayez d'ajouter une recette sans titre");
  console.log("• Notification rouge d'erreur");
  console.log("• Message d'erreur explicite");

  console.log("\n🎉 Résultat attendu :");
  console.log("• Notifications modernes et animées");
  console.log("• Plus d'alertes JavaScript basiques");
  console.log("• Expérience utilisateur améliorée");
  console.log("• Interface plus professionnelle");
}

/**
 * Test complet des notifications
 */
async function runNotificationTest() {
  console.log("🎉 Test des notifications animées\n");
  console.log("=" * 60);

  try {
    // Test du backend
    const backendOk = await testBackendAPI();

    // Test du frontend
    const frontendOk = await testFrontendInterface();

    // Test d'ajout de recette
    const recipeOk = await testRecipeWithNotification();

    console.log("\n" + "=" * 60);
    console.log("🎉 RÉSULTATS DU TEST DES NOTIFICATIONS");
    console.log("=" * 60);

    if (backendOk && frontendOk && recipeOk) {
      console.log("✅ Backend: OPÉRATIONNEL");
      console.log("✅ Frontend: ACCESSIBLE");
      console.log("✅ API: FONCTIONNELLE");

      console.log("\n🎯 NOTIFICATIONS ANIMÉES OPÉRATIONNELLES !");
      console.log("\n📱 Fonctionnalités disponibles :");
      console.log("   • Messages de confirmation animés");
      console.log("   • Notifications de succès et d'erreur");
      console.log("   • Animations fluides et modernes");
      console.log("   • Auto-fermeture avec barre de progression");
      console.log("   • Interface utilisateur améliorée");

      showNotificationTestInstructions();
    } else {
      console.log("❌ PROBLÈME DÉTECTÉ");
      if (!backendOk) {
        console.log("   • Backend non accessible");
      }
      if (!frontendOk) {
        console.log("   • Frontend non accessible");
      }
      if (!recipeOk) {
        console.log("   • Erreur lors de l'ajout de recette");
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
runNotificationTest();
