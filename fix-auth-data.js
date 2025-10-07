/**
 * Script pour corriger les données d'authentification
 * À exécuter dans la console du navigateur
 */

const fixAuthData = () => {
  console.log("🔧 Correction des données d'authentification...");

  // 1. Nettoyer le localStorage
  console.log("\n1️⃣ Nettoyage du localStorage...");
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  console.log("✅ localStorage nettoyé");

  // 2. Tester la connexion
  console.log("\n2️⃣ Test de connexion...");

  fetch("http://localhost:3000/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: "test@example.com",
      password: "password123",
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("✅ Connexion réussie:", data);

      // 3. Stocker correctement
      console.log("\n3️⃣ Stockage correct des données...");
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.data));
      console.log("✅ Données stockées correctement");

      // 4. Vérifier le stockage
      console.log("\n4️⃣ Vérification du stockage...");
      const storedUser = localStorage.getItem("user");
      const storedToken = localStorage.getItem("token");

      console.log("   - Token:", storedToken ? "✅ Présent" : "❌ Absent");
      console.log("   - User:", storedUser ? "✅ Présent" : "❌ Absent");

      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          console.log("   - User parsé:", parsedUser);
          console.log("   - Username:", parsedUser.username);
          console.log("   - Email:", parsedUser.email);
        } catch (error) {
          console.log("   - Erreur parsing:", error.message);
        }
      }

      // 5. Rediriger vers l'espace personnel
      console.log("\n5️⃣ Redirection vers l'espace personnel...");
      setTimeout(() => {
        window.location.href = "/profile";
      }, 2000);
    })
    .catch((error) => {
      console.error("❌ Erreur de connexion:", error);
      console.log("🔧 Vérifiez que le backend est démarré sur le port 3000");
    });
};

// Exécuter automatiquement
fixAuthData();

// Exporter pour utilisation manuelle
window.fixAuthData = fixAuthData;
