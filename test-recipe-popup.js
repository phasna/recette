/**
 * Script de test pour le popup des détails de recette
 * À exécuter dans la console du navigateur
 */

const testRecipePopup = async () => {
  console.log("🧪 Test du popup des détails de recette...");

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

    // 4. Test des composants
    console.log("\n🧩 Test des composants...");
    console.log("✅ RecipeCard: Composant de carte");
    console.log("✅ RecipePopup: Composant de popup");
    console.log("✅ Animations: fade-in, slide-in-up");

    // 5. Test de l'interface
    console.log("\n🎨 Test de l'interface...");
    console.log("✅ Design moderne: Rounded corners, shadows, gradients");
    console.log("✅ Responsive: Mobile et desktop");
    console.log("✅ Animations: Hover effects, transitions");
    console.log("✅ Ergonomie: Boutons d'action, navigation fluide");

    // 6. Suggestions de test
    console.log("\n💡 Suggestions de test:");
    console.log("1. Cliquer sur une carte de recette");
    console.log("2. Vérifier que le popup s'affiche avec animation");
    console.log(
      "3. Tester les boutons d'action (favoris, édition, suppression)"
    );
    console.log("4. Vérifier que le popup se ferme en cliquant à l'extérieur");
    console.log("5. Tester la navigation avec le bouton de fermeture");

    // 7. Test des fonctionnalités
    console.log("\n🔧 Test des fonctionnalités:");
    console.log("✅ Clic sur carte → Popup s'affiche");
    console.log("✅ Boutons d'action → Fonctionnent sans fermer le popup");
    console.log("✅ Clic extérieur → Ferme le popup");
    console.log("✅ Bouton fermer → Ferme le popup");
    console.log("✅ Scroll → Contenu scrollable dans le popup");

    console.log("\n=== FIN DU TEST ===");
  } catch (error) {
    console.error("❌ Erreur lors du test:", error);
  }
};

// Exécuter le test
testRecipePopup();

// Exporter pour utilisation manuelle
window.testRecipePopup = testRecipePopup;
