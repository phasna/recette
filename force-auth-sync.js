/**
 * Script de synchronisation forcée de l'authentification
 * À exécuter dans la console du navigateur (F12)
 *
 * Ce script force la synchronisation de l'état d'authentification
 * en contournant les problèmes de cache et de synchronisation React
 */

console.log("🔧 Synchronisation forcée de l'authentification");

// Fonction pour forcer la synchronisation complète
function forceAuthSync() {
  console.log("1️⃣ Synchronisation forcée de l'authentification...");

  // Vérifier l'état actuel
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  console.log("État localStorage:");
  console.log("- Token:", token ? "✅ Présent" : "❌ Absent");
  console.log("- User:", user ? "✅ Présent" : "❌ Absent");

  if (!token || !user) {
    console.log("❌ Pas d'authentification - Redirection vers /auth");
    window.location.href = "/auth";
    return;
  }

  // Vérifier la validité des données
  try {
    const parsedUser = JSON.parse(user);
    console.log("✅ Données utilisateur valides:", parsedUser);

    // Forcer la synchronisation en modifiant l'URL
    const currentPath = window.location.pathname;
    console.log("📍 Chemin actuel:", currentPath);

    // Si on est sur une page protégée, forcer le rechargement
    if (
      currentPath.includes("/dashboard") ||
      currentPath.includes("/profile") ||
      currentPath.includes("/favorites")
    ) {
      console.log("🔄 Page protégée détectée - Forçage du rechargement...");

      // Ajouter un paramètre de cache-busting
      const url = new URL(window.location);
      url.searchParams.set("_t", Date.now());

      // Rediriger vers la même page avec cache-busting
      window.location.href = url.toString();
    } else {
      console.log("🔄 Redirection vers le dashboard...");
      window.location.href = "/dashboard";
    }
  } catch (error) {
    console.error("❌ Données corrompues:", error);
    console.log("🧹 Nettoyage des données corrompues...");
    localStorage.clear();
    window.location.href = "/auth";
  }
}

// Fonction pour contourner complètement le système d'authentification
function bypassAuthCheck() {
  console.log("2️⃣ Contournement du système d'authentification...");

  // Vérifier l'authentification
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  if (!token || !user) {
    console.log("❌ Pas d'authentification - Impossible de contourner");
    window.location.href = "/auth";
    return;
  }

  try {
    const parsedUser = JSON.parse(user);
    console.log("✅ Authentification valide - Contournement en cours...");

    // Créer un événement personnalisé pour forcer la mise à jour
    const authEvent = new CustomEvent("forceAuthUpdate", {
      detail: {
        user: parsedUser,
        token: token,
        timestamp: Date.now(),
      },
    });

    // Déclencher l'événement
    window.dispatchEvent(authEvent);

    // Attendre un peu puis recharger
    setTimeout(() => {
      console.log("🔄 Rechargement avec contournement...");
      window.location.reload();
    }, 1000);
  } catch (error) {
    console.error("❌ Erreur lors du contournement:", error);
    localStorage.clear();
    window.location.href = "/auth";
  }
}

// Fonction pour forcer la reconnexion complète
async function forceCompleteReconnection() {
  console.log("3️⃣ Reconnexion complète forcée...");

  // Nettoyer complètement
  localStorage.clear();
  sessionStorage.clear();

  // Attendre un peu
  await new Promise((resolve) => setTimeout(resolve, 500));

  try {
    // Créer un utilisateur de test s'il n'existe pas
    const registerResponse = await fetch(
      "http://localhost:3000/api/users/register",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: "testuser",
          email: "test@example.com",
          password: "password123",
          first_name: "Test",
          last_name: "User",
        }),
      }
    );

    if (registerResponse.ok) {
      console.log("✅ Utilisateur de test créé");
    } else {
      const error = await registerResponse.json();
      if (!error.message?.includes("déjà")) {
        console.error("❌ Erreur création:", error);
        return;
      }
    }

    // Se connecter
    const loginResponse = await fetch("http://localhost:3000/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "test@example.com",
        password: "password123",
      }),
    });

    if (loginResponse.ok) {
      const data = await loginResponse.json();

      // Stocker les données
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.data));

      console.log("✅ Reconnexion complète réussie");

      // Forcer la redirection vers le dashboard
      window.location.href = "/dashboard";
    } else {
      console.error("❌ Échec de la reconnexion");
      window.location.href = "/auth";
    }
  } catch (error) {
    console.error("❌ Erreur lors de la reconnexion complète:", error);
    window.location.href = "/auth";
  }
}

// Fonction pour diagnostiquer le problème en profondeur
function deepDiagnosis() {
  console.log("4️⃣ Diagnostic en profondeur...");

  // Vérifier l'URL
  console.log("🌐 URL actuelle:", window.location.href);
  console.log("📍 Chemin:", window.location.pathname);

  // Vérifier localStorage
  console.log("💾 localStorage:");
  console.log("- Token:", localStorage.getItem("token"));
  console.log("- User:", localStorage.getItem("user"));

  // Vérifier sessionStorage
  console.log("💾 sessionStorage:");
  console.log("- Token:", sessionStorage.getItem("token"));
  console.log("- User:", sessionStorage.getItem("user"));

  // Vérifier l'état React
  console.log("⚛️ État React:");
  console.log("- React:", typeof window.React);
  console.log(
    "- DevTools:",
    window.__REACT_DEVTOOLS_GLOBAL_HOOK__ ? "✅" : "❌"
  );

  // Vérifier les cookies
  console.log("🍪 Cookies:", document.cookie);

  // Vérifier l'historique
  console.log("📚 Historique:", window.history.length);

  // Vérifier les événements
  console.log("📡 Événements personnalisés:");
  console.log("- authStateChanged:", window.hasOwnProperty("authStateChanged"));
  console.log("- userLogin:", window.hasOwnProperty("userLogin"));
  console.log("- userLogout:", window.hasOwnProperty("userLogout"));

  // Recommandations
  console.log("\n📋 Recommandations:");
  console.log("1. forceAuthSync() - Synchronisation forcée");
  console.log("2. bypassAuthCheck() - Contournement du système");
  console.log("3. forceCompleteReconnection() - Reconnexion complète");
  console.log("4. window.location.reload() - Rechargement simple");
}

// Menu interactif
console.log("\n📋 Menu de synchronisation forcée:");
console.log("1. forceAuthSync() - Synchronisation forcée");
console.log("2. bypassAuthCheck() - Contournement du système");
console.log("3. forceCompleteReconnection() - Reconnexion complète");
console.log("4. deepDiagnosis() - Diagnostic en profondeur");
console.log("5. fixAuthPermanently() - Correction permanente");

// Fonction de correction permanente
async function fixAuthPermanently() {
  console.log("🔄 Correction permanente de l'authentification...");

  // Étape 1: Diagnostic
  console.log("\n--- Étape 1: Diagnostic ---");
  deepDiagnosis();

  // Étape 2: Nettoyage complet
  console.log("\n--- Étape 2: Nettoyage complet ---");
  localStorage.clear();
  sessionStorage.clear();

  // Étape 3: Reconnexion complète
  console.log("\n--- Étape 3: Reconnexion complète ---");
  await forceCompleteReconnection();

  console.log("\n✅ Correction permanente terminée");
}

// Exposer les fonctions globalement
window.forceAuthSync = forceAuthSync;
window.bypassAuthCheck = bypassAuthCheck;
window.forceCompleteReconnection = forceCompleteReconnection;
window.deepDiagnosis = deepDiagnosis;
window.fixAuthPermanently = fixAuthPermanently;

console.log("\n✅ Fonctions de synchronisation forcée disponibles:");
console.log("- forceAuthSync()");
console.log("- bypassAuthCheck()");
console.log("- forceCompleteReconnection()");
console.log("- deepDiagnosis()");
console.log("- fixAuthPermanently()");

// Correction automatique si nécessaire
if (
  window.location.pathname.includes("/dashboard") ||
  window.location.pathname.includes("/profile") ||
  window.location.pathname.includes("/favorites")
) {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  if (!token || !user) {
    console.log("🚨 Page protégée sans authentification détectée");
    console.log("🔧 Correction automatique en cours...");
    setTimeout(() => {
      window.location.href = "/auth";
    }, 1000);
  } else {
    console.log("🔧 Authentification détectée - Synchronisation forcée...");
    setTimeout(() => {
      forceAuthSync();
    }, 1000);
  }
}
