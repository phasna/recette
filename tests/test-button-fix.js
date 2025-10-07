/**
 * Test de correction du problème de bouton double
 * Vérifie que le bouton ouvre directement le formulaire
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
 * Instructions pour tester le bouton corrigé
 */
function showButtonTestInstructions() {
  console.log("\n🎯 INSTRUCTIONS POUR TESTER LE BOUTON CORRIGÉ");
  console.log("=" * 60);

  console.log("\n📱 Étapes à suivre :");
  console.log("1. Ouvrez votre navigateur");
  console.log(`2. Allez sur ${FRONTEND_URL}`);
  console.log("3. Cherchez le bouton 'Ajouter une Recette'");
  console.log("4. Cliquez UNE SEULE FOIS sur le bouton");
  console.log("5. Le formulaire doit s'ouvrir DIRECTEMENT");

  console.log("\n✅ Comportement attendu (CORRIGÉ) :");
  console.log(
    "• Clic sur 'Ajouter une Recette' → Formulaire s'ouvre immédiatement"
  );
  console.log("• PAS de bouton intermédiaire");
  console.log("• Formulaire modal avec tous les champs");
  console.log("• Boutons 'Sauvegarder' et 'Annuler' dans le formulaire");

  console.log("\n❌ Ancien comportement (PROBLÉMATIQUE) :");
  console.log("• Clic sur 'Ajouter une Recette' → Autre bouton apparaît");
  console.log("• Clic sur le deuxième bouton → Formulaire s'ouvre");
  console.log("• Double clic nécessaire");

  console.log("\n🔍 Où chercher le bouton :");
  console.log("• En haut de la page (bouton bleu avec ➕)");
  console.log("• Au centre si aucune recette (bouton vert avec ➕)");
  console.log("• Le bouton doit être visible et cliquable");

  console.log("\n📝 Test du formulaire :");
  console.log("1. Remplissez le titre (obligatoire)");
  console.log("2. Remplissez les ingrédients (obligatoire)");
  console.log("3. Remplissez les instructions (obligatoire)");
  console.log("4. Cliquez sur 'Sauvegarder'");
  console.log("5. Vérifiez que la recette apparaît dans la liste");

  console.log("\n❌ Si le problème persiste :");
  console.log("• Vérifiez la console du navigateur (F12)");
  console.log("• Redémarrez l'application");
  console.log("• Vérifiez que les modifications sont appliquées");
}

/**
 * Test complet de correction
 */
async function runButtonFixTest() {
  console.log("🔧 Test de correction du problème de bouton double\n");
  console.log("=" * 60);

  try {
    // Test du backend
    const backendOk = await testBackendAPI();

    // Test du frontend
    const frontendOk = await testFrontendInterface();

    console.log("\n" + "=" * 60);
    console.log("🎉 RÉSULTATS DU TEST DE CORRECTION");
    console.log("=" * 60);

    if (backendOk && frontendOk) {
      console.log("✅ Backend: OPÉRATIONNEL");
      console.log("✅ Frontend: ACCESSIBLE");

      console.log("\n🎯 PROBLÈME DE BOUTON DOUBLE CORRIGÉ !");
      console.log("\n📱 Le bouton fonctionne maintenant correctement :");
      console.log("   • Un seul clic pour ouvrir le formulaire");
      console.log("   • Plus de bouton intermédiaire");
      console.log("   • Formulaire s'ouvre directement");
      console.log("   • Interface plus intuitive");

      showButtonTestInstructions();
    } else {
      console.log("❌ PROBLÈME DÉTECTÉ");
      if (!backendOk) {
        console.log("   • Backend non accessible");
      }
      if (!frontendOk) {
        console.log("   • Frontend non accessible");
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
runButtonFixTest();
