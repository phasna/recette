/**
 * Script de test pour l'API d'authentification
 * Teste la connexion avec email au lieu de username
 */

const testAuthAPI = async () => {
  console.log("🧪 Test de l'API d'authentification...");

  try {
    // 1. Créer un utilisateur de test
    console.log("\n1️⃣ Création d'un utilisateur de test...");
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
      console.log("✅ Utilisateur créé avec succès");
    } else {
      const error = await registerResponse.json();
      if (error.message?.includes("déjà")) {
        console.log("ℹ️ Utilisateur existe déjà (normal)");
      } else {
        console.error("❌ Erreur création:", error);
        return;
      }
    }

    // 2. Test de connexion avec email
    console.log("\n2️⃣ Test de connexion avec email...");
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
      console.log("✅ Connexion réussie avec email !");
      console.log("   - Token:", data.token ? "✅ Présent" : "❌ Manquant");
      console.log("   - User:", data.user ? "✅ Présent" : "❌ Manquant");
      console.log("   - Username:", data.user?.username);
      console.log("   - Email:", data.user?.email);
    } else {
      const error = await loginResponse.json();
      console.error("❌ Erreur de connexion:", error);
    }

    // 3. Test de connexion avec username (pour comparaison)
    console.log("\n3️⃣ Test de connexion avec username...");
    const loginResponse2 = await fetch(
      "http://localhost:3000/api/users/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: "testuser",
          password: "password123",
        }),
      }
    );

    if (loginResponse2.ok) {
      console.log("✅ Connexion réussie avec username aussi !");
    } else {
      const error = await loginResponse2.json();
      console.error("❌ Erreur de connexion avec username:", error);
    }

    console.log("\n🎉 Tests terminés !");
  } catch (error) {
    console.error("❌ Erreur générale:", error);
  }
};

// Exécuter le test
testAuthAPI();

// Exporter pour utilisation dans la console
if (typeof window !== "undefined") {
  window.testAuthAPI = testAuthAPI;
}
