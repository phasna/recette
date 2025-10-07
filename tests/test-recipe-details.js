/**
 * Script de test pour les détails de recette
 * À exécuter dans la console du navigateur
 */

const testRecipeDetails = async () => {
  console.log("🧪 Test des détails de recette...");

  try {
    // 1. Vérifier l'authentification
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    console.log("✅ Authentification:", token ? "Connecté" : "Non connecté");

    // 2. Récupérer les recettes disponibles
    console.log("\n🔍 Récupération des recettes...");
    const recipesResponse = await fetch("http://localhost:3000/api/recipes", {
      headers: token
        ? {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          }
        : {
            "Content-Type": "application/json",
          },
    });

    if (!recipesResponse.ok) {
      console.log("❌ Erreur lors de la récupération des recettes");
      return;
    }

    const recipesData = await recipesResponse.json();
    console.log(
      "📝 Recettes disponibles:",
      recipesData.data?.length || recipesData.length || 0
    );

    if (!recipesData.data && !Array.isArray(recipesData)) {
      console.log("❌ Aucune recette disponible pour tester");
      return;
    }

    const recipes = recipesData.data || recipesData;
    if (recipes.length === 0) {
      console.log("❌ Aucune recette disponible pour tester");
      return;
    }

    const firstRecipe = recipes[0];
    console.log(
      "🍳 Première recette:",
      firstRecipe.title,
      "(ID:",
      firstRecipe.id,
      ")"
    );

    // 3. Test de récupération des détails
    console.log("\n🔍 Test de récupération des détails...");
    const detailsResponse = await fetch(
      `http://localhost:3000/api/recipes/${firstRecipe.id}`
    );

    console.log("📊 Status des détails:", detailsResponse.status);

    if (detailsResponse.ok) {
      const detailsData = await detailsResponse.json();
      console.log("✅ Détails récupérés:", detailsData);
      console.log("📝 Titre:", detailsData.title);
      console.log("📝 Description:", detailsData.description);
      console.log("📝 Ingrédients:", detailsData.ingredients);
      console.log("📝 Instructions:", detailsData.instructions);
    } else {
      const errorText = await detailsResponse.text();
      console.log("❌ Erreur des détails:", errorText);
    }

    // 4. Test de navigation
    console.log("\n🧭 Test de navigation...");
    console.log("✅ URL de test:", `/recipe/${firstRecipe.id}`);
    console.log(
      "✅ Navigation manuelle:",
      `window.location.href = '/recipe/${firstRecipe.id}'`
    );

    // 5. Suggestions
    console.log("\n💡 Suggestions:");
    console.log("1. Cliquer sur une carte de recette pour voir les détails");
    console.log("2. Vérifier que l'URL change vers /recipe/[ID]");
    console.log("3. Vérifier que les détails s'affichent correctement");
    console.log("4. Tester le bouton de retour");

    console.log("\n=== FIN DU TEST ===");
  } catch (error) {
    console.error("❌ Erreur lors du test:", error);
  }
};

// Exécuter le test
testRecipeDetails();

// Exporter pour utilisation manuelle
window.testRecipeDetails = testRecipeDetails;
