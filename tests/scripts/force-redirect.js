/**
 * Script pour forcer la redirection vers l'espace personnel
 * À exécuter dans la console du navigateur
 */

const forceRedirectToProfile = () => {
  console.log("🔄 Forçage de la redirection vers l'espace personnel...");

  // Vérifier l'authentification
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  if (!token || !user) {
    console.log("❌ Pas d'authentification - redirection vers /auth");
    window.location.href = "/auth";
    return;
  }

  console.log("✅ Authentification trouvée");
  console.log("🔄 Redirection vers /profile...");

  // Rediriger vers l'espace personnel
  window.location.href = "/profile";
};

// Exécuter automatiquement
forceRedirectToProfile();

// Exporter pour utilisation manuelle
window.forceRedirectToProfile = forceRedirectToProfile;
