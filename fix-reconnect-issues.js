/**
 * Script de correction des problèmes après reconnexion
 * À exécuter dans la console du navigateur (F12)
 *
 * Ce script corrige :
 * 1. L'erreur 403 Forbidden sur les requêtes API
 * 2. La disparition du bouton de déconnexion
 */

console.log("🔧 Correction des problèmes après reconnexion");

// Fonction pour corriger l'erreur 403 Forbidden
function fix403Error() {
  console.log("1️⃣ Correction de l'erreur 403 Forbidden...");

  // Vérifier le token
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

    // Forcer la mise à jour des intercepteurs axios
    console.log("🔄 Mise à jour des intercepteurs axios...");

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
              "🔑 Token ajouté à la requête:",
              currentToken.substring(0, 20) + "..."
            );
          } else {
            console.log("❌ Pas de token trouvé pour la requête");
          }
          return config;
        },
        (error) => Promise.reject(error)
      );

      console.log("✅ Intercepteurs axios mis à jour");
    }

    // Tester une requête API
    console.log("🧪 Test d'une requête API...");
    testFavoritesAPI();
  } catch (error) {
    console.error("❌ Données corrompues:", error);
    localStorage.clear();
    window.location.href = "/auth";
  }
}

// Fonction pour tester l'API des favoris
async function testFavoritesAPI() {
  console.log("2️⃣ Test de l'API des favoris...");

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

// Fonction pour corriger la disparition du bouton de déconnexion
function fixLogoutButton() {
  console.log("3️⃣ Correction de la disparition du bouton de déconnexion...");

  // Vérifier l'état de l'utilisateur
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  if (!token || !user) {
    console.log("❌ Pas d'authentification - Impossible de corriger");
    return;
  }

  try {
    const parsedUser = JSON.parse(user);
    console.log("✅ Données utilisateur valides:", parsedUser);

    // Déclencher un événement pour forcer la mise à jour de l'état React
    const authEvent = new CustomEvent("authStateChanged", {
      detail: {
        user: parsedUser,
        token: token,
        timestamp: Date.now(),
      },
    });

    console.log("🔄 Déclenchement de l'événement authStateChanged...");
    window.dispatchEvent(authEvent);

    // Forcer la mise à jour de l'état dans App.jsx
    console.log("🔄 Forçage de la mise à jour de l'état...");

    // Attendre un peu puis recharger
    setTimeout(() => {
      console.log("🔄 Rechargement de la page...");
      window.location.reload();
    }, 1000);
  } catch (error) {
    console.error("❌ Erreur lors de la correction:", error);
  }
}

// Fonction pour corriger tous les problèmes après reconnexion
async function fixAllReconnectIssues() {
  console.log("🔄 Correction de tous les problèmes après reconnexion...");

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

    // Étape 2: Corriger l'erreur 403
    console.log("\n--- Étape 1: Correction de l'erreur 403 ---");
    fix403Error();

    // Étape 3: Tester l'API
    console.log("\n--- Étape 2: Test de l'API ---");
    const apiTest = await testFavoritesAPI();

    // Étape 4: Corriger le bouton de déconnexion
    console.log("\n--- Étape 3: Correction du bouton de déconnexion ---");
    fixLogoutButton();

    console.log("\n✅ Correction terminée");
  } catch (error) {
    console.error("❌ Erreur lors de la correction:", error);
    localStorage.clear();
    window.location.href = "/auth";
  }
}

// Fonction pour diagnostiquer les problèmes
function diagnoseReconnectIssues() {
  console.log("4️⃣ Diagnostic des problèmes après reconnexion...");

  // Vérifier l'état d'authentification
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

  // Recommandations
  console.log("\n📋 Recommandations:");
  if (!token || !user) {
    console.log(
      "→ Utilisez fixAllReconnectIssues() pour corriger automatiquement"
    );
  } else {
    console.log("→ Utilisez testFavoritesAPI() pour tester l'API");
    console.log(
      "→ Utilisez fixLogoutButton() pour corriger le bouton de déconnexion"
    );
  }
}

// Menu interactif
console.log("\n📋 Menu de correction après reconnexion:");
console.log("1. fix403Error() - Corriger l'erreur 403 Forbidden");
console.log("2. testFavoritesAPI() - Tester l'API des favoris");
console.log("3. fixLogoutButton() - Corriger le bouton de déconnexion");
console.log("4. fixAllReconnectIssues() - Correction automatique complète");
console.log("5. diagnoseReconnectIssues() - Diagnostic des problèmes");

// Exposer les fonctions globalement
window.fix403Error = fix403Error;
window.testFavoritesAPI = testFavoritesAPI;
window.fixLogoutButton = fixLogoutButton;
window.fixAllReconnectIssues = fixAllReconnectIssues;
window.diagnoseReconnectIssues = diagnoseReconnectIssues;

console.log("\n✅ Fonctions de correction disponibles:");
console.log("- fix403Error()");
console.log("- testFavoritesAPI()");
console.log("- fixLogoutButton()");
console.log("- fixAllReconnectIssues()");
console.log("- diagnoseReconnectIssues()");

// Correction automatique si on est sur une page protégée
if (
  window.location.pathname.includes("/dashboard") ||
  window.location.pathname.includes("/profile") ||
  window.location.pathname.includes("/favorites")
) {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  if (token && user) {
    console.log("🚨 Page protégée avec problèmes après reconnexion détectée");
    console.log("🔧 Correction automatique en cours...");
    setTimeout(() => {
      fixAllReconnectIssues();
    }, 1000);
  }
}
