import mysql from "mysql2/promise";
import path from "path";

/**
 * Script pour corriger la colonne image_url pour supporter Base64
 * Modifie VARCHAR(500) vers LONGTEXT pour supporter les images Base64
 */

async function fixImageColumn() {
  let connection;

  try {
    console.log("🔧 Début de la correction de la colonne image_url...");

    // Connexion à la base de données
    connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "root",
      database: "recipe_app",
    });

    console.log("✅ Connexion à la base de données établie");

    // Vérifier la structure actuelle
    console.log("📊 Vérification de la structure actuelle...");
    const [columns] = await connection.execute("DESCRIBE recipes");

    const imageColumn = columns.find((col) => col.Field === "image_url");
    if (imageColumn) {
      console.log("📋 Colonne image_url actuelle :", imageColumn);
    }

    // Modifier la colonne pour supporter Base64
    console.log("🔧 Modification de la colonne image_url...");
    await connection.execute(`
      ALTER TABLE recipes 
      MODIFY COLUMN image_url LONGTEXT DEFAULT NULL 
      COMMENT 'URL de l image ou donnees Base64 de l image'
    `);

    console.log("✅ Colonne image_url modifiée avec succès");

    // Vérifier la nouvelle structure
    console.log("📊 Vérification de la nouvelle structure...");
    const [newColumns] = await connection.execute("DESCRIBE recipes");
    const newImageColumn = newColumns.find((col) => col.Field === "image_url");
    if (newImageColumn) {
      console.log("📋 Nouvelle colonne image_url :", newImageColumn);
    }

    console.log("🎉 Migration terminée avec succès !");
    console.log(
      "✅ La colonne image_url peut maintenant stocker des images Base64"
    );
  } catch (error) {
    console.error("❌ Erreur lors de la migration :", error);
    throw error;
  } finally {
    if (connection) {
      await connection.end();
      console.log("🔌 Connexion fermée");
    }
  }
}

// Exécuter le script
fixImageColumn()
  .then(() => {
    console.log("✅ Script terminé avec succès");
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ Erreur :", error);
    process.exit(1);
  });

export default fixImageColumn;
