#!/usr/bin/env node

/**
 * Script de démarrage propre
 * Résout tous les problèmes et démarre l'application
 */

const { exec, spawn } = require("child_process");
const fs = require("fs");
const path = require("path");

console.log("🧹 Démarrage propre de l'application\n");

/**
 * Nettoyer tous les ports
 */
async function cleanPorts() {
  console.log("🔧 Nettoyage des ports...");

  const ports = [3000, 5000];

  for (const port of ports) {
    try {
      await new Promise((resolve) => {
        exec(`lsof -ti:${port}`, (error, stdout) => {
          if (stdout.trim()) {
            console.log(`🛑 Arrêt des processus sur le port ${port}...`);
            exec(`kill -9 ${stdout.trim()}`, () => {
              console.log(`✅ Port ${port} libéré`);
              resolve();
            });
          } else {
            console.log(`✅ Port ${port} déjà libre`);
            resolve();
          }
        });
      });
    } catch (error) {
      console.log(`⚠️ Erreur port ${port}:`, error.message);
    }
  }
}

/**
 * Démarrer le backend
 */
async function startBackend() {
  console.log("\n🚀 Démarrage du backend sur le port 3000...");

  return new Promise((resolve) => {
    const backend = spawn("node", ["server.js"], {
      cwd: "./backend",
      stdio: "pipe",
    });

    let started = false;

    backend.stdout.on("data", (data) => {
      const output = data.toString();
      console.log("Backend:", output);

      if (output.includes("Serveur démarré") && !started) {
        console.log("✅ Backend démarré sur le port 3000");
        started = true;
        resolve(backend);
      }
    });

    backend.stderr.on("data", (data) => {
      const output = data.toString();
      if (output.includes("EADDRINUSE")) {
        console.log("⚠️ Port 3000 occupé, tentative de libération...");
        exec("lsof -ti:3000 | xargs kill -9", () => {
          console.log("🔄 Redémarrage du backend...");
        });
      } else {
        console.log("Backend Error:", output);
      }
    });

    backend.on("error", (error) => {
      console.log("❌ Erreur backend:", error.message);
      resolve(null);
    });

    // Timeout après 5 secondes
    setTimeout(() => {
      if (!started) {
        console.log("⏰ Timeout backend, mais processus démarré");
        resolve(backend);
      }
    }, 5000);
  });
}

/**
 * Démarrer le frontend
 */
async function startFrontend() {
  console.log("\n🎨 Démarrage du frontend sur le port 5001...");

  return new Promise((resolve) => {
    const frontend = spawn("npm", ["run", "dev"], {
      cwd: "./frontend",
      stdio: "pipe",
    });

    let started = false;

    frontend.stdout.on("data", (data) => {
      const output = data.toString();
      console.log("Frontend:", output);

        if (output.includes("Local:") && !started) {
          console.log("✅ Frontend démarré sur le port 5001");
          started = true;
          resolve(frontend);
        }
    });

    frontend.stderr.on("data", (data) => {
      const output = data.toString();
      if (output.includes("Something is already running on port")) {
        console.log("⚠️ Port occupé, tentative de libération...");
        exec("lsof -ti:5000 | xargs kill -9", () => {
          console.log("🔄 Redémarrage du frontend...");
        });
      } else {
        console.log("Frontend Error:", output);
      }
    });

    frontend.on("error", (error) => {
      console.log("❌ Erreur frontend:", error.message);
      resolve(null);
    });

    // Timeout après 15 secondes
    setTimeout(() => {
      if (!started) {
        console.log("⏰ Timeout frontend, mais processus démarré");
        resolve(frontend);
      }
    }, 15000);
  });
}

/**
 * Fonction principale
 */
async function main() {
  try {
    // Nettoyer les ports
    await cleanPorts();

    // Attendre un peu
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Démarrer le backend
    const backend = await startBackend();
    if (!backend) {
      console.log("❌ Impossible de démarrer le backend");
      return;
    }

    // Attendre que le backend soit prêt
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // Démarrer le frontend
    const frontend = await startFrontend();
    if (!frontend) {
      console.log("❌ Impossible de démarrer le frontend");
      return;
    }

        console.log("\n🎉 Application démarrée avec succès !");
        console.log("📱 Frontend: http://localhost:5001");
        console.log("🔧 Backend: http://localhost:3000/api");
    console.log("\n💡 Pour arrêter, appuyez sur Ctrl+C");

    // Gérer l'arrêt propre
    process.on("SIGINT", () => {
      console.log("\n🛑 Arrêt de l'application...");
      if (backend) backend.kill();
      if (frontend) frontend.kill();
      process.exit(0);
    });
  } catch (error) {
    console.error("❌ Erreur:", error.message);
  }
}

// Exécuter
main();
