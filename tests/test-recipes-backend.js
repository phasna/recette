/**
 * Script de test pour l'API backend des recettes
 * À exécuter dans la console du navigateur
 */

const testRecipesBackend = async () => {
  console.log("🧪 Test de l'API backend des recettes...");

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

    // 2. Test de l'API avec authentification
    console.log("\n🔍 Test de l'API avec authentification...");

    const response = await fetch("http://localhost:3000/api/recipes", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    console.log("📊 Status de la réponse:", response.status);
    console.log("📊 Headers:", Object.fromEntries(response.headers.entries()));

    if (response.ok) {
      const data = await response.json();
      console.log("✅ Réponse de l'API:", data);

      if (data.success && data.data) {
        console.log("📝 Nombre de recettes:", data.data.length);
        console.log("📝 Compte total:", data.count);

        if (data.data.length > 0) {
          console.log("🍳 Première recette:", data.data[0]);
          console.log("🍳 Toutes les recettes:", data.data);

          // Vérifier que les recettes appartiennent à l'utilisateur
          const userRecipes = data.data.filter(
            (recipe) => recipe.user_id === parsedUser.id
          );
          console.log("👤 Recettes de l'utilisateur:", userRecipes.length);

          if (userRecipes.length !== data.data.length) {
            console.log(
              "⚠️ Attention: Certaines recettes n'appartiennent pas à l'utilisateur"
            );
          }
        } else {
          console.log("❌ Aucune recette trouvée");
        }
      } else {
        console.log("❌ Structure de réponse incorrecte:", data);
      }
    } else {
      const errorText = await response.text();
      console.log("❌ Erreur de l'API:", errorText);
    }

    // 3. Test de l'API sans authentification (pour comparaison)
    console.log("\n🔍 Test de l'API sans authentification...");

    const publicResponse = await fetch("http://localhost:3000/api/recipes");
    console.log("📊 Status public:", publicResponse.status);

    if (publicResponse.ok) {
      const publicData = await publicResponse.json();
      console.log("📝 Recettes publiques:", publicData.data?.length || 0);
    }

    // 4. Suggestions
    console.log("\n💡 Suggestions:");
    if (response.ok) {
      const data = await response.json();
      if (data.data && data.data.length > 0) {
        console.log("✅ L'API fonctionne correctement");
        console.log("✅ Les recettes sont récupérées");
        console.log("🔧 Vérifiez l'affichage dans le dashboard");
      } else {
        console.log("❌ Aucune recette trouvée");
        console.log("🔧 Vérifiez que vous avez créé des recettes");
        console.log("🔧 Vérifiez que les recettes ont le bon user_id");
      }
    } else {
      console.log("❌ Erreur de l'API");
      console.log("🔧 Vérifiez que le backend est démarré");
      console.log("🔧 Vérifiez l'authentification");
    }

    console.log("\n=== FIN DU TEST ===");
  } catch (error) {
    console.error("❌ Erreur lors du test:", error);
  }
};

// Exécuter le test
testRecipesBackend();

// Exporter pour utilisation manuelle
window.testRecipesBackend = testRecipesBackend;
