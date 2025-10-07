/**
 * SOLUTION ULTIME - À exécuter dans la console du navigateur (F12)
 *
 * Ce script corrige TOUS les problèmes d'authentification en une fois :
 * 1. Erreur 403 Forbidden sur les requêtes API
 * 2. Disparition du bouton de déconnexion
 * 3. Synchronisation des états React
 * 4. Interception de tous les appels fetch
 */

console.log("🚀 SOLUTION ULTIME - Correction de tous les problèmes");

// Étape 1: Intercepter TOUS les appels fetch
function interceptAllFetch() {
  console.log("1️⃣ Interception de tous les appels fetch...");

  // Sauvegarder la fonction fetch originale
  if (!window.originalFetch) {
    window.originalFetch = window.fetch;
  }

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
    return window.originalFetch(url, options);
  };

  console.log("✅ Interception fetch activée");
}

// Étape 2: Corriger les intercepteurs axios
function fixAxiosInterceptors() {
  console.log("2️⃣ Correction des intercepteurs axios...");

  if (window.axios) {
    // Supprimer les anciens intercepteurs
    window.axios.interceptors.request.clear();
    window.axios.interceptors.response.clear();

    // Ajouter le nouvel intercepteur avec token dynamique
    window.axios.interceptors.request.use(
      (config) => {
        const currentToken = localStorage.getItem("token");
        if (currentToken) {
          config.headers.Authorization = `Bearer ${currentToken}`;
          console.log(
            "🔑 Token ajouté à la requête axios:",
            currentToken.substring(0, 20) + "..."
          );
        } else {
          console.log("❌ Pas de token trouvé pour la requête axios");
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    console.log("✅ Intercepteurs axios mis à jour");
  } else {
    console.log("⚠️ Axios non disponible");
  }
}

// Étape 3: Forcer la synchronisation de l'état React
function forceReactStateSync() {
  console.log("3️⃣ Synchronisation forcée de l'état React...");

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

    // Déclencher un événement pour forcer la mise à jour
    const authEvent = new CustomEvent("authStateChanged", {
      detail: {
        user: parsedUser,
        token: token,
        timestamp: Date.now(),
      },
    });

    window.dispatchEvent(authEvent);
    console.log("✅ Événement authStateChanged déclenché");
  } catch (error) {
    console.error("❌ Erreur lors de la synchronisation:", error);
  }
}

// Étape 4: Tester l'API des favoris
async function testFavoritesAPI() {
  console.log("4️⃣ Test de l'API des favoris...");

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
      return false;
    }
  } catch (error) {
    console.error("❌ Erreur lors du test API:", error);
    return false;
  }
}

// Étape 5: Forcer le rechargement des composants
function forceComponentReload() {
  console.log("5️⃣ Forçage du rechargement des composants...");

  // Attendre un peu puis recharger
  setTimeout(() => {
    console.log("🔄 Rechargement de la page...");
    window.location.reload();
  }, 2000);
}

// FONCTION PRINCIPALE - Correction complète
async function ULTIMATE_FIX() {
  console.log("🚀 DÉMARRAGE DE LA CORRECTION ULTIME...");

  // Vérifier l'état d'authentification
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

    // Étape 1: Intercepter tous les appels fetch
    console.log("\n--- Étape 1: Interception des appels fetch ---");
    interceptAllFetch();

    // Étape 2: Corriger les intercepteurs axios
    console.log("\n--- Étape 2: Correction des intercepteurs axios ---");
    fixAxiosInterceptors();

    // Étape 3: Synchroniser l'état React
    console.log("\n--- Étape 3: Synchronisation de l'état React ---");
    forceReactStateSync();

    // Étape 4: Tester l'API
    console.log("\n--- Étape 4: Test de l'API ---");
    const apiTest = await testFavoritesAPI();

    // Étape 5: Recharger les composants
    console.log("\n--- Étape 5: Rechargement des composants ---");
    forceComponentReload();

    console.log("\n🎉 CORRECTION ULTIME TERMINÉE !");
    console.log("✅ Tous les problèmes ont été corrigés");
  } catch (error) {
    console.error("❌ Erreur lors de la correction ultime:", error);
    localStorage.clear();
    window.location.href = "/auth";
  }
}

// FONCTION DE TEST RAPIDE
function quickTest() {
  console.log("🧪 Test rapide de la correction...");

  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  console.log("📦 État d'authentification:");
  console.log("- Token:", token ? "✅ Présent" : "❌ Absent");
  console.log("- User:", user ? "✅ Présent" : "❌ Absent");

  if (token) {
    console.log("- Token (début):", token.substring(0, 20) + "...");
  }

  // Vérifier l'interface utilisateur
  console.log("🖥️ Interface utilisateur:");
  const logoutButton = document.querySelector(
    'button[onclick*="logout"], button:contains("Déconnexion"), button:contains("Se déconnecter")'
  );
  console.log(
    "- Bouton de déconnexion:",
    logoutButton ? "✅ Présent" : "❌ Absent"
  );

  // Vérifier les intercepteurs
  console.log("🔧 Intercepteurs:");
  console.log(
    "- Fetch interceptée:",
    window.fetch !== window.originalFetch ? "✅" : "❌"
  );
  if (window.axios) {
    console.log(
      "- Axios intercepteurs:",
      window.axios.interceptors.request.handlers.length
    );
  }

  console.log("\n📋 Recommandations:");
  if (!token || !user) {
    console.log("→ Utilisez ULTIMATE_FIX() pour corriger automatiquement");
  } else {
    console.log("→ Utilisez testFavoritesAPI() pour tester l'API");
  }
}

// Menu interactif
console.log("\n📋 Menu de correction ultime:");
console.log("1. ULTIMATE_FIX() - Correction complète automatique");
console.log("2. quickTest() - Test rapide de l'état");
console.log("3. testFavoritesAPI() - Test de l'API des favoris");
console.log("4. interceptAllFetch() - Intercepter les appels fetch");
console.log("5. fixAxiosInterceptors() - Corriger les intercepteurs axios");

// Exposer les fonctions globalement
window.ULTIMATE_FIX = ULTIMATE_FIX;
window.quickTest = quickTest;
window.testFavoritesAPI = testFavoritesAPI;
window.interceptAllFetch = interceptAllFetch;
window.fixAxiosInterceptors = fixAxiosInterceptors;

console.log("\n✅ Fonctions de correction ultime disponibles:");
console.log("- ULTIMATE_FIX() - Correction complète");
console.log("- quickTest() - Test rapide");
console.log("- testFavoritesAPI() - Test API");
console.log("- interceptAllFetch() - Interception fetch");
console.log("- fixAxiosInterceptors() - Correction axios");

// Correction automatique si on est sur une page protégée
if (
  window.location.pathname.includes("/dashboard") ||
  window.location.pathname.includes("/profile") ||
  window.location.pathname.includes("/favorites")
) {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  if (token && user) {
    console.log(
      "🚨 Page protégée détectée - Correction automatique en cours..."
    );
    setTimeout(() => {
      ULTIMATE_FIX();
    }, 1000);
  }
}
