/**
 * TEST SUPER SIMPLE EN FRANÇAIS
 *
 * Ce test fait juste 3 choses :
 * 1. Prend une recette (titre, ingrédients, etc.)
 * 2. L'envoie au serveur pour la créer
 * 3. Affiche "OK" si ça marche, "ERREUR" si ça marche pas
 *
 * C'est tout ! Pas compliqué.
 */

// ============================================
// ÉTAPE 1 : On définit une recette à créer
// ============================================

const maRecette = {
  title: "Recette de Test " + new Date().getTime(),
  description: "Juste un test",
  ingredients: "3 œufs, farine, lait",
  instructions: "Mélanger et cuire",
  prep_time: 15,
  cook_time: 20,
  servings: 4,
  difficulty: "Facile",
};

// ============================================
// ÉTAPE 2 : On affiche ce qu'on va faire
// ============================================

console.log("\n");
console.log("╔════════════════════════════════════════╗");
console.log("║  TEST SIMPLE - AJOUT D'UNE RECETTE    ║");
console.log("╚════════════════════════════════════════╝");
console.log("\n");

console.log("📝 Recette à créer :");
console.log("   • Titre : " + maRecette.title);
console.log("   • Portions : " + maRecette.servings);
console.log(
  "   • Temps : " +
    maRecette.prep_time +
    " min préparation, " +
    maRecette.cook_time +
    " min cuisson"
);
console.log("\n");

// ============================================
// ÉTAPE 3 : On envoie la recette au serveur
// ============================================

console.log("⏳ Envoi au serveur...\n");

// Envoyer la requête HTTP POST
fetch("http://localhost:3000/api/recipes", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(maRecette),
})
  // Si ça marche
  .then((reponse) => {
    if (reponse.ok) {
      return reponse.json();
    } else {
      throw new Error("Le serveur a retourné une erreur " + reponse.status);
    }
  })
  // Si la recette est créée
  .then((resultat) => {
    console.log("════════════════════════════════════════");
    console.log("✅ SUCCÈS !");
    console.log("════════════════════════════════════════");
    console.log("\n");
    console.log("🎉 La recette a été créée avec succès !");
    console.log("   ID de la recette : " + (resultat.data?.id || resultat.id));
    console.log("\n");
    console.log("✨ Tout fonctionne correctement !");
    console.log("\n");
  })
  // Si ça ne marche pas
  .catch((erreur) => {
    console.log("════════════════════════════════════════");
    console.log("❌ ERREUR !");
    console.log("════════════════════════════════════════");
    console.log("\n");
    console.log("😞 Ça n'a pas marché :");
    console.log("   " + erreur.message);
    console.log("\n");
    console.log("💡 Pour résoudre le problème :");
    console.log("   1. Vérifiez que le backend est démarré");
    console.log("      → cd backend && npm start");
    console.log("   2. Vérifiez que le port 3000 est libre");
    console.log("   3. Vérifiez que la base de données fonctionne");
    console.log("\n");
  });
