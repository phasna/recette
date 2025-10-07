/**
 * Script pour créer une recette de test partagée
 */
import fetch from "node-fetch";

const API_BASE = "http://localhost:3000/api";

async function createTestSharedRecipe() {
  console.log("🍳 Création d'une recette de test partagée...\n");

  try {
    // D'abord, récupérer un token d'authentification (vous devrez vous connecter)
    console.log(
      "⚠️  Vous devez d'abord vous connecter pour créer une recette partagée"
    );
    console.log(
      "💡 Connectez-vous sur l'application et récupérez votre token depuis le localStorage"
    );

    const token = "VOTRE_TOKEN_ICI"; // Remplacez par votre token

    if (token === "VOTRE_TOKEN_ICI") {
      console.log(
        "❌ Veuillez remplacer VOTRE_TOKEN_ICI par votre token d'authentification"
      );
      console.log("📋 Pour récupérer votre token:");
      console.log("   1. Ouvrez l'application dans votre navigateur");
      console.log("   2. Connectez-vous");
      console.log("   3. Ouvrez les outils de développement (F12)");
      console.log(
        "   4. Allez dans l'onglet Application/Storage > Local Storage"
      );
      console.log('   5. Copiez la valeur de "token"');
      return;
    }

    // Créer une recette de test
    console.log("1️⃣ Création de la recette de test...");
    const createResponse = await fetch(`${API_BASE}/recipes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: "Recette de Test Partagée",
        description:
          "Une délicieuse recette de test pour vérifier le système de partage",
        ingredients: "Ingrédient 1\nIngrédient 2\nIngrédient 3",
        instructions: "Étape 1: Préparer\nÉtape 2: Cuire\nÉtape 3: Servir",
        prep_time: 15,
        cook_time: 30,
        servings: 4,
        difficulty: "Facile",
      }),
    });

    if (createResponse.ok) {
      const createData = await createResponse.json();
      console.log("✅ Recette créée avec succès, ID:", createData.id);

      // Maintenant, partager cette recette
      console.log("2️⃣ Partage de la recette...");
      const shareResponse = await fetch(
        `${API_BASE}/recipes/${createData.id}/share`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            showOnVisitorPage: true,
            allowComments: true,
            showAuthorInfo: true,
            shareMessage:
              "Voici ma recette de test partagée avec la communauté ! 🍳",
          }),
        }
      );

      if (shareResponse.ok) {
        const shareData = await shareResponse.json();
        console.log("✅ Recette partagée avec succès !");
        console.log("📝 Message:", shareData.message);
        console.log(
          "🎯 La recette devrait maintenant apparaître sur la page visiteur"
        );
      } else {
        console.log("❌ Erreur lors du partage:", shareResponse.status);
        const error = await shareResponse.text();
        console.log("   Détails:", error);
      }
    } else {
      console.log("❌ Erreur lors de la création:", createResponse.status);
      const error = await createResponse.text();
      console.log("   Détails:", error);
    }
  } catch (error) {
    console.error("❌ Erreur:", error.message);
  }
}

// Exécuter le script
createTestSharedRecipe();
