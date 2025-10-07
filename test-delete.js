import axios from "axios";

/**
 * Test de suppression de recette
 */
async function testDelete() {
  try {
    console.log("🧪 Test de suppression de recette...");

    // 1. Vérifier que le serveur backend est accessible
    console.log("1. Test de connexion au backend...");
    const testResponse = await axios.get("http://localhost:3000/api/test");
    console.log("✅ Backend accessible:", testResponse.data);

    // 2. Lister les recettes existantes
    console.log("2. Récupération des recettes...");
    const recipesResponse = await axios.get(
      "http://localhost:3000/api/recipes"
    );
    console.log("📋 Recettes disponibles:", recipesResponse.data.length);

    if (recipesResponse.data.length === 0) {
      console.log("❌ Aucune recette à supprimer");
      return;
    }

    // 3. Tenter de supprimer la première recette
    const firstRecipe = recipesResponse.data[0];
    console.log(
      "🎯 Tentative de suppression de la recette:",
      firstRecipe.id,
      firstRecipe.title
    );

    const deleteResponse = await axios.delete(
      `http://localhost:3000/api/recipes/${firstRecipe.id}`
    );
    console.log("✅ Suppression réussie:", deleteResponse.data);

    // 4. Vérifier que la recette a bien été supprimée
    console.log("4. Vérification de la suppression...");
    const updatedRecipesResponse = await axios.get(
      "http://localhost:3000/api/recipes"
    );
    console.log(
      "📋 Nombre de recettes après suppression:",
      updatedRecipesResponse.data.length
    );
  } catch (error) {
    console.error("❌ Erreur lors du test:", error.message);
    if (error.response) {
      console.error("📊 Détails de l'erreur:", {
        status: error.response.status,
        statusText: error.response.statusText,
        data: error.response.data,
      });
    }
  }
}

// Exécuter le test
testDelete();
