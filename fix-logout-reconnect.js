/**
 * Script de correction pour le problème de déconnexion/reconnexion
 * À exécuter dans la console du navigateur (F12)
 */

console.log("🔧 Correction du problème de déconnexion/reconnexion");

// Fonction pour corriger l'état d'authentification
function fixAuthState() {
  console.log("1️⃣ Correction de l'état d'authentification...");

  // Vérifier l'état actuel
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  console.log("État actuel:");
  console.log("- Token:", token ? "✅" : "❌");
  console.log("- User:", user ? "✅" : "❌");

  if (!token || !user) {
    console.log("❌ Authentification manquante - Redirection vers /auth");
    window.location.href = "/auth";
    return;
  }

  // Vérifier si les données sont valides
  try {
    const parsedUser = JSON.parse(user);
    console.log("✅ Données utilisateur valides:", parsedUser);

    // Forcer la synchronisation de l'état
    console.log("🔄 Synchronisation de l'état...");

    // Déclencher un événement personnalisé pour notifier l'application
    window.dispatchEvent(
      new CustomEvent("authStateChanged", {
        detail: { user: parsedUser, token: token },
      })
    );

    // Recharger la page pour forcer la synchronisation
    console.log("🔄 Rechargement de la page...");
    window.location.reload();
  } catch (error) {
    console.error("❌ Données corrompues:", error);
    console.log("🧹 Nettoyage des données corrompues...");
    localStorage.clear();
    window.location.href = "/auth";
  }
}

// Fonction pour forcer la déconnexion propre
function forceCleanLogout() {
  console.log("2️⃣ Déconnexion propre forcée...");

  // Nettoyer localStorage
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  // Déclencher un événement de déconnexion
  window.dispatchEvent(new CustomEvent("userLogout"));

  // Rediriger vers l'accueil
  window.location.href = "/";

  console.log("✅ Déconnexion propre effectuée");
}

// Fonction pour forcer la reconnexion
async function forceReconnection() {
  console.log("3️⃣ Reconnexion forcée...");

  try {
    // Test de connexion
    const response = await fetch("http://localhost:3000/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "test@example.com",
        password: "password123",
      }),
    });

    if (response.ok) {
      const data = await response.json();

      // Stocker les données
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.data));

      // Déclencher un événement de connexion
      window.dispatchEvent(
        new CustomEvent("userLogin", {
          detail: { user: data.data, token: data.token },
        })
      );

      console.log("✅ Reconnexion réussie");

      // Rediriger vers le dashboard
      window.location.href = "/dashboard";
    } else {
      console.error("❌ Échec de la reconnexion");
      window.location.href = "/auth";
    }
  } catch (error) {
    console.error("❌ Erreur lors de la reconnexion:", error);
    window.location.href = "/auth";
  }
}

// Fonction pour diagnostiquer le problème
function diagnoseProblem() {
  console.log("4️⃣ Diagnostic du problème...");

  // Vérifier l'URL actuelle
  console.log("URL actuelle:", window.location.pathname);

  // Vérifier l'état d'authentification
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  console.log("État d'authentification:");
  console.log("- Token:", token ? "✅ Présent" : "❌ Absent");
  console.log("- User:", user ? "✅ Présent" : "❌ Absent");

  // Vérifier les données utilisateur
  if (user) {
    try {
      const parsedUser = JSON.parse(user);
      console.log("✅ Données utilisateur valides:", parsedUser);
    } catch (error) {
      console.error("❌ Données utilisateur corrompues:", error);
    }
  }

  // Vérifier l'état de l'application React
  console.log("État de l'application:");
  console.log("- React:", typeof window.React);
  console.log(
    "- État global:",
    window.__REACT_DEVTOOLS_GLOBAL_HOOK__ ? "✅" : "❌"
  );

  // Recommandations
  console.log("\n📋 Recommandations:");
  if (!token || !user) {
    console.log("→ Utilisez forceReconnection() pour vous reconnecter");
  } else {
    console.log("→ Utilisez fixAuthState() pour corriger l'état");
  }
}

// Menu interactif
console.log("\n📋 Menu de correction:");
console.log("1. fixAuthState() - Corriger l'état d'authentification");
console.log("2. forceCleanLogout() - Déconnexion propre forcée");
console.log("3. forceReconnection() - Reconnexion forcée");
console.log("4. diagnoseProblem() - Diagnostiquer le problème");
console.log("5. fixLogoutReconnectIssue() - Correction automatique complète");

// Fonction de correction automatique complète
async function fixLogoutReconnectIssue() {
  console.log("🔄 Correction automatique complète...");

  // Étape 1: Diagnostic
  console.log("\n--- Étape 1: Diagnostic ---");
  diagnoseProblem();

  // Étape 2: Nettoyage
  console.log("\n--- Étape 2: Nettoyage ---");
  localStorage.clear();

  // Étape 3: Reconnexion
  console.log("\n--- Étape 3: Reconnexion ---");
  await forceReconnection();

  console.log("\n✅ Correction automatique terminée");
}

// Exposer les fonctions globalement
window.fixAuthState = fixAuthState;
window.forceCleanLogout = forceCleanLogout;
window.forceReconnection = forceReconnection;
window.diagnoseProblem = diagnoseProblem;
window.fixLogoutReconnectIssue = fixLogoutReconnectIssue;

console.log("\n✅ Fonctions de correction disponibles:");
console.log("- fixAuthState()");
console.log("- forceCleanLogout()");
console.log("- forceReconnection()");
console.log("- diagnoseProblem()");
console.log("- fixLogoutReconnectIssue()");

// Correction automatique si on est sur une page protégée sans authentification
if (
  window.location.pathname.includes("/dashboard") ||
  window.location.pathname.includes("/profile") ||
  window.location.pathname.includes("/favorites")
) {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  if (!token || !user) {
    console.log("🚨 Page protégée détectée sans authentification");
    console.log("🔧 Correction automatique en cours...");
    setTimeout(() => {
      window.location.href = "/auth";
    }, 1000);
  }
}
