/**
 * Script de diagnostic pour l'API des recettes
 * À exécuter dans la console du navigateur
 */

const debugRecipesAPI = async () => {
  console.log("🔍 Diagnostic de l'API des recettes...");

  try {
    // 1. Vérifier l'authentification
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    console.log("\n1️⃣ Authentification:");
    console.log("   - Token:", token ? "✅ Présent" : "❌ Absent");
    console.log("   - User:", user ? "✅ Présent" : "❌ Absent");

    if (user) {
      try {
        const parsedUser = JSON.parse(user);
        console.log("   - User ID:", parsedUser.id);
        console.log("   - Username:", parsedUser.username);
      } catch (error) {
        console.log("   - Erreur parsing user:", error.message);
      }
    }

    if (!token) {
      console.log("❌ Pas de token - connectez-vous d'abord");
      return;
    }

    // 2. Test de l'API sans authentification
    console.log("\n2️⃣ Test API sans authentification:");
    try {
      const publicResponse = await fetch("http://localhost:3000/api/recipes");
      console.log("   - Status:", publicResponse.status);

      if (publicResponse.ok) {
        const publicData = await publicResponse.json();
        console.log("   - Recettes publiques:", publicData.data?.length || 0);
        if (publicData.data && publicData.data.length > 0) {
          console.log("   - Première recette publique:", publicData.data[0]);
        }
      } else {
        console.log("   - Erreur API publique:", await publicResponse.text());
      }
    } catch (error) {
      console.log("   - Erreur connexion API publique:", error.message);
    }

    // 3. Test de l'API avec authentification
    console.log("\n3️⃣ Test API avec authentification:");
    try {
      const authResponse = await fetch("http://localhost:3000/api/recipes", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("   - Status:", authResponse.status);
      console.log(
        "   - Headers:",
        Object.fromEntries(authResponse.headers.entries())
      );

      if (authResponse.ok) {
        const authData = await authResponse.json();
        console.log("   - Recettes authentifiées:", authData.data?.length || 0);
        console.log("   - Structure de la réponse:", authData);

        if (authData.data && authData.data.length > 0) {
          console.log("   - Première recette:", authData.data[0]);
          console.log("   - Toutes les recettes:", authData.data);
        } else {
          console.log("   - Aucune recette trouvée avec authentification");
        }
      } else {
        const errorText = await authResponse.text();
        console.log("   - Erreur API authentifiée:", errorText);
      }
    } catch (error) {
      console.log("   - Erreur connexion API authentifiée:", error.message);
    }

    // 4. Test de l'API backend directement
    console.log("\n4️⃣ Test direct du backend:");
    try {
      const backendResponse = await fetch("http://localhost:3000/api/recipes", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("   - Backend Status:", backendResponse.status);

      if (backendResponse.ok) {
        const backendData = await backendResponse.json();
        console.log("   - Backend Response:", backendData);

        // Vérifier si les recettes appartiennent à l'utilisateur
        if (backendData.data && backendData.data.length > 0) {
          const userRecipes = backendData.data.filter((recipe) => {
            try {
              const parsedUser = JSON.parse(user);
              return recipe.user_id === parsedUser.id;
            } catch {
              return false;
            }
          });
          console.log("   - Recettes de l'utilisateur:", userRecipes.length);
          console.log("   - Détails:", userRecipes);
        }
      }
    } catch (error) {
      console.log("   - Erreur backend:", error.message);
    }

    // 5. Suggestions de correction
    console.log("\n5️⃣ Suggestions:");
    console.log("   🔧 Vérifier que le backend est démarré sur le port 3000");
    console.log("   🔧 Vérifier que l'API retourne les bonnes données");
    console.log("   🔧 Vérifier que l'authentification fonctionne");
    console.log("   🔧 Vérifier que les recettes ont le bon user_id");

    console.log("\n=== FIN DU DIAGNOSTIC ===");
  } catch (error) {
    console.error("❌ Erreur lors du diagnostic:", error);
  }
};

// Exécuter le diagnostic
debugRecipesAPI();

// Exporter pour utilisation manuelle
window.debugRecipesAPI = debugRecipesAPI;
