/**
 * Test SUPER SIMPLE pour ajouter une recette
 * Pas de framework, juste du JavaScript basique
 * Facile à comprendre et à modifier
 */

// URL de l'API backend
const API_URL = "http://localhost:3000/api/recipes";

// Les données de la recette à créer
const nouvelleRecette = {
  title: "Test Recette Simple",
  description: "Une recette de test très simple",
  ingredients: "3 œufs, 200g de farine, 100ml de lait",
  instructions: "Mélanger tout, cuire 20 minutes",
  prep_time: 15,
  cook_time: 20,
  servings: 4,
  difficulty: "Facile",
};

console.log("🧪 Test simple d'ajout de recette\n");
console.log("📝 Recette à créer :");
console.log("   Titre :", nouvelleRecette.title);
console.log("   Portions :", nouvelleRecette.servings);
console.log("\n🔄 Envoi de la requête au serveur...\n");

// 1. Envoyer la requête POST pour créer la recette
fetch(API_URL, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(nouvelleRecette),
})
  .then((response) => {
    // Vérifier si la réponse est OK
    if (!response.ok) {
      throw new Error(`Erreur ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    // Succès !
    console.log("✅ SUCCÈS !");
    console.log("   Recette créée avec l'ID :", data.data?.id || data.id);
    console.log("\n🎉 Le test est passé !");
    console.log("   L'ajout de recette fonctionne correctement.");
  })
  .catch((error) => {
    // Erreur
    console.log("❌ ERREUR !");
    console.log("   Message :", error.message);
    console.log("\n💡 Vérifiez que :");
    console.log("   1. Le backend est démarré (cd backend && npm start)");
    console.log("   2. La base de données est connectée");
    console.log("   3. Le port 3000 est libre");
  });
