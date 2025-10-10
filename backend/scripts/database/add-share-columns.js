import db from "./database.js";

/**
 * Script pour ajouter les colonnes de partage à la table recipes
 */
const addShareColumns = () => {
  console.log("🚀 Ajout des colonnes de partage à la table recipes...");

  const queries = [
    "ALTER TABLE recipes ADD COLUMN is_shared BOOLEAN DEFAULT FALSE",
    "ALTER TABLE recipes ADD COLUMN share_message TEXT",
    "ALTER TABLE recipes ADD COLUMN allow_comments BOOLEAN DEFAULT TRUE",
    "ALTER TABLE recipes ADD COLUMN show_author_info BOOLEAN DEFAULT TRUE",
    "ALTER TABLE recipes ADD COLUMN shared_at DATETIME NULL",
  ];

  let completed = 0;
  const total = queries.length;

  queries.forEach((query, index) => {
    db.query(query, (err, result) => {
      if (err) {
        // Si la colonne existe déjà, ignorer l'erreur
        if (err.code === "ER_DUP_FIELDNAME") {
          console.log(`✅ Colonne ${index + 1} existe déjà, ignoré`);
        } else {
          console.error(
            `❌ Erreur lors de l'ajout de la colonne ${index + 1}:`,
            err.message
          );
        }
      } else {
        console.log(`✅ Colonne ${index + 1} ajoutée avec succès`);
      }

      completed++;
      if (completed === total) {
        console.log("🎉 Migration terminée !");
        process.exit(0);
      }
    });
  });
};

// Exécuter la migration
addShareColumns();
