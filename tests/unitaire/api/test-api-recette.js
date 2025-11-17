/**
 * TEST UNITAIRE - API Recette
 *
 * Teste l'API de création de recette
 * Pas de framework, juste du JavaScript pur
 */

const API_URL = "http://localhost:3000/api/recipes";

let testsPasses = 0;
let testsEchoues = 0;

function test(name, callback) {
  return callback()
    .then(() => {
      console.log("  ✅", name);
      testsPasses++;
    })
    .catch((error) => {
      console.log("  ❌", name);
      console.log("     Erreur:", error.message);
      testsEchoues++;
    });
}

console.log("\n🧪 TESTS UNITAIRES - API Recette\n");
console.log("=".repeat(50));

// Lancer tous les tests
async function runAllTests() {
  // Test 1 : Créer une recette valide
  await test("Créer une recette valide", async () => {
    const recette = {
      title: "Test API " + Date.now(),
      description: "Une recette de test",
      ingredients: "3 œufs, farine, lait",
      instructions: "Mélanger et cuire",
      prep_time: 15,
      cook_time: 20,
      servings: 4,
      difficulty: "Facile",
    };

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recette),
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP ${response.status}`);
    }

    const data = await response.json();
    if (!data.data?.id && !data.id) {
      throw new Error("La recette créée n'a pas d'ID");
    }

    return data;
  });

  // Test 2 : Erreur si titre manquant
  await test("Erreur si titre manquant", async () => {
    const recette = {
      // Pas de titre
      ingredients: "3 œufs",
      instructions: "Mélanger",
    };

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recette),
    });

    if (response.ok) {
      throw new Error(
        "L'API devrait retourner une erreur quand le titre manque"
      );
    }

    if (response.status !== 400) {
      throw new Error(`Attendu 400, reçu ${response.status}`);
    }
  });

  // Test 3 : Erreur si ingrédients manquants
  await test("Erreur si ingrédients manquants", async () => {
    const recette = {
      title: "Test Recipe",
      // Pas d'ingrédients
      instructions: "Mélanger",
    };

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recette),
    });

    if (response.ok) {
      throw new Error(
        "L'API devrait retourner une erreur quand les ingrédients manquent"
      );
    }

    if (response.status !== 400) {
      throw new Error(`Attendu 400, reçu ${response.status}`);
    }
  });

  // Test 4 : Erreur si instructions manquantes
  await test("Erreur si instructions manquantes", async () => {
    const recette = {
      title: "Test Recipe",
      ingredients: "3 œufs",
      // Pas d'instructions
    };

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recette),
    });

    if (response.ok) {
      throw new Error(
        "L'API devrait retourner une erreur quand les instructions manquent"
      );
    }

    if (response.status !== 400) {
      throw new Error(`Attendu 400, reçu ${response.status}`);
    }
  });

  // Résumé
  console.log("\n" + "=".repeat(50));
  console.log("📊 RÉSUMÉ DES TESTS");
  console.log("=".repeat(50));
  console.log(`✅ Tests passés : ${testsPasses}`);
  console.log(`❌ Tests échoués : ${testsEchoues}`);
  console.log(`📈 Total : ${testsPasses + testsEchoues}`);

  if (testsEchoues === 0) {
    console.log("\n🎉 TOUS LES TESTS SONT PASSÉS !\n");
    process.exit(0);
  } else {
    console.log(`\n⚠️  ${testsEchoues} TEST(S) ONT ÉCHOUÉ\n`);
    process.exit(1);
  }
}

// Exécuter tous les tests
runAllTests().catch((error) => {
  console.error("\n❌ Erreur fatale:", error);
  process.exit(1);
});
