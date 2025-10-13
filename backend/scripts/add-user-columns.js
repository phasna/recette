import db from "../database.js";

console.log("📝 Ajout des colonnes communautaires à la table users...\n");

const columns = [
  { name: "bio", definition: "TEXT NULL" },
  { name: "cooking_level", definition: "VARCHAR(50) DEFAULT 'Débutant'" },
  { name: "total_recipes", definition: "INT DEFAULT 0" },
  { name: "total_followers", definition: "INT DEFAULT 0" },
  { name: "total_following", definition: "INT DEFAULT 0" },
  { name: "total_badges", definition: "INT DEFAULT 0" },
  { name: "community_score", definition: "INT DEFAULT 0" },
];

async function addColumns() {
  for (const col of columns) {
    try {
      await new Promise((resolve, reject) => {
        db.query(
          `ALTER TABLE users ADD COLUMN ${col.name} ${col.definition}`,
          (err, result) => {
            if (err) reject(err);
            else resolve(result);
          }
        );
      });
      console.log(`✅ Colonne '${col.name}' ajoutée`);
    } catch (error) {
      if (error.message.includes("Duplicate column")) {
        console.log(`⚠️  Colonne '${col.name}' existe déjà`);
      } else {
        console.error(`❌ Erreur '${col.name}':`, error.message);
      }
    }
  }

  console.log("\n✅ Colonnes users mises à jour!");
  console.log("\n🔄 Initialisation des valeurs...");

  // Initialiser total_recipes
  try {
    await new Promise((resolve, reject) => {
      db.query(
        `UPDATE users u 
         SET total_recipes = (
           SELECT COUNT(*) FROM recipes WHERE user_id = u.id
         )`,
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
    console.log("✅ total_recipes initialisé");
  } catch (error) {
    console.error("❌ Erreur:", error.message);
  }

  console.log("\n🎉 Configuration terminée!");
  db.end();
  process.exit(0);
}

addColumns().catch((error) => {
  console.error("❌ Erreur:", error);
  db.end();
  process.exit(1);
});
