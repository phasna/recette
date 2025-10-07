/**
 * Script de correction de tous les appels API
 * À exécuter dans la console du navigateur (F12)
 *
 * Ce script corrige tous les appels API qui utilisent fetch
 * en s'assurant que le token est correctement envoyé
 */

console.log("🔧 Correction de tous les appels API");

// Fonction pour intercepter tous les appels fetch
function interceptAllFetchCalls() {
  console.log("1️⃣ Interception de tous les appels fetch...");

  // Sauvegarder la fonction fetch originale
  const originalFetch = window.fetch;

  // Remplacer fetch par une version qui ajoute automatiquement le token
  window.fetch = function (url, options = {}) {
    // Vérifier si c'est un appel vers notre API
    if (url.includes("localhost:3000/api")) {
      console.log("🔍 Appel API détecté:", url);

      // Récupérer le token depuis localStorage
      const token = localStorage.getItem("token");

      if (token) {
        // Ajouter le token aux headers
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        };

        console.log(
          "🔑 Token ajouté automatiquement:",
          token.substring(0, 20) + "..."
        );
      } else {
        console.log("❌ Pas de token trouvé pour l'appel API");
      }
    }

    // Appeler la fonction fetch originale avec les options modifiées
    return originalFetch(url, options);
  };

  console.log("✅ Interception fetch activée");
}

// Fonction pour corriger les appels API existants
function fixExistingAPICalls() {
  console.log("2️⃣ Correction des appels API existants...");

  // Vérifier le token
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  if (!token || !user) {
    console.log("❌ Pas d'authentification - Impossible de corriger");
    return;
  }

  try {
    const parsedUser = JSON.parse(user);
    console.log("✅ Données utilisateur valides:", parsedUser);

    // Tester l'API des favoris
    console.log("🧪 Test de l'API des favoris...");
    testFavoritesAPI();
  } catch (error) {
    console.error("❌ Données corrompues:", error);
    localStorage.clear();
    window.location.href = "/auth";
  }
}

// Fonction pour tester l'API des favoris
async function testFavoritesAPI() {
  console.log("3️⃣ Test de l'API des favoris...");

  const token = localStorage.getItem("token");

  if (!token) {
    console.log("❌ Pas de token pour le test");
    return false;
  }

  try {
    const response = await fetch("http://localhost:3000/api/favorites", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    console.log("📡 Réponse API:", response.status, response.statusText);

    if (response.ok) {
      const data = await response.json();
      console.log("✅ API des favoris fonctionne:", data);
      return true;
    } else {
      console.error(
        "❌ API des favoris échouée:",
        response.status,
        response.statusText
      );

      if (response.status === 403) {
        console.log("🔧 Token invalide - Reconnexion nécessaire");
        return false;
      }

      return false;
    }
  } catch (error) {
    console.error("❌ Erreur lors du test API:", error);
    return false;
  }
}

// Fonction pour forcer le rechargement des composants
function forceComponentReload() {
  console.log("4️⃣ Forçage du rechargement des composants...");

  // Déclencher un événement pour forcer la mise à jour
  const authEvent = new CustomEvent("authStateChanged", {
    detail: {
      user: JSON.parse(localStorage.getItem("user")),
      token: localStorage.getItem("token"),
      timestamp: Date.now(),
    },
  });

  window.dispatchEvent(authEvent);
  console.log("✅ Événement authStateChanged déclenché");

  // Forcer le rechargement de la page
  setTimeout(() => {
    console.log("🔄 Rechargement de la page...");
    window.location.reload();
  }, 2000);
}

// Fonction pour corriger tous les problèmes
async function fixAllAPIIssues() {
  console.log("🔄 Correction de tous les problèmes d'API...");

  // Étape 1: Vérifier l'état
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  if (!token || !user) {
    console.log("❌ Pas d'authentification - Redirection vers /auth");
    window.location.href = "/auth";
    return;
  }

  try {
    const parsedUser = JSON.parse(user);
    console.log("✅ Données utilisateur valides:", parsedUser);

    // Étape 2: Intercepter tous les appels fetch
    console.log("\n--- Étape 1: Interception des appels fetch ---");
    interceptAllFetchCalls();

    // Étape 3: Tester l'API
    console.log("\n--- Étape 2: Test de l'API ---");
    const apiTest = await testFavoritesAPI();

    // Étape 4: Forcer le rechargement des composants
    console.log("\n--- Étape 3: Rechargement des composants ---");
    forceComponentReload();

    console.log("\n✅ Correction terminée");
  } catch (error) {
    console.error("❌ Erreur lors de la correction:", error);
    localStorage.clear();
    window.location.href = "/auth";
  }
}

// Fonction pour diagnostiquer les problèmes d'API
function diagnoseAPIIssues() {
  console.log("5️⃣ Diagnostic des problèmes d'API...");

  // Vérifier l'état d'authentification
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  console.log("📦 État d'authentification:");
  console.log("- Token:", token ? "✅ Présent" : "❌ Absent");
  console.log("- User:", user ? "✅ Présent" : "❌ Absent");

  if (token) {
    console.log("- Token (début):", token.substring(0, 20) + "...");
  }

  // Vérifier les intercepteurs axios
  console.log("🔧 Intercepteurs axios:");
  if (window.axios) {
    console.log("- Axios disponible:", "✅");
    console.log(
      "- Intercepteurs request:",
      window.axios.interceptors.request.handlers.length
    );
  } else {
    console.log("- Axios disponible:", "❌");
  }

  // Vérifier la fonction fetch
  console.log("🌐 Fonction fetch:");
  console.log(
    "- Fetch originale:",
    window.fetch === window.originalFetch ? "✅" : "❌"
  );
  console.log(
    "- Fetch interceptée:",
    window.fetch !== window.originalFetch ? "✅" : "❌"
  );

  // Recommandations
  console.log("\n📋 Recommandations:");
  if (!token || !user) {
    console.log("→ Utilisez fixAllAPIIssues() pour corriger automatiquement");
  } else {
    console.log("→ Utilisez testFavoritesAPI() pour tester l'API");
    console.log(
      "→ Utilisez interceptAllFetchCalls() pour intercepter les appels"
    );
  }
}

// Menu interactif
console.log("\n📋 Menu de correction des appels API:");
console.log("1. interceptAllFetchCalls() - Intercepter tous les appels fetch");
console.log("2. testFavoritesAPI() - Tester l'API des favoris");
console.log("3. fixExistingAPICalls() - Corriger les appels existants");
console.log(
  "4. forceComponentReload() - Forcer le rechargement des composants"
);
console.log("5. fixAllAPIIssues() - Correction automatique complète");
console.log("6. diagnoseAPIIssues() - Diagnostic des problèmes");

// Exposer les fonctions globalement
window.interceptAllFetchCalls = interceptAllFetchCalls;
window.testFavoritesAPI = testFavoritesAPI;
window.fixExistingAPICalls = fixExistingAPICalls;
window.forceComponentReload = forceComponentReload;
window.fixAllAPIIssues = fixAllAPIIssues;
window.diagnoseAPIIssues = diagnoseAPIIssues;

console.log("\n✅ Fonctions de correction des appels API disponibles:");
console.log("- interceptAllFetchCalls()");
console.log("- testFavoritesAPI()");
console.log("- fixExistingAPICalls()");
console.log("- forceComponentReload()");
console.log("- fixAllAPIIssues()");
console.log("- diagnoseAPIIssues()");

// Correction automatique si on est sur une page protégée
if (
  window.location.pathname.includes("/dashboard") ||
  window.location.pathname.includes("/profile") ||
  window.location.pathname.includes("/favorites")
) {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  if (token && user) {
    console.log("🚨 Page protégée avec problèmes d'API détectée");
    console.log("🔧 Correction automatique en cours...");
    setTimeout(() => {
      fixAllAPIIssues();
    }, 1000);
  }
}
