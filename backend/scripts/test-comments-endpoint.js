import db from "../database.js";

console.log("🧪 TEST DES ENDPOINTS COMMENTAIRES\n");

// Test 1: Vérifier la table recipe_comments
console.log("1️⃣  Vérification de la table...");

db.query("DESCRIBE recipe_comments", (err, columns) => {
  if (err) {
    console.error("❌ Erreur:", err.message);
    db.end();
    process.exit(1);
  }

  console.log("✅ Structure de la table:");
  columns.forEach((col) => {
    console.log(`   ${col.Field} (${col.Type})`);
  });

  // Test 2: Essayer d'insérer un commentaire de test directement
  console.log("\n2️⃣  Test d'insertion directe...");

  db.query(
    "INSERT INTO recipe_comments (recipe_id, user_id, comment_text, rating) VALUES (?, ?, ?, ?)",
    [1, 2, "Test direct", 5],
    (err2, result) => {
      if (err2) {
        console.error("❌ Erreur insertion:", err2.message);
        console.error("   Code:", err2.code);
        console.error("   SQL:", err2.sql);
      } else {
        console.log("✅ Commentaire inséré avec ID:", result.insertId);

        // Supprimer le commentaire de test
        db.query(
          "DELETE FROM recipe_comments WHERE id = ?",
          [result.insertId],
          () => {
            console.log("✅ Commentaire de test supprimé");
          }
        );
      }

      // Test 3: Vérifier les commentaires existants
      console.log("\n3️⃣  Commentaires existants...");

      db.query(
        `SELECT 
          rc.id,
          rc.recipe_id,
          rc.user_id,
          rc.comment_text,
          rc.rating,
          u.username
         FROM recipe_comments rc
         LEFT JOIN users u ON rc.user_id = u.id
         LIMIT 10`,
        (err3, comments) => {
          if (err3) {
            console.error("❌ Erreur:", err3.message);
          } else {
            console.log(`✅ ${comments.length} commentaires trouvés:`);
            comments.forEach((c) => {
              console.log(
                `   #${c.id}: "${c.comment_text.substring(0, 30)}..." par ${
                  c.username || "Unknown"
                } (recette ${c.recipe_id})`
              );
            });
          }

          console.log("\n✅ Tests terminés");
          db.end();
          process.exit(0);
        }
      );
    }
  );
});

