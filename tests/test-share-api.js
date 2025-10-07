/**
 * Script de test pour vérifier l'API de partage
 */
import fetch from "node-fetch";

const API_BASE = "http://localhost:3000/api";

async function testShareAPI() {
  console.log("🧪 Test de l'API de partage...\n");

  try {
    // Test 1: Récupérer les recettes partagées
    console.log("1️⃣ Test de récupération des recettes partagées...");
    const response = await fetch(`${API_BASE}/recipes/shared/public`);

    if (response.ok) {
      const data = await response.json();
      console.log("✅ Succès:", data.message);
      console.log(`📊 ${data.count} recettes partagées trouvées:`);

      if (data.data && data.data.length > 0) {
        data.data.forEach((recipe, index) => {
          console.log(
            `   ${index + 1}. "${recipe.title}" par ${recipe.author_name}`
          );
          if (recipe.share_message) {
            console.log(`      💬 "${recipe.share_message}"`);
          }
        });
      } else {
        console.log("   ℹ️ Aucune recette partagée pour le moment");
      }
    } else {
      console.log("❌ Erreur:", response.status, response.statusText);
      const error = await response.text();
      console.log("   Détails:", error);
    }

    console.log("\n2️⃣ Test de récupération de toutes les recettes...");
    const allRecipesResponse = await fetch(`${API_BASE}/recipes`);

    if (allRecipesResponse.ok) {
      const allData = await allRecipesResponse.json();
      console.log(
        `📊 ${
          allData.data?.length || allData.length || 0
        } recettes totales trouvées`
      );

      // Vérifier les colonnes de partage
      if (allData.data && allData.data.length > 0) {
        const firstRecipe = allData.data[0];
        console.log("🔍 Colonnes de partage disponibles:");
        console.log(
          `   - is_shared: ${firstRecipe.is_shared !== undefined ? "✅" : "❌"}`
        );
        console.log(
          `   - share_message: ${
            firstRecipe.share_message !== undefined ? "✅" : "❌"
          }`
        );
        console.log(
          `   - allow_comments: ${
            firstRecipe.allow_comments !== undefined ? "✅" : "❌"
          }`
        );
        console.log(
          `   - show_author_info: ${
            firstRecipe.show_author_info !== undefined ? "✅" : "❌"
          }`
        );
        console.log(
          `   - shared_at: ${firstRecipe.shared_at !== undefined ? "✅" : "❌"}`
        );
      }
    } else {
      console.log(
        "❌ Erreur lors de la récupération des recettes:",
        allRecipesResponse.status
      );
    }
  } catch (error) {
    console.error("❌ Erreur de connexion:", error.message);
    console.log(
      "💡 Assurez-vous que le serveur backend est démarré sur le port 3000"
    );
  }
}

// Exécuter le test
testShareAPI();
