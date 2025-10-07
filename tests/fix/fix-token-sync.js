/**
 * Script de correction du problème de token
 * À exécuter dans la console du navigateur (F12)
 *
 * Ce script corrige le problème de synchronisation du token
 * entre localStorage et les requêtes API
 */

console.log("🔧 Correction du problème de token");

// Fonction pour forcer la synchronisation du token
function forceTokenSync() {
  console.log("1️⃣ Synchronisation forcée du token...");

  // Vérifier l'état du token
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  console.log("📦 État du token:");
  console.log("- Token:", token ? "✅ Présent" : "❌ Absent");
  console.log("- User:", user ? "✅ Présent" : "❌ Absent");

  if (!token || !user) {
    console.log("❌ Pas de token - Redirection vers /auth");
    window.location.href = "/auth";
    return;
  }

  try {
    const parsedUser = JSON.parse(user);
    console.log("✅ Données utilisateur valides:", parsedUser);

    // Forcer la mise à jour des intercepteurs axios
    console.log("🔄 Mise à jour des intercepteurs axios...");

    // Récupérer l'instance axios globale
    if (window.axios) {
      // Supprimer les anciens intercepteurs
      window.axios.interceptors.request.clear();
      window.axios.interceptors.response.clear();

      // Ajouter le nouvel intercepteur
      window.axios.interceptors.request.use(
        (config) => {
          const currentToken = localStorage.getItem("token");
          if (currentToken) {
            config.headers.Authorization = `Bearer ${currentToken}`;
            console.log(
              "🔑 Token ajouté à la requête:",
              currentToken.substring(0, 20) + "..."
            );
          }
          return config;
        },
        (error) => Promise.reject(error)
      );

      console.log("✅ Intercepteurs axios mis à jour");
    }

    // Tester une requête API
    console.log("🧪 Test d'une requête API...");
    testAPIRequest();
  } catch (error) {
    console.error("❌ Données corrompues:", error);
    localStorage.clear();
    window.location.href = "/auth";
  }
}

// Fonction pour tester une requête API
async function testAPIRequest() {
  console.log("2️⃣ Test d'une requête API...");

  const token = localStorage.getItem("token");

  if (!token) {
    console.log("❌ Pas de token pour le test");
    return false;
  }

  try {
    // Test avec fetch
    const response = await fetch("http://localhost:3000/api/favorites", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    console.log("📡 Réponse API:", response.status, response.statusText);

    if (response.ok) {
      const data = await response.json();
      console.log("✅ Requête API réussie:", data);
      return true;
    } else {
      console.error(
        "❌ Requête API échouée:",
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

// Fonction pour corriger automatiquement le problème
async function autoFixTokenIssue() {
  console.log("🔄 Correction automatique du problème de token...");

  // Étape 1: Vérifier l'état
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  if (!token || !user) {
    console.log("❌ Pas d'authentification - Redirection vers /auth");
    window.location.href = "/auth";
    return;
  }

  // Étape 2: Tester la requête API
  console.log("\n--- Étape 1: Test de la requête API ---");
  const apiTest = await testAPIRequest();

  if (apiTest) {
    console.log("✅ API fonctionne - Pas de correction nécessaire");
    return;
  }

  // Étape 3: Forcer la synchronisation du token
  console.log("\n--- Étape 2: Synchronisation du token ---");
  forceTokenSync();

  // Étape 4: Recharger la page
  console.log("\n--- Étape 3: Rechargement de la page ---");
  setTimeout(() => {
    console.log("🔄 Rechargement de la page...");
    window.location.reload();
  }, 2000);
}

// Fonction pour diagnostiquer le problème de token
function diagnoseTokenIssue() {
  console.log("3️⃣ Diagnostic du problème de token...");

  // Vérifier le token
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  console.log("📦 État du token:");
  console.log("- Token:", token ? "✅ Présent" : "❌ Absent");
  console.log("- User:", user ? "✅ Présent" : "❌ Absent");

  if (token) {
    console.log("- Token (début):", token.substring(0, 20) + "...");
    console.log("- Token (fin):", "..." + token.substring(token.length - 10));
  }

  // Vérifier les intercepteurs axios
  console.log("🔧 Intercepteurs axios:");
  if (window.axios) {
    console.log("- Axios disponible:", "✅");
    console.log(
      "- Intercepteurs request:",
      window.axios.interceptors.request.handlers.length
    );
    console.log(
      "- Intercepteurs response:",
      window.axios.interceptors.response.handlers.length
    );
  } else {
    console.log("- Axios disponible:", "❌");
  }

  // Vérifier les services
  console.log("📡 Services:");
  console.log("- AuthService:", window.AuthService ? "✅" : "❌");
  console.log("- RecipeService:", window.RecipeService ? "✅" : "❌");
  console.log("- FavoriteService:", window.FavoriteService ? "✅" : "❌");

  // Recommandations
  console.log("\n📋 Recommandations:");
  if (!token) {
    console.log("→ Utilisez autoFixTokenIssue() pour corriger automatiquement");
  } else {
    console.log("→ Utilisez testAPIRequest() pour tester l'API");
  }
}

// Menu interactif
console.log("\n📋 Menu de correction du token:");
console.log("1. forceTokenSync() - Synchronisation forcée du token");
console.log("2. testAPIRequest() - Test d'une requête API");
console.log("3. autoFixTokenIssue() - Correction automatique");
console.log("4. diagnoseTokenIssue() - Diagnostic du problème");

// Exposer les fonctions globalement
window.forceTokenSync = forceTokenSync;
window.testAPIRequest = testAPIRequest;
window.autoFixTokenIssue = autoFixTokenIssue;
window.diagnoseTokenIssue = diagnoseTokenIssue;

console.log("\n✅ Fonctions de correction du token disponibles:");
console.log("- forceTokenSync()");
console.log("- testAPIRequest()");
console.log("- autoFixTokenIssue()");
console.log("- diagnoseTokenIssue()");

// Correction automatique si on est sur une page protégée
if (
  window.location.pathname.includes("/dashboard") ||
  window.location.pathname.includes("/profile") ||
  window.location.pathname.includes("/favorites")
) {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  if (token && user) {
    console.log("🚨 Page protégée avec token détectée");
    console.log("🔧 Test automatique du token...");
    setTimeout(() => {
      testAPIRequest();
    }, 1000);
  }
}
