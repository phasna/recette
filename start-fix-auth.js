#!/usr/bin/env node

/**
 * Script de démarrage pour corriger le problème d'authentification
 * Démarre backend et frontend avec les bons ports
 */

const { spawn } = require("child_process");
const path = require("path");

console.log(
  "🚀 Démarrage de l'application avec correction d'authentification...\n"
);

// Fonction pour démarrer le backend
function startBackend() {
  console.log("🔧 Démarrage du backend sur le port 3000...");

  const backend = spawn("node", ["server.js"], {
    cwd: path.join(__dirname, "backend"),
    stdio: "inherit",
    shell: true,
  });

  backend.on("error", (error) => {
    console.error("❌ Erreur backend:", error.message);
  });

  backend.on("close", (code) => {
    if (code !== 0) {
      console.log(`❌ Backend fermé avec le code ${code}`);
    }
  });

  return backend;
}

// Fonction pour démarrer le frontend
function startFrontend() {
  console.log("🎨 Démarrage du frontend sur le port 5001...");

  const frontend = spawn("npm", ["run", "dev"], {
    cwd: path.join(__dirname, "frontend"),
    stdio: "inherit",
    shell: true,
  });

  frontend.on("error", (error) => {
    console.error("❌ Erreur frontend:", error.message);
  });

  frontend.on("close", (code) => {
    if (code !== 0) {
      console.log(`❌ Frontend fermé avec le code ${code}`);
    }
  });

  return frontend;
}

// Fonction principale
async function main() {
  try {
    console.log("📋 Configuration des ports:");
    console.log("   - Backend: http://localhost:3000");
    console.log("   - Frontend: http://localhost:5001");
    console.log("   - API: http://localhost:3000/api\n");

    // Démarrer le backend
    const backendProcess = startBackend();

    // Attendre un peu avant de démarrer le frontend
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // Démarrer le frontend
    const frontendProcess = startFrontend();

    console.log("\n✅ Application démarrée avec succès !");
    console.log("🌐 Ouvrez votre navigateur sur: http://localhost:5001");
    console.log(
      "🔑 Pour vous connecter, allez sur: http://localhost:5001/auth"
    );
    console.log("\n📋 Instructions:");
    console.log("1. Ouvrez http://localhost:5001/auth");
    console.log("2. Connectez-vous ou créez un compte");
    console.log("3. Accédez au dashboard: http://localhost:5001/dashboard");
    console.log("\n🛑 Pour arrêter l'application, appuyez sur Ctrl+C");

    // Gestion de l'arrêt propre
    process.on("SIGINT", () => {
      console.log("\n🛑 Arrêt de l'application...");
      backendProcess.kill();
      frontendProcess.kill();
      process.exit(0);
    });
  } catch (error) {
    console.error("❌ Erreur lors du démarrage:", error);
    process.exit(1);
  }
}

// Démarrer l'application
main();
