/**
 * Diagnostic rapide de l'état d'authentification
 * À exécuter dans la console du navigateur (F12)
 */

console.log("🔍 Diagnostic de l'état d'authentification");

// Vérifier localStorage
const token = localStorage.getItem("token");
const user = localStorage.getItem("user");

console.log("📦 localStorage:");
console.log("- Token:", token ? "✅ Présent" : "❌ Absent");
console.log("- User:", user ? "✅ Présent" : "❌ Absent");

// Vérifier le parsing des données utilisateur
if (user) {
  try {
    const parsedUser = JSON.parse(user);
    console.log("👤 Données utilisateur:", parsedUser);
  } catch (error) {
    console.error("❌ Erreur de parsing:", error);
    console.log("🧹 Nettoyage des données corrompues...");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }
}

// Vérifier l'URL actuelle
console.log("🌐 URL actuelle:", window.location.pathname);

// Vérifier l'état de l'application React
console.log("⚛️ État React:");
console.log("- window.React:", typeof window.React);

// Solutions automatiques
console.log("\n🛠️ Solutions disponibles:");

if (!token || !user) {
  console.log("1️⃣ Pas d'authentification détectée");
  console.log("   → Redirection vers /auth");
  window.location.href = "/auth";
} else {
  console.log("2️⃣ Authentification détectée");
  console.log("   → Rechargement de la page");
  window.location.reload();
}

console.log("\n📋 Actions recommandées:");
console.log("1. Vérifier que le backend est démarré (port 3000)");
console.log("2. Tester la connexion sur /auth");
console.log("3. Vérifier les logs de la console pour d'autres erreurs");
