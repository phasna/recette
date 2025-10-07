/**
 * CORRECTION FINALE POUR LA RECONNEXION
 * À exécuter dans la console du navigateur (F12)
 *
 * Ce script corrige spécifiquement les problèmes de reconnexion
 */

console.log("🔧 CORRECTION FINALE POUR LA RECONNEXION");

// Fonction pour corriger la reconnexion
function fixReconnect() {
  console.log("1️⃣ Correction de la reconnexion...");

  // Vérifier l'état actuel
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  console.log("📦 État actuel:");
  console.log("- Token:", token ? "✅ Présent" : "❌ Absent");
  console.log("- User:", user ? "✅ Présent" : "❌ Absent");

  if (!token || !user) {
    console.log("❌ Pas d'authentification - Redirection vers /auth");
    window.location.href = "/auth";
    return;
  }

  try {
    const parsedUser = JSON.parse(user);
    console.log("✅ Données utilisateur valides:", parsedUser);

    // 1. Intercepter tous les appels fetch
    console.log("1.1 Interception des appels fetch...");
    if (!window.originalFetch) {
      window.originalFetch = window.fetch;
    }

    window.fetch = function (url, options = {}) {
      if (url.includes("localhost:3000/api")) {
        const currentToken = localStorage.getItem("token");
        if (currentToken) {
          options.headers = {
            ...options.headers,
            Authorization: `Bearer ${currentToken}`,
            "Content-Type": "application/json",
          };
          console.log("🔑 Token ajouté à:", url);
        }
      }
      return window.originalFetch(url, options);
    };

    // 2. Corriger les intercepteurs axios
    console.log("1.2 Correction des intercepteurs axios...");
    if (window.axios) {
      window.axios.interceptors.request.clear();
      window.axios.interceptors.request.use((config) => {
        const currentToken = localStorage.getItem("token");
        if (currentToken) {
          config.headers.Authorization = `Bearer ${currentToken}`;
          config.headers["Content-Type"] = "application/json";
        }
        return config;
      });
    }

    // 3. Synchroniser l'état React
    console.log("1.3 Synchronisation de l'état React...");
    const authEvent = new CustomEvent("authStateChanged", {
      detail: { user: parsedUser, token: token },
    });
    window.dispatchEvent(authEvent);

    console.log("✅ Correction de la reconnexion terminée");
  } catch (error) {
    console.error("❌ Erreur lors de la correction:", error);
    localStorage.clear();
    window.location.href = "/auth";
  }
}

// Fonction pour tester la reconnexion
async function testReconnect() {
  console.log("2️⃣ Test de la reconnexion...");

  const token = localStorage.getItem("token");
  if (!token) {
    console.log("❌ Pas de token pour le test");
    return false;
  }

  try {
    // Test de l'API des favoris
    const response = await fetch("http://localhost:3000/api/favorites", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    console.log(`📡 Status API: ${response.status}`);

    if (response.ok) {
      const data = await response.json();
      console.log("✅ API des favoris fonctionne");
      return true;
    } else {
      console.log(`❌ API des favoris échouée: ${response.status}`);
      return false;
    }
  } catch (error) {
    console.log(`❌ Erreur API: ${error.message}`);
    return false;
  }
}

// Fonction pour vérifier l'interface
function checkUI() {
  console.log("3️⃣ Vérification de l'interface...");

  const checks = [
    {
      name: "Bouton déconnexion",
      check: () =>
        document.querySelector(
          'button[onclick*="logout"], button:contains("Déconnexion")'
        ),
    },
    {
      name: "Page dashboard",
      check: () => window.location.pathname.includes("/dashboard"),
    },
    {
      name: "Pas d'erreur 403",
      check: () =>
        !document.querySelector(
          'h1:contains("Accès non autorisé"), h2:contains("Accès non autorisé")'
        ),
    },
  ];

  let allChecksPassed = true;

  for (const check of checks) {
    try {
      const result = check.check();
      if (result) {
        console.log(`✅ ${check.name}: OK`);
      } else {
        console.log(`❌ ${check.name}: ÉCHEC`);
        allChecksPassed = false;
      }
    } catch (error) {
      console.log(`❌ ${check.name}: ERREUR - ${error.message}`);
      allChecksPassed = false;
    }
  }

  return allChecksPassed;
}

// Fonction principale de correction
async function fixReconnectComplete() {
  console.log("🚀 CORRECTION COMPLÈTE DE LA RECONNEXION...");

  try {
    // Étape 1: Corriger la reconnexion
    console.log("\n--- ÉTAPE 1: CORRECTION ---");
    fixReconnect();

    // Étape 2: Tester la reconnexion
    console.log("\n--- ÉTAPE 2: TEST ---");
    const apiTest = await testReconnect();

    // Étape 3: Vérifier l'interface
    console.log("\n--- ÉTAPE 3: VÉRIFICATION ---");
    const uiCheck = checkUI();

    // Résumé final
    console.log("\n🎉 RÉSUMÉ FINAL:");
    console.log(`✅ Test API: ${apiTest ? "PASSÉ" : "ÉCHOUÉ"}`);
    console.log(`✅ Vérification UI: ${uiCheck ? "PASSÉE" : "ÉCHOUÉE"}`);

    if (apiTest && uiCheck) {
      console.log("\n🎉 RECONNEXION CORRIGÉE !");
      console.log("✅ Plus d'erreur 403 Forbidden");
      console.log("✅ Bouton de déconnexion visible");
      console.log("✅ Interface synchronisée");
      console.log("✅ Reconnexion fonctionne parfaitement");
    } else {
      console.log("\n⚠️ Certains tests ont échoué - Rechargement...");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  } catch (error) {
    console.error("❌ Erreur lors de la correction:", error);
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }
}

// Menu interactif
console.log("\n📋 Menu de correction de la reconnexion:");
console.log("1. fixReconnectComplete() - Correction complète");
console.log("2. fixReconnect() - Correction seulement");
console.log("3. testReconnect() - Test seulement");
console.log("4. checkUI() - Vérification interface seulement");

// Exposer les fonctions
window.fixReconnectComplete = fixReconnectComplete;
window.fixReconnect = fixReconnect;
window.testReconnect = testReconnect;
window.checkUI = checkUI;

console.log("\n✅ Fonctions disponibles:");
console.log("- fixReconnectComplete() - Solution complète");
console.log("- fixReconnect() - Correction");
console.log("- testReconnect() - Test");
console.log("- checkUI() - Vérification");

// Correction automatique si on est sur une page protégée
if (
  window.location.pathname.includes("/dashboard") ||
  window.location.pathname.includes("/profile") ||
  window.location.pathname.includes("/favorites")
) {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  if (token && user) {
    console.log("🚨 Page protégée détectée - Correction automatique...");
    setTimeout(() => {
      fixReconnectComplete();
    }, 1000);
  }
}
