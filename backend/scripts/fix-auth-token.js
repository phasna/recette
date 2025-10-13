import db from "../database.js";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

console.log("🔐 DIAGNOSTIC ET FIX D'AUTHENTIFICATION\n");
console.log("=".repeat(60));

async function fixAuth() {
  try {
    // 1. Vérifier les utilisateurs
    console.log("\n1️⃣  Vérification des utilisateurs...");

    const users = await new Promise((resolve, reject) => {
      db.query(
        "SELECT id, username, email FROM users LIMIT 5",
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });

    console.log(`✅ ${users.length} utilisateur(s) trouvé(s):`);
    users.forEach((u) => {
      console.log(`   - ${u.username} (ID: ${u.id}, Email: ${u.email})`);
    });

    // 2. Générer un nouveau token valide pour Phasna
    console.log("\n2️⃣  Génération d'un nouveau token...");

    const phasnaUser = users.find((u) => u.username === "Phasna");

    if (!phasnaUser) {
      console.log("❌ Utilisateur 'Phasna' non trouvé");
      db.end();
      process.exit(1);
    }

    const tokenPayload = {
      id: phasnaUser.id,
      username: phasnaUser.username,
      email: phasnaUser.email,
    };

    const newToken = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: "7d" });

    console.log("✅ Nouveau token généré:");
    console.log(`   Token: ${newToken.substring(0, 50)}...`);
    console.log(`   Payload:`, tokenPayload);
    console.log(`   Expire dans: 7 jours`);

    // 3. Vérifier le token
    console.log("\n3️⃣  Vérification du token...");

    try {
      const decoded = jwt.verify(newToken, JWT_SECRET);
      console.log("✅ Token valide et décodable");
      console.log("   Données décodées:", decoded);
    } catch (error) {
      console.log("❌ Token invalide:", error.message);
    }

    // 4. Instructions pour l'utilisateur
    console.log("\n" + "=".repeat(60));
    console.log("📋 INSTRUCTIONS POUR CORRIGER");
    console.log("=".repeat(60));
    console.log("\nDans le navigateur (Console - F12), exécutez:");
    console.log("\n// 1. Supprimer l'ancien token");
    console.log('localStorage.removeItem("token");');
    console.log('localStorage.removeItem("user");');
    console.log("\n// 2. Définir le nouveau token");
    console.log(`localStorage.setItem("token", "${newToken}");`);
    console.log(
      `localStorage.setItem("user", '${JSON.stringify(tokenPayload)}');`
    );
    console.log("\n// 3. Rafraîchir la page");
    console.log("location.reload();");

    console.log("\n" + "=".repeat(60));
    console.log("OU PLUS SIMPLE:");
    console.log("=".repeat(60));
    console.log("\n1. Se déconnecter de l'application");
    console.log("2. Se reconnecter avec:");
    console.log(`   Username: ${phasnaUser.username}`);
    console.log("   Password: votre mot de passe");
    console.log("\nCela générera automatiquement un nouveau token valide !\n");

    db.end();
    process.exit(0);
  } catch (error) {
    console.error("❌ Erreur:", error);
    db.end();
    process.exit(1);
  }
}

fixAuth();
