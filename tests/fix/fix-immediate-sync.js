/**
 * Script de correction immédiate pour la synchronisation
 * À exécuter dans la console du navigateur (F12)
 *
 * Ce script corrige immédiatement le problème de synchronisation
 * entre l'authentification valide et l'interface utilisateur
 */

console.log("🔧 Correction immédiate de la synchronisation");

// Fonction pour forcer la synchronisation immédiate
function forceImmediateSync() {
  console.log("1️⃣ Synchronisation immédiate...");

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

  try {
    const parsedUser = JSON.parse(user);
    console.log("✅ Données utilisateur valides:", parsedUser);

    // Déclencher un événement pour forcer la mise à jour de React
    const authEvent = new CustomEvent("authStateChanged", {
      detail: {
        user: parsedUser,
        token: token,
        timestamp: Date.now(),
      },
    });

    console.log("🔄 Déclenchement de l'événement authStateChanged...");
    window.dispatchEvent(authEvent);

    // Attendre un peu puis forcer le rechargement
    setTimeout(() => {
      console.log("🔄 Rechargement de la page...");
      window.location.reload();
    }, 1000);
  } catch (error) {
    console.error("❌ Données corrompues:", error);
    localStorage.clear();
    window.location.href = "/auth";
  }
}

// Fonction pour contourner complètement le problème
function bypassSyncIssue() {
  console.log("2️⃣ Contournement du problème de synchronisation...");

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

    // Forcer la redirection vers le dashboard avec cache-busting
    const url = new URL(window.location);
    url.pathname = "/dashboard";
    url.searchParams.set("_sync", Date.now());

    console.log("🔄 Redirection vers:", url.toString());
    window.location.href = url.toString();
  } catch (error) {
    console.error("❌ Erreur lors du contournement:", error);
    localStorage.clear();
    window.location.href = "/auth";
  }
}

// Fonction pour forcer la mise à jour de l'état React
function forceReactUpdate() {
  console.log("3️⃣ Forçage de la mise à jour React...");

  // Vérifier l'authentification
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  if (!token || !user) {
    console.log("❌ Pas d'authentification");
    return;
  }

  try {
    const parsedUser = JSON.parse(user);
    console.log("✅ Données utilisateur valides:", parsedUser);

    // Déclencher plusieurs événements pour forcer la mise à jour
    const events = [
      "authStateChanged",
      "forceAuthUpdate",
      "userLogin",
      "storage",
    ];

    events.forEach((eventName) => {
      const event = new CustomEvent(eventName, {
        detail: {
          user: parsedUser,
          token: token,
          timestamp: Date.now(),
        },
      });

      console.log(`🔄 Déclenchement de l'événement ${eventName}...`);
      window.dispatchEvent(event);
    });

    // Attendre un peu puis recharger
    setTimeout(() => {
      console.log("🔄 Rechargement final...");
      window.location.reload();
    }, 2000);
  } catch (error) {
    console.error("❌ Erreur lors du forçage React:", error);
  }
}

// Fonction de correction automatique
function autoFixSync() {
  console.log("🔄 Correction automatique de la synchronisation...");

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
    console.log("✅ Authentification valide - Correction en cours...");

    // Étape 2: Forcer la synchronisation
    forceImmediateSync();
  } catch (error) {
    console.error("❌ Données corrompues:", error);
    localStorage.clear();
    window.location.href = "/auth";
  }
}

// Menu interactif
console.log("\n📋 Menu de correction immédiate:");
console.log("1. forceImmediateSync() - Synchronisation immédiate");
console.log("2. bypassSyncIssue() - Contournement du problème");
console.log("3. forceReactUpdate() - Forçage de la mise à jour React");
console.log("4. autoFixSync() - Correction automatique");
console.log("5. window.location.reload() - Rechargement simple");

// Exposer les fonctions globalement
window.forceImmediateSync = forceImmediateSync;
window.bypassSyncIssue = bypassSyncIssue;
window.forceReactUpdate = forceReactUpdate;
window.autoFixSync = autoFixSync;

console.log("\n✅ Fonctions de correction immédiate disponibles:");
console.log("- forceImmediateSync()");
console.log("- bypassSyncIssue()");
console.log("- forceReactUpdate()");
console.log("- autoFixSync()");

// Correction automatique si on est sur une page protégée
if (
  window.location.pathname.includes("/dashboard") ||
  window.location.pathname.includes("/profile") ||
  window.location.pathname.includes("/favorites")
) {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  if (token && user) {
    console.log("🚨 Page protégée avec authentification valide détectée");
    console.log("🔧 Correction automatique en cours...");
    setTimeout(() => {
      autoFixSync();
    }, 1000);
  }
}
