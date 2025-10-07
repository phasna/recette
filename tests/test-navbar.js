/**
 * Script de test pour la navbar
 * À exécuter dans la console du navigateur
 */

console.log("🧪 Test de la navbar...");

// Test des événements
const testEvents = () => {
  console.log("📡 Test des événements personnalisés...");

  // Test événement connexion
  console.log("🔐 Déclenchement de l'événement openLoginForm...");
  const loginEvent = new CustomEvent("openLoginForm");
  window.dispatchEvent(loginEvent);

  setTimeout(() => {
    console.log("📝 Déclenchement de l'événement openRegisterForm...");
    const registerEvent = new CustomEvent("openRegisterForm");
    window.dispatchEvent(registerEvent);
  }, 2000);
};

// Test de connexion automatique
const testAutoConnection = async () => {
  console.log("🧪 Test de connexion automatique...");

  try {
    // Créer un utilisateur de test
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
      console.log("✅ Utilisateur créé");
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
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      console.log("✅ Connexion réussie !");
      alert("✅ Connexion automatique réussie ! Rechargez la page.");
      window.location.reload();
    } else {
      const error = await loginResponse.json();
      console.error("❌ Erreur de connexion:", error);
    }
  } catch (error) {
    console.error("❌ Erreur:", error);
  }
};

// Menu de test
console.log(`
🧪 MENU DE TEST NAVBAR
=====================

1. Test des événements (formulaires)
2. Test de connexion automatique
3. Vérifier l'état actuel

Choisissez une option:
- testEvents() pour tester les formulaires
- testAutoConnection() pour connexion automatique
- localStorage.getItem('user') pour vérifier l'état
`);

// Exporter les fonctions
window.testEvents = testEvents;
window.testAutoConnection = testAutoConnection;
