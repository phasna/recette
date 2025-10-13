import db from "../../database.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Script de configuration de la dimension communautaire
 * Crée toutes les tables nécessaires pour les fonctionnalités sociales
 */

async function setupCommunityTables() {
  console.log("🚀 Début de la configuration de la dimension communautaire...\n");

  try {
    // Lire le fichier SQL
    const sqlFilePath = path.join(
      __dirname,
      "../../../database/setup_community.sql"
    );
    const sqlContent = fs.readFileSync(sqlFilePath, "utf8");

    // Diviser le contenu en instructions individuelles
    const statements = sqlContent
      .split(";")
      .filter((stmt) => stmt.trim().length > 0)
      .filter((stmt) => !stmt.trim().startsWith("--")) // Ignorer les commentaires
      .filter((stmt) => !stmt.trim().startsWith("/*")); // Ignorer les commentaires multilignes

    console.log(`📝 ${statements.length} instructions SQL à exécuter\n`);

    let successCount = 0;
    let errorCount = 0;

    // Exécuter chaque instruction
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i].trim();
      if (!statement) continue;

      try {
        // Afficher un résumé de l'instruction
        const preview = statement
          .substring(0, 60)
          .replace(/\s+/g, " ")
          .trim();
        console.log(`⏳ Exécution ${i + 1}/${statements.length}: ${preview}...`);

        await new Promise((resolve, reject) => {
          db.query(statement, (err, results) => {
            if (err) reject(err);
            else resolve(results);
          });
        });

        successCount++;
        console.log(`✅ Succès\n`);
      } catch (error) {
        // Certaines erreurs sont attendues (ex: trigger déjà existant)
        if (
          error.message.includes("already exists") ||
          error.message.includes("Duplicate")
        ) {
          console.log(`⚠️  Déjà existant (ignoré)\n`);
          successCount++;
        } else {
          console.error(`❌ Erreur: ${error.message}\n`);
          errorCount++;
        }
      }
    }

    console.log("\n" + "=".repeat(60));
    console.log("📊 RÉSUMÉ DE LA CONFIGURATION");
    console.log("=".repeat(60));
    console.log(`✅ Succès: ${successCount}`);
    console.log(`❌ Erreurs: ${errorCount}`);
    console.log("=".repeat(60) + "\n");

    // Vérifier les tables créées
    console.log("🔍 Vérification des tables créées...\n");

    const tables = [
      "user_follows",
      "recipe_comments",
      "comment_likes",
      "badges",
      "user_badges",
      "recipe_stats",
    ];

    for (const table of tables) {
      try {
        const [rows] = await new Promise((resolve, reject) => {
          db.query(`SELECT COUNT(*) as count FROM ${table}`, (err, results) => {
            if (err) reject(err);
            else resolve(results);
          });
        });

        console.log(`✅ Table '${table}': ${rows.count} entrées`);
      } catch (error) {
        console.log(`❌ Table '${table}': Non trouvée`);
      }
    }

    // Vérifier les badges
    console.log("\n🎖️  Vérification des badges...\n");
    const badges = await new Promise((resolve, reject) => {
      db.query("SELECT name, level, color FROM badges", (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });

    console.log(`📌 ${badges.length} badges créés:`);
    badges.forEach((badge) => {
      console.log(
        `   ${badge.name} (Niveau ${badge.level}, ${badge.color})`
      );
    });

    console.log("\n✨ Configuration de la dimension communautaire terminée!\n");
    console.log("🎉 Vous pouvez maintenant:");
    console.log("   - Suivre d'autres utilisateurs");
    console.log("   - Commenter les recettes");
    console.log("   - Gagner des badges");
    console.log("   - Voir les classements\n");
  } catch (error) {
    console.error("❌ Erreur fatale:", error.message);
    console.error(error);
    process.exit(1);
  } finally {
    // Fermer la connexion
    db.end();
  }
}

// Exécuter le script
setupCommunityTables();

