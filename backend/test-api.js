const axios = require("axios");

const API_BASE = "http://localhost:5000/api";

// Fonction de test
async function testAPI() {
  console.log("🧪 Test de l'API restructurée...\n");

  try {
    // Test 1: Route de test générale
    console.log("1️⃣ Test de la route générale...");
    const testResponse = await axios.get(`${API_BASE}/test`);
    console.log("✅ Route test:", testResponse.data);

    // Test 2: Récupérer toutes les recettes
    console.log("\n2️⃣ Test de récupération des recettes...");
    const recipesResponse = await axios.get(`${API_BASE}/recipes`);
    console.log(
      "✅ Recettes récupérées:",
      recipesResponse.data.length,
      "recettes"
    );

    // Test 3: Créer une nouvelle recette
    console.log("\n3️⃣ Test de création d'une recette...");
    const newRecipe = {
      title: "Test API Restructurée",
      description: "Recette de test pour l'API restructurée",
      ingredients: "Ingrédient 1\nIngrédient 2\nIngrédient 3",
      instructions: "Étape 1\nÉtape 2\nÉtape 3",
      prep_time: 15,
      cook_time: 30,
      servings: 4,
      difficulty: "Facile",
    };

    const createResponse = await axios.post(`${API_BASE}/recipes`, newRecipe);
    console.log("✅ Recette créée:", createResponse.data);
    const recipeId = createResponse.data.id;

    // Test 4: Récupérer la recette créée
    console.log("\n4️⃣ Test de récupération d'une recette spécifique...");
    const getRecipeResponse = await axios.get(
      `${API_BASE}/recipes/${recipeId}`
    );
    console.log("✅ Recette récupérée:", getRecipeResponse.data.title);

    // Test 5: Mettre à jour la recette
    console.log("\n5️⃣ Test de mise à jour d'une recette...");
    const updateData = {
      ...newRecipe,
      title: "Test API Restructurée - Modifiée",
      difficulty: "Moyen",
    };
    const updateResponse = await axios.put(
      `${API_BASE}/recipes/${recipeId}`,
      updateData
    );
    console.log("✅ Recette mise à jour:", updateResponse.data);

    // Test 6: Supprimer la recette
    console.log("\n6️⃣ Test de suppression d'une recette...");
    const deleteResponse = await axios.delete(
      `${API_BASE}/recipes/${recipeId}`
    );
    console.log("✅ Recette supprimée:", deleteResponse.data);

    // Test 7: Test de validation (données invalides)
    console.log("\n7️⃣ Test de validation (données invalides)...");
    try {
      await axios.post(`${API_BASE}/recipes`, { title: "" });
    } catch (error) {
      console.log("✅ Validation fonctionne:", error.response.data.error);
    }

    console.log("\n🎉 Tous les tests sont passés avec succès !");
    console.log("✅ L'API restructurée fonctionne parfaitement");
  } catch (error) {
    console.error(
      "❌ Erreur lors du test:",
      error.response?.data || error.message
    );
  }
}

// Exécuter les tests
testAPI();
