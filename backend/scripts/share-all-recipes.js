import db from "../database.js";

console.log("📢 Partage de toutes les recettes...\n");

db.query(
  `UPDATE recipes 
   SET 
     is_shared = 1, 
     allow_comments = 1, 
     show_author_info = 1, 
     shared_at = NOW() 
   WHERE is_shared = 0`,
  (err, result) => {
    if (err) {
      console.error("❌ Erreur:", err.message);
      db.end();
      process.exit(1);
    }

    console.log(
      `✅ ${result.affectedRows} nouvelle(s) recette(s) partagée(s)!`
    );

    // Vérifier le total
    db.query(
      "SELECT COUNT(*) as total FROM recipes WHERE is_shared = 1",
      (err2, result2) => {
        if (err2) {
          console.error("❌ Erreur:", err2.message);
        } else {
          console.log(
            `\n📊 Total de recettes partagées: ${result2[0].total}\n`
          );
          console.log("🎉 Les recettes sont maintenant visibles dans:");
          console.log("   - Communauté > Explorer > Recettes Populaires");
          console.log("   - Communauté > Abonnements > Fil d'actualité");
          console.log("   - Page d'accueil visiteurs\n");
        }

        db.end();
        process.exit(0);
      }
    );
  }
);

