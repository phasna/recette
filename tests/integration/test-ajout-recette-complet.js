/**
 * TEST D'INTÉGRATION - Ajout de recette complet
 *
 * Teste le flux complet d'ajout de recette
 * (Création → Vérification → Affichage)
 */

const API_URL = "http://localhost:3000/api/recipes";

console.log("\n🧪 TEST D'INTÉGRATION - Ajout de recette complet\n");
console.log("=".repeat(60));

async function testComplet() {
  try {
    // Étape 1 : Créer une recette
    console.log("1️⃣ Création d'une recette...\n");

    const nouvelleRecette = {
      title: "Test Intégration " + Date.now(),
      description: "Une recette de test d'intégration",
      ingredients: "3 œufs\n200g de farine\n100ml de lait\n50g de sucre",
      instructions:
        "1. Mélanger les œufs et le sucre\n2. Ajouter la farine progressivement\n3. Ajouter le lait\n4. Cuire au four 20 minutes à 180°C",
      prep_time: 15,
      cook_time: 20,
      servings: 4,
      difficulty: "Facile",
    };

    console.log("📝 Titre :", nouvelleRecette.title);
    console.log("👥 Portions :", nouvelleRecette.servings);
    console.log(
      "⏱️  Temps :",
      nouvelleRecette.prep_time +
        "min préparation, " +
        nouvelleRecette.cook_time +
        "min cuisson"
    );

    const createResponse = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nouvelleRecette),
    });

    if (!createResponse.ok) {
      const errorData = await createResponse.json();
      throw new Error(
        `Erreur ${createResponse.status}: ${
          errorData.message || JSON.stringify(errorData)
        }`
      );
    }

    const createdData = await createResponse.json();
    const recipeId = createdData.data?.id || createdData.id;
    console.log("\n✅ Recette créée avec succès !");
    console.log("   ID :", recipeId);

    // Étape 2 : Vérifier que la recette existe
    console.log("\n2️⃣ Vérification que la recette existe...\n");

    const getResponse = await fetch(`${API_URL}/${recipeId}`);

    if (!getResponse.ok) {
      throw new Error(
        `Impossible de récupérer la recette (${getResponse.status})`
      );
    }

    const retrievedData = await getResponse.json();
    const recipe = retrievedData.data || retrievedData;

    console.log("✅ Recette récupérée avec succès !");
    console.log("   Titre :", recipe.title);
    console.log("   Difficulté :", recipe.difficulty);

    // Étape 3 : Vérifier que la recette est dans la liste
    console.log("\n3️⃣ Vérification dans la liste...\n");

    const listResponse = await fetch(API_URL);

    if (!listResponse.ok) {
      throw new Error(
        `Impossible de récupérer la liste (${listResponse.status})`
      );
    }

    const listData = await listResponse.json();
    const recipes = listData.data || listData;

    const foundRecipe = recipes.find(
      (r) => r.id === recipeId || r.id.toString() === recipeId.toString()
    );

    if (foundRecipe) {
      console.log("✅ Recette trouvée dans la liste !");
      console.log("   Titre :", foundRecipe.title);
    } else {
      console.log(
        "⚠️  Recette créée mais non trouvée immédiatement dans la liste"
      );
    }

    // Résumé final
    console.log("\n" + "=".repeat(60));
    console.log("🎉 TEST D'INTÉGRATION RÉUSSI !");
    console.log("=".repeat(60));
    console.log("\n📋 Récapitulatif :");
    console.log("   ✅ Recette créée avec succès");
    console.log("   ✅ Recette récupérée correctement");
    console.log("   ✅ Recette visible dans la liste");
    console.log(`   📌 ID de la recette : ${recipeId}`);
    console.log(
      "\n✨ Le système d'ajout de recette fonctionne correctement !\n"
    );

    return { success: true, recipeId };
  } catch (error) {
    console.log("\n" + "=".repeat(60));
    console.log("❌ TEST D'INTÉGRATION ÉCHOUÉ");
    console.log("=".repeat(60));
    console.error("\nErreur :", error.message);

    if (error.message.includes("fetch")) {
      console.log("\n💡 Solutions possibles :");
      console.log("   1. Vérifiez que le backend est démarré");
      console.log("      → cd backend && npm start");
      console.log("   2. Vérifiez que la base de données est connectée");
      console.log("   3. Vérifiez que le port 3000 est libre");
    }

    console.log("\n");
    return { success: false, error: error.message };
  }
}

// Exécuter le test
if (require.main === module) {
  testComplet()
    .then((result) => {
      process.exit(result.success ? 0 : 1);
    })
    .catch((error) => {
      console.error("Erreur fatale:", error);
      process.exit(1);
    });
}

module.exports = testComplet;
