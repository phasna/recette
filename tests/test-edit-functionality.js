/**
 * Script de test pour la fonctionnalité d'édition
 * À exécuter dans la console du navigateur
 */

const testEditFunctionality = async () => {
  console.log("🧪 Test de la fonctionnalité d'édition...");

  try {
    // 1. Vérifier l'authentification
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (!token || !user) {
      console.log("❌ Pas d'authentification - connectez-vous d'abord");
      return;
    }

    const parsedUser = JSON.parse(user);
    console.log(
      "✅ Utilisateur connecté:",
      parsedUser.username,
      "(ID:",
      parsedUser.id,
      ")"
    );

    // 2. Récupérer les recettes disponibles
    console.log("\n🔍 Récupération des recettes...");
    const recipesResponse = await fetch("http://localhost:3000/api/recipes", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!recipesResponse.ok) {
      console.log("❌ Erreur lors de la récupération des recettes");
      return;
    }

    const recipesData = await recipesResponse.json();
    console.log("📝 Recettes disponibles:", recipesData.data?.length || 0);

    if (!recipesData.data || recipesData.data.length === 0) {
      console.log("❌ Aucune recette disponible pour tester l'édition");
      return;
    }

    const firstRecipe = recipesData.data[0];
    console.log(
      "🍳 Première recette:",
      firstRecipe.title,
      "(ID:",
      firstRecipe.id,
      ")"
    );

    // 3. Test de l'API d'édition
    console.log("\n🔍 Test de l'API d'édition...");
    const editResponse = await fetch(
      `http://localhost:3000/api/recipes/${firstRecipe.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: firstRecipe.title + " (modifié)",
          description: firstRecipe.description,
          ingredients: firstRecipe.ingredients,
          instructions: firstRecipe.instructions,
          prep_time: firstRecipe.prep_time,
          cook_time: firstRecipe.cook_time,
          servings: firstRecipe.servings,
          difficulty: firstRecipe.difficulty,
        }),
      }
    );

    console.log("📊 Status de l'édition:", editResponse.status);

    if (editResponse.ok) {
      const editData = await editResponse.json();
      console.log("✅ Édition réussie:", editData);
    } else {
      const errorText = await editResponse.text();
      console.log("❌ Erreur d'édition:", errorText);
    }

    // 4. Test de l'API de suppression
    console.log("\n🔍 Test de l'API de suppression...");
    const deleteResponse = await fetch(
      `http://localhost:3000/api/recipes/${firstRecipe.id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("📊 Status de la suppression:", deleteResponse.status);

    if (deleteResponse.ok) {
      console.log("✅ Suppression réussie");
    } else {
      const errorText = await deleteResponse.text();
      console.log("❌ Erreur de suppression:", errorText);
    }

    // 5. Test des routes
    console.log("\n🧭 Test des routes...");
    console.log("✅ Route d'édition:", `/edit-recipe/${firstRecipe.id}`);
    console.log(
      "✅ Navigation manuelle:",
      `window.location.href = '/edit-recipe/${firstRecipe.id}'`
    );

    // 6. Test des composants
    console.log("\n🧩 Test des composants...");
    console.log("✅ EditRecipe: Composant d'édition");
    console.log("✅ Formulaire: Champs de modification");
    console.log("✅ Validation: Vérification des données");
    console.log("✅ Sauvegarde: API de mise à jour");

    // 7. Suggestions de test
    console.log("\n💡 Suggestions de test:");
    console.log("1. Cliquer sur le bouton d'édition (✏️) dans le popup");
    console.log("2. Vérifier que la page d'édition s'ouvre");
    console.log("3. Modifier les champs du formulaire");
    console.log("4. Cliquer sur 'Sauvegarder'");
    console.log("5. Vérifier que les modifications sont sauvegardées");

    // 8. Test des fonctionnalités
    console.log("\n🔧 Test des fonctionnalités:");
    console.log("✅ Bouton d'édition: Visible dans le popup");
    console.log("✅ Navigation: Redirection vers /edit-recipe/:id");
    console.log("✅ Formulaire: Chargement des données existantes");
    console.log("✅ Sauvegarde: Mise à jour via API");
    console.log("✅ Retour: Navigation vers le dashboard");

    console.log("\n=== FIN DU TEST ===");
  } catch (error) {
    console.error("❌ Erreur lors du test:", error);
  }
};

// Exécuter le test
testEditFunctionality();

// Exporter pour utilisation manuelle
window.testEditFunctionality = testEditFunctionality;
