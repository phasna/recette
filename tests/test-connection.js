/**
 * Script de test de connexion simple
 * À exécuter dans la console du navigateur
 */

console.log("🧪 Test de connexion rapide...");

// Test de connexion directe
const testConnection = async () => {
  try {
    console.log("📡 Test de connexion au serveur...");

    // 1. Tester la connexion au serveur
    const response = await fetch("http://localhost:3000/api/recipes");
    console.log("✅ Serveur accessible:", response.status);

    // 2. Créer un utilisateur de test
    console.log("👤 Création d'un utilisateur de test...");
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
      if (error.message?.includes("déjà")) {
        console.log("ℹ️ Utilisateur déjà existant");
      } else {
        console.error("❌ Erreur création:", error);
        return;
      }
    }

    // 3. Se connecter
    console.log("🔐 Connexion...");
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
      console.log("✅ Connexion réussie !");

      // Stocker les données
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      console.log("💾 Données stockées");
      console.log("🔄 Rechargez la page pour voir les changements");

      // Afficher un message de succès
      alert(
        "✅ Connexion réussie ! Rechargez la page pour voir les changements."
      );
    } else {
      const error = await loginResponse.json();
      console.error("❌ Erreur de connexion:", error);
    }
  } catch (error) {
    console.error("❌ Erreur:", error);
    alert(
      "❌ Erreur de connexion au serveur. Vérifiez que le backend est démarré."
    );
  }
};

// Exécuter le test
testConnection();
