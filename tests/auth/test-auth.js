/**
 * Script de test pour l'authentification
 * Crée un utilisateur de test et vérifie la connexion
 */

const testAuth = async () => {
  console.log("🧪 Test d'authentification...");

  try {
    // 1. Créer un utilisateur de test
    console.log("📝 Création d'un utilisateur de test...");
    const registerResponse = await fetch(
      "http://localhost:3000/api/users/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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
      const errorData = await registerResponse.json();
      if (errorData.message?.includes("déjà")) {
        console.log("ℹ️ Utilisateur déjà existant, continuons...");
      } else {
        console.error("❌ Erreur lors de la création:", errorData);
        return;
      }
    }

    // 2. Se connecter
    console.log("🔐 Connexion...");
    const loginResponse = await fetch("http://localhost:3000/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "test@example.com",
        password: "password123",
      }),
    });

    if (loginResponse.ok) {
      const loginData = await loginResponse.json();
      console.log("✅ Connexion réussie !");
      console.log("👤 Utilisateur:", loginData.user);
      console.log("🔑 Token:", loginData.token ? "Présent" : "Manquant");

      // Stocker dans localStorage pour le test
      localStorage.setItem("token", loginData.token);
      localStorage.setItem("user", JSON.stringify(loginData.user));

      console.log("💾 Données stockées dans localStorage");
      console.log("🔄 Rechargez la page pour voir les changements");

      return loginData;
    } else {
      const errorData = await loginResponse.json();
      console.error("❌ Erreur de connexion:", errorData);
    }
  } catch (error) {
    console.error("❌ Erreur lors du test:", error);
  }
};

// Exécuter le test si on est dans le navigateur
if (typeof window !== "undefined") {
  console.log("🚀 Lancement du test d'authentification...");
  testAuth();
} else {
  console.log("Ce script doit être exécuté dans le navigateur");
}
