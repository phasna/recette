import db from "../../database.js";

console.log("🔍 Vérification et ajout des colonnes de partage...\n");

async function checkAndAddColumns() {
  // Vérifier les colonnes existantes
  const columns = await new Promise((resolve, reject) => {
    db.query("DESCRIBE recipes", (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });

  console.log("Colonnes actuelles de recipes:");
  columns.forEach((col) => {
    console.log(`  - ${col.Field} (${col.Type})`);
  });

  // Colonnes nécessaires pour le partage
  const shareColumns = [
    { name: "is_shared", definition: "TINYINT(1) DEFAULT 0" },
    { name: "share_message", definition: "TEXT NULL" },
    { name: "allow_comments", definition: "TINYINT(1) DEFAULT 1" },
    { name: "show_author_info", definition: "TINYINT(1) DEFAULT 1" },
    { name: "shared_at", definition: "TIMESTAMP NULL" },
  ];

  console.log("\n📝 Ajout des colonnes manquantes...");

  for (const col of shareColumns) {
    const exists = columns.some((c) => c.Field === col.name);

    if (!exists) {
      try {
        await new Promise((resolve, reject) => {
          db.query(
            `ALTER TABLE recipes ADD COLUMN ${col.name} ${col.definition}`,
            (err, result) => {
              if (err) reject(err);
              else resolve(result);
            }
          );
        });
        console.log(`✅ Colonne '${col.name}' ajoutée`);
      } catch (error) {
        console.error(`❌ Erreur colonne '${col.name}':`, error.message);
      }
    } else {
      console.log(`⚠️  Colonne '${col.name}' existe déjà`);
    }
  }

  // Compter les recettes partagées
  console.log("\n📊 Statistiques:");

  const stats = await new Promise((resolve, reject) => {
    db.query(
      "SELECT COUNT(*) as total, SUM(is_shared) as shared FROM recipes",
      (err, result) => {
        if (err) reject(err);
        else resolve(result[0]);
      }
    );
  });

  console.log(`  Total de recettes: ${stats.total}`);
  console.log(`  Recettes partagées: ${stats.shared || 0}`);

  if (stats.shared === 0 && stats.total > 0) {
    console.log("\n💡 ASTUCE: Aucune recette n'est partagée actuellement.");
    console.log(
      "   Pour partager une recette, utilisez la fonction de partage"
    );
    console.log("   dans votre interface utilisateur ou exécutez:");
    console.log(
      "   UPDATE recipes SET is_shared = 1 WHERE id = YOUR_RECIPE_ID;"
    );
  }

  console.log("\n✅ Configuration terminée!");
  db.end();
  process.exit(0);
}

checkAndAddColumns().catch((error) => {
  console.error("❌ Erreur:", error);
  db.end();
  process.exit(1);
});

