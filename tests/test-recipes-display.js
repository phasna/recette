/**
 * Script de test pour vérifier l'affichage des recettes
 * À exécuter dans la console du navigateur
 */

const testRecipesDisplay = async () => {
  console.log("🧪 Test de l'affichage des recettes...");

  try {
    // 1. Vérifier l'authentification
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    console.log("\n1️⃣ Vérification de l'authentification:");
    console.log("   - Token:", token ? "✅ Présent" : "❌ Absent");
    console.log("   - User:", user ? "✅ Présent" : "❌ Absent");

    if (!token || !user) {
      console.log("❌ Pas d'authentification - connectez-vous d'abord");
      return;
    }

    // 2. Tester l'API des recettes
    console.log("\n2️⃣ Test de l'API des recettes:");
    const response = await fetch("http://localhost:3000/api/recipes", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("   - Status:", response.status);

    if (response.ok) {
      const data = await response.json();
      console.log("   - Recettes trouvées:", data.data?.length || 0);
      console.log("   - Données:", data);

      if (data.data && data.data.length > 0) {
        console.log("   - Première recette:", data.data[0]);
      } else {
        console.log("   - Aucune recette trouvée");
      }
    } else {
      const error = await response.json();
      console.log("   - Erreur API:", error);
    }

    // 3. Vérifier l'URL actuelle
    console.log("\n3️⃣ URL actuelle:");
    console.log("   - URL:", window.location.href);
    console.log("   - Pathname:", window.location.pathname);

    // 4. Suggestions
    console.log("\n4️⃣ Suggestions:");
    if (window.location.pathname !== "/dashboard") {
      console.log("   🔧 Aller sur /dashboard pour voir les recettes");
      console.log("   🔧 Commande: window.location.href = '/dashboard'");
    } else {
      console.log("   ✅ Vous êtes sur le dashboard");
      console.log("   🔧 Cliquez sur '🔄 Actualiser' pour recharger");
    }

    console.log("\n=== FIN DU TEST ===");
  } catch (error) {
    console.error("❌ Erreur lors du test:", error);
  }
};

// Exécuter le test
testRecipesDisplay();

// Exporter pour utilisation manuelle
window.testRecipesDisplay = testRecipesDisplay;
