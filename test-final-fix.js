/**
 * Script de test final pour vérifier la correction
 * À exécuter dans la console du navigateur (F12)
 */

console.log("🧪 Test final de la correction");

// Fonction pour tester la correction
function testFinalFix() {
  console.log("1️⃣ Test de la correction finale...");

  // Vérifier l'état d'authentification
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  console.log("📦 État localStorage:");
  console.log("- Token:", token ? "✅ Présent" : "❌ Absent");
  console.log("- User:", user ? "✅ Présent" : "❌ Absent");

  if (!token || !user) {
    console.log("❌ Pas d'authentification - Test échoué");
    return false;
  }

  try {
    const parsedUser = JSON.parse(user);
    console.log("✅ Données utilisateur valides:", parsedUser);

    // Vérifier l'URL actuelle
    const currentPath = window.location.pathname;
    console.log("📍 URL actuelle:", currentPath);

    // Vérifier si on est sur une page protégée
    const isProtectedPage =
      currentPath.includes("/dashboard") ||
      currentPath.includes("/profile") ||
      currentPath.includes("/favorites");

    if (isProtectedPage) {
      console.log("🔒 Page protégée détectée");

      // Vérifier si l'interface affiche "Accès non autorisé"
      const unauthorizedElement = document.querySelector("h1, h2");
      if (
        unauthorizedElement &&
        unauthorizedElement.textContent.includes("Accès non autorisé")
      ) {
        console.log("❌ Interface affiche encore 'Accès non autorisé'");
        console.log("🔧 Correction automatique en cours...");

        // Forcer le rechargement
        window.location.reload();
        return false;
      } else {
        console.log(
          "✅ Interface correcte - Pas de message 'Accès non autorisé'"
        );
        return true;
      }
    } else {
      console.log("🌐 Page publique détectée");
      return true;
    }
  } catch (error) {
    console.error("❌ Données corrompues:", error);
    return false;
  }
}

// Fonction pour simuler le cycle déconnexion/reconnexion
async function testLogoutReconnectCycle() {
  console.log("2️⃣ Test du cycle déconnexion/reconnexion...");

  // Étape 1: Vérifier l'état initial
  console.log("\n--- Étape 1: État initial ---");
  const initialState = testFinalFix();

  if (!initialState) {
    console.log("❌ État initial invalide - Test échoué");
    return false;
  }

  // Étape 2: Simuler la déconnexion
  console.log("\n--- Étape 2: Déconnexion ---");
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  console.log("✅ Déconnexion simulée");

  // Étape 3: Simuler la reconnexion
  console.log("\n--- Étape 3: Reconnexion ---");
  try {
    const response = await fetch("http://localhost:3000/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "Phasna@gmail.com",
        password: "password123",
      }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.data));
      console.log("✅ Reconnexion simulée");

      // Étape 4: Vérifier l'état final
      console.log("\n--- Étape 4: Vérification finale ---");
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Rediriger vers le dashboard
      window.location.href = "/dashboard";

      return true;
    } else {
      console.error("❌ Échec de la reconnexion");
      return false;
    }
  } catch (error) {
    console.error("❌ Erreur lors de la reconnexion:", error);
    return false;
  }
}

// Fonction pour forcer la correction si nécessaire
function forceCorrection() {
  console.log("3️⃣ Forçage de la correction...");

  // Vérifier l'état
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

    // Forcer le rechargement avec cache-busting
    const url = new URL(window.location);
    url.searchParams.set("_fix", Date.now());
    window.location.href = url.toString();
  } catch (error) {
    console.error("❌ Données corrompues:", error);
    localStorage.clear();
    window.location.href = "/auth";
  }
}

// Menu interactif
console.log("\n📋 Menu de test final:");
console.log("1. testFinalFix() - Test de la correction");
console.log("2. testLogoutReconnectCycle() - Test du cycle complet");
console.log("3. forceCorrection() - Forçage de la correction");
console.log("4. window.location.reload() - Rechargement simple");

// Exposer les fonctions globalement
window.testFinalFix = testFinalFix;
window.testLogoutReconnectCycle = testLogoutReconnectCycle;
window.forceCorrection = forceCorrection;

console.log("\n✅ Fonctions de test final disponibles:");
console.log("- testFinalFix()");
console.log("- testLogoutReconnectCycle()");
console.log("- forceCorrection()");

// Test automatique si on est sur une page protégée
if (
  window.location.pathname.includes("/dashboard") ||
  window.location.pathname.includes("/profile") ||
  window.location.pathname.includes("/favorites")
) {
  console.log("🔍 Page protégée détectée - Test automatique...");
  setTimeout(() => {
    testFinalFix();
  }, 1000);
}
