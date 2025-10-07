/**
 * Script de correction automatique de l'état d'authentification
 * À exécuter dans la console du navigateur (F12)
 */

console.log("🔧 Correction automatique de l'état d'authentification");

// Fonction pour nettoyer et rediriger
function cleanAndRedirect() {
  console.log("🧹 Nettoyage du localStorage...");
  localStorage.clear();
  console.log("🔄 Redirection vers la page de connexion...");
  window.location.href = "/auth";
}

// Fonction pour forcer la reconnexion
function forceReconnection() {
  console.log("🔄 Rechargement de la page...");
  window.location.reload();
}

// Vérifier l'état actuel
const token = localStorage.getItem("token");
const user = localStorage.getItem("user");

console.log("📊 État actuel:");
console.log("- Token:", token ? "✅" : "❌");
console.log("- User:", user ? "✅" : "❌");

if (!token || !user) {
  console.log("❌ Authentification manquante");
  cleanAndRedirect();
} else {
  // Vérifier si les données sont valides
  try {
    const parsedUser = JSON.parse(user);
    console.log("✅ Données utilisateur valides:", parsedUser);

    // Forcer le rechargement pour synchroniser l'état
    console.log("🔄 Synchronisation de l'état...");
    forceReconnection();
  } catch (error) {
    console.error("❌ Données corrompues:", error);
    cleanAndRedirect();
  }
}

console.log("\n📋 Si le problème persiste:");
console.log("1. Vérifiez que le backend est démarré");
console.log("2. Testez la connexion sur /auth");
console.log("3. Vérifiez les logs de la console");
