/**
 * Script pour nettoyer le localStorage
 * À exécuter dans la console du navigateur
 */

const clearStorage = () => {
  console.log("🧹 Nettoyage du localStorage...");

  // Vérifier ce qui est stocké
  console.log("Token:", localStorage.getItem("token"));
  console.log("User:", localStorage.getItem("user"));

  // Nettoyer
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  console.log("✅ localStorage nettoyé !");
  console.log("🔄 Rechargez la page pour continuer");
};

// Exécuter automatiquement
clearStorage();

// Exporter pour utilisation manuelle
window.clearStorage = clearStorage;
