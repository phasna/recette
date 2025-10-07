/**
 * Script de test pour le problème de déconnexion/reconnexion
 * À exécuter dans la console du navigateur (F12)
 */

console.log("🧪 Test du problème de déconnexion/reconnexion");

// Fonction pour simuler une déconnexion
function simulateLogout() {
  console.log("1️⃣ Simulation de la déconnexion...");

  // Nettoyer localStorage
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  console.log("✅ localStorage nettoyé");
  console.log("Token:", localStorage.getItem("token"));
  console.log("User:", localStorage.getItem("user"));

  // Rediriger vers l'accueil
  window.location.href = "/";
}

// Fonction pour simuler une reconnexion
async function simulateReconnection() {
  console.log("2️⃣ Simulation de la reconnexion...");

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
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.data));

      console.log("✅ Connexion réussie");
      console.log("Token stocké:", !!localStorage.getItem("token"));
      console.log("User stocké:", !!localStorage.getItem("user"));

      // Rediriger vers le dashboard
      window.location.href = "/dashboard";
    } else {
      console.error("❌ Échec de la connexion");
    }
  } catch (error) {
    console.error("❌ Erreur:", error);
  }
}

// Fonction pour vérifier l'état d'authentification
function checkAuthState() {
  console.log("3️⃣ Vérification de l'état d'authentification...");

  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  console.log("État actuel:");
  console.log("- Token:", token ? "✅ Présent" : "❌ Absent");
  console.log("- User:", user ? "✅ Présent" : "❌ Absent");

  if (token && user) {
    try {
      const parsedUser = JSON.parse(user);
      console.log("✅ Données utilisateur valides:", parsedUser);
      return true;
    } catch (error) {
      console.error("❌ Données corrompues:", error);
      return false;
    }
  }

  return false;
}

// Fonction pour forcer la synchronisation
function forceSync() {
  console.log("4️⃣ Forçage de la synchronisation...");

  // Recharger la page pour forcer la synchronisation
  window.location.reload();
}

// Menu interactif
console.log("\n📋 Menu de test:");
console.log("1. simulateLogout() - Simuler une déconnexion");
console.log("2. simulateReconnection() - Simuler une reconnexion");
console.log("3. checkAuthState() - Vérifier l'état d'authentification");
console.log("4. forceSync() - Forcer la synchronisation");
console.log("5. testFullCycle() - Test complet du cycle");

// Fonction de test complet
async function testFullCycle() {
  console.log("🔄 Test complet du cycle déconnexion/reconnexion...");

  // Étape 1: Vérifier l'état initial
  console.log("\n--- Étape 1: État initial ---");
  const initialState = checkAuthState();

  // Étape 2: Déconnexion
  console.log("\n--- Étape 2: Déconnexion ---");
  simulateLogout();

  // Attendre un peu
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Étape 3: Reconnexion
  console.log("\n--- Étape 3: Reconnexion ---");
  await simulateReconnection();

  // Étape 4: Vérification finale
  console.log("\n--- Étape 4: Vérification finale ---");
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const finalState = checkAuthState();

  console.log("\n📊 Résultats:");
  console.log(
    "- État initial:",
    initialState ? "✅ Connecté" : "❌ Déconnecté"
  );
  console.log("- État final:", finalState ? "✅ Connecté" : "❌ Déconnecté");

  if (initialState && finalState) {
    console.log(
      "🎉 Test réussi ! Le cycle déconnexion/reconnexion fonctionne."
    );
  } else {
    console.log(
      "❌ Test échoué ! Problème dans le cycle déconnexion/reconnexion."
    );
  }
}

// Exposer les fonctions globalement
window.simulateLogout = simulateLogout;
window.simulateReconnection = simulateReconnection;
window.checkAuthState = checkAuthState;
window.forceSync = forceSync;
window.testFullCycle = testFullCycle;

console.log("\n✅ Fonctions disponibles dans la console:");
console.log("- simulateLogout()");
console.log("- simulateReconnection()");
console.log("- checkAuthState()");
console.log("- forceSync()");
console.log("- testFullCycle()");
