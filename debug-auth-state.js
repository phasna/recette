/**
 * Script de diagnostic pour l'état d'authentification
 * À exécuter dans la console du navigateur
 */

const debugAuthState = () => {
  console.log("🔍 Diagnostic de l'état d'authentification...");

  // 1. Vérifier le localStorage
  console.log("\n1️⃣ localStorage:");
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  console.log("   - Token:", token ? "✅ Présent" : "❌ Absent");
  console.log("   - User:", user ? "✅ Présent" : "❌ Absent");

  if (user) {
    try {
      const parsedUser = JSON.parse(user);
      console.log("   - User parsé:", parsedUser);
      console.log("   - Username:", parsedUser.username);
      console.log("   - Email:", parsedUser.email);
    } catch (error) {
      console.log("   - Erreur parsing user:", error.message);
    }
  }

  // 2. Vérifier l'URL actuelle
  console.log("\n2️⃣ URL actuelle:");
  console.log("   - URL:", window.location.href);
  console.log("   - Pathname:", window.location.pathname);

  // 3. Vérifier les composants React
  console.log("\n3️⃣ État de l'application:");

  // Vérifier si on est sur la page d'espace personnel
  if (window.location.pathname === "/profile") {
    console.log("   - Page: Espace personnel ✅");
  } else {
    console.log("   - Page: Autre ❌");
  }

  // 4. Test de l'API
  console.log("\n4️⃣ Test de l'API:");
  if (token) {
    fetch("http://localhost:3000/api/recipes", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log("   - API Status:", response.status);
        if (response.ok) {
          console.log("   - API: ✅ Accessible");
        } else {
          console.log("   - API: ❌ Erreur");
        }
      })
      .catch((error) => {
        console.log("   - API: ❌ Erreur de connexion");
        console.log("   - Erreur:", error.message);
      });
  } else {
    console.log("   - API: ❌ Pas de token");
  }

  // 5. Suggestions de correction
  console.log("\n5️⃣ Suggestions:");

  if (!token || !user) {
    console.log("   🔧 Pas d'authentification - aller sur /auth");
  } else if (window.location.pathname !== "/profile") {
    console.log("   🔧 Rediriger vers /profile");
    console.log("   🔧 Commande: window.location.href = '/profile'");
  } else {
    console.log("   ✅ Tout semble correct");
  }

  console.log("\n=== FIN DU DIAGNOSTIC ===");
};

// Exécuter le diagnostic
debugAuthState();

// Exporter pour utilisation manuelle
window.debugAuthState = debugAuthState;
