/**
 * Script de diagnostic complet
 * À exécuter dans la console du navigateur pour diagnostiquer les problèmes
 */

console.log("🔍 Diagnostic de l'application...");

const diagnostic = async () => {
  console.log("=== DIAGNOSTIC COMPLET ===");

  // 1. Vérifier l'état de l'authentification
  console.log("\n1️⃣ État de l'authentification:");
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  console.log("Token:", token ? "✅ Présent" : "❌ Manquant");
  console.log("User:", user ? "✅ Présent" : "❌ Manquant");

  if (user) {
    try {
      const userData = JSON.parse(user);
      console.log("Utilisateur:", userData);
    } catch (e) {
      console.error("❌ Erreur parsing user:", e);
    }
  }

  // 2. Tester la connexion au serveur
  console.log("\n2️⃣ Test de connexion au serveur:");
  try {
    const response = await fetch("http://localhost:3000/api/recipes");
    console.log(
      "Serveur:",
      response.status === 200 ? "✅ Accessible" : `❌ Erreur ${response.status}`
    );
  } catch (error) {
    console.error("❌ Serveur inaccessible:", error);
    console.log("💡 Vérifiez que le backend est démarré sur le port 3000");
    return;
  }

  // 3. Tester l'API d'authentification
  console.log("\n3️⃣ Test de l'API d'authentification:");
  try {
    // Test de connexion
    const loginResponse = await fetch("http://localhost:3000/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "test@example.com",
        password: "password123",
      }),
    });

    if (loginResponse.ok) {
      console.log("✅ API d'authentification fonctionne");
    } else {
      const error = await loginResponse.json();
      console.log("⚠️ API d'authentification:", error.message);
    }
  } catch (error) {
    console.error("❌ Erreur API d'authentification:", error);
  }

  // 4. Vérifier les composants React
  console.log("\n4️⃣ État des composants React:");
  const dashboard = document.querySelector('[data-testid="dashboard"]');
  const authButtons = document.querySelectorAll("button");
  console.log("Dashboard:", dashboard ? "✅ Trouvé" : "❌ Non trouvé");
  console.log(
    "Boutons d'auth:",
    authButtons.length > 0 ? "✅ Présents" : "❌ Manquants"
  );

  // 5. Suggestions de correction
  console.log("\n5️⃣ Suggestions de correction:");

  if (!token || !user) {
    console.log("🔧 Pour vous connecter automatiquement:");
    console.log(`
      // Copiez et collez ce code dans la console:
      fetch("http://localhost:3000/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: "testuser",
          email: "test@example.com",
          password: "password123",
          first_name: "Test",
          last_name: "User"
        })
      }).then(() => {
        return fetch("http://localhost:3000/api/users/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: "test@example.com",
            password: "password123"
          })
        });
      }).then(res => res.json()).then(data => {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        console.log("✅ Connecté ! Rechargez la page");
        location.reload();
      });
    `);
  }

  console.log("\n=== FIN DU DIAGNOSTIC ===");
};

// Exécuter le diagnostic
diagnostic();
