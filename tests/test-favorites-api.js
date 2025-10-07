/**
 * Script de test pour l'API des favoris
 * À exécuter dans la console du navigateur
 */

const testFavoritesAPI = async () => {
  console.log("🧪 Test de l'API des favoris...");

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
      console.log("❌ Aucune recette disponible pour tester les favoris");
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

    // 3. Test d'ajout aux favoris
    console.log("\n➕ Test d'ajout aux favoris...");
    const addResponse = await fetch(
      `http://localhost:3000/api/favorites/add/${firstRecipe.id}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("📊 Status d'ajout:", addResponse.status);

    if (addResponse.ok) {
      const addData = await addResponse.json();
      console.log("✅ Ajout réussi:", addData);
    } else {
      const addError = await addResponse.text();
      console.log("❌ Erreur d'ajout:", addError);
    }

    // 4. Test de vérification du statut
    console.log("\n🔍 Test de vérification du statut...");
    const checkResponse = await fetch(
      `http://localhost:3000/api/favorites/check/${firstRecipe.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("📊 Status de vérification:", checkResponse.status);

    if (checkResponse.ok) {
      const checkData = await checkResponse.json();
      console.log("✅ Statut vérifié:", checkData);
    } else {
      const checkError = await checkResponse.text();
      console.log("❌ Erreur de vérification:", checkError);
    }

    // 5. Test de récupération des favoris
    console.log("\n📋 Test de récupération des favoris...");
    const favoritesResponse = await fetch(
      "http://localhost:3000/api/favorites",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("📊 Status des favoris:", favoritesResponse.status);

    if (favoritesResponse.ok) {
      const favoritesData = await favoritesResponse.json();
      console.log("✅ Favoris récupérés:", favoritesData.data?.length || 0);
      console.log("📝 Détails:", favoritesData);
    } else {
      const favoritesError = await favoritesResponse.text();
      console.log("❌ Erreur des favoris:", favoritesError);
    }

    // 6. Test de suppression des favoris
    console.log("\n➖ Test de suppression des favoris...");
    const removeResponse = await fetch(
      `http://localhost:3000/api/favorites/remove/${firstRecipe.id}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("📊 Status de suppression:", removeResponse.status);

    if (removeResponse.ok) {
      const removeData = await removeResponse.json();
      console.log("✅ Suppression réussie:", removeData);
    } else {
      const removeError = await removeResponse.text();
      console.log("❌ Erreur de suppression:", removeError);
    }

    // 7. Vérification finale
    console.log("\n🔍 Vérification finale...");
    const finalCheckResponse = await fetch(
      `http://localhost:3000/api/favorites/check/${firstRecipe.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (finalCheckResponse.ok) {
      const finalCheckData = await finalCheckResponse.json();
      console.log("✅ Statut final:", finalCheckData);
    }

    console.log("\n=== FIN DU TEST ===");
  } catch (error) {
    console.error("❌ Erreur lors du test:", error);
  }
};

// Exécuter le test
testFavoritesAPI();

// Exporter pour utilisation manuelle
window.testFavoritesAPI = testFavoritesAPI;
