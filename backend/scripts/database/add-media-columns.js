import mysql from "mysql2";
import config from "../../config.js";

/**
 * Script pour ajouter les colonnes image_url et video_url à la table recipes
 * Date : 21 octobre 2025
 */

console.log("🚀 Migration : Ajout des colonnes photo et vidéo\n");
console.log("================================================\n");

// Créer la connexion
const connection = mysql.createConnection({
  host: config.database.host,
  user: config.database.user,
  password: config.database.password,
  database: config.database.database,
});

// Connexion à la base de données
connection.connect((err) => {
  if (err) {
    console.error("❌ Erreur de connexion:", err.message);
    process.exit(1);
  }
  console.log("✅ Connecté à la base de données:", config.database.database);
  console.log("");

  // Vérifier si les colonnes existent déjà
  const checkQuery = "SHOW COLUMNS FROM recipes LIKE '%_url'";

  connection.query(checkQuery, (err, results) => {
    if (err) {
      console.error("❌ Erreur lors de la vérification:", err.message);
      connection.end();
      process.exit(1);
    }

    const existingColumns = results.map((row) => row.Field);
    const hasImageUrl = existingColumns.includes("image_url");
    const hasVideoUrl = existingColumns.includes("video_url");

    if (hasImageUrl && hasVideoUrl) {
      console.log("ℹ️  Les colonnes existent déjà :");
      console.log("   - image_url ✅");
      console.log("   - video_url ✅");
      console.log("");
      console.log("✅ Aucune migration nécessaire !");
      connection.end();
      process.exit(0);
    }

    // Ajouter les colonnes manquantes
    console.log("📊 Ajout des colonnes...\n");

    const queries = [];

    if (!hasImageUrl) {
      queries.push({
        name: "image_url",
        query:
          "ALTER TABLE recipes ADD COLUMN image_url VARCHAR(500) DEFAULT NULL COMMENT 'URL de l\\'image de la recette'",
      });
    }

    if (!hasVideoUrl) {
      queries.push({
        name: "video_url",
        query:
          "ALTER TABLE recipes ADD COLUMN video_url VARCHAR(500) DEFAULT NULL COMMENT 'URL de la vidéo (YouTube, etc.)'",
      });
    }

    // Exécuter les requêtes
    let completed = 0;

    queries.forEach((item, index) => {
      connection.query(item.query, (err) => {
        if (err) {
          console.error(
            `❌ Erreur lors de l'ajout de ${item.name}:`,
            err.message
          );
        } else {
          console.log(`✅ Colonne ${item.name} ajoutée avec succès`);
        }

        completed++;

        if (completed === queries.length) {
          console.log("");
          console.log("================================================");
          console.log("✅ Migration terminée avec succès !");
          console.log("================================================");
          console.log("");
          console.log("📝 Prochaines étapes :");
          console.log("   1. Redémarrer le serveur backend");
          console.log("   2. Tester l'ajout d'une recette avec photo et vidéo");
          console.log("");

          // Afficher la structure mise à jour
          connection.query("DESCRIBE recipes", (err, results) => {
            if (!err) {
              console.log("📊 Structure de la table recipes :");
              console.log("");
              results.forEach((row) => {
                const marker =
                  row.Field === "image_url" || row.Field === "video_url"
                    ? "✨ "
                    : "   ";
                console.log(`${marker}${row.Field} (${row.Type})`);
              });
              console.log("");
            }

            connection.end();
            process.exit(0);
          });
        }
      });
    });
  });
});

// Gérer les erreurs non capturées
process.on("uncaughtException", (err) => {
  console.error("❌ Erreur non capturée:", err.message);
  process.exit(1);
});
