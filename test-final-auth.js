/**
 * Script de test final pour l'authentification
 * À exécuter dans la console du navigateur (F12)
 *
 * Ce script teste tous les aspects de l'authentification
 * et fournit des solutions automatiques
 */

console.log("🧪 Test final de l'authentification");

// Fonction pour tester l'état complet
function testCompleteAuthState() {
  console.log("1️⃣ Test complet de l'état d'authentification...");

  // Vérifier localStorage
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  console.log("📦 localStorage:");
  console.log("- Token:", token ? "✅ Présent" : "❌ Absent");
  console.log("- User:", user ? "✅ Présent" : "❌ Absent");

  // Vérifier la validité des données
  if (token && user) {
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
        console.log("✅ Authentification valide - Accès autorisé");
        return true;
      } else {
        console.log("🌐 Page publique détectée");
        console.log(
          "✅ Authentification valide - Peut accéder aux pages protégées"
        );
        return true;
      }
    } catch (error) {
      console.error("❌ Données corrompues:", error);
      return false;
    }
  } else {
    console.log("❌ Authentification manquante");
    return false;
  }
}

// Fonction pour tester la connexion au backend
async function testBackendConnection() {
  console.log("2️⃣ Test de connexion au backend...");

  try {
    const response = await fetch("http://localhost:3000/api/test");

    if (response.ok) {
      const data = await response.json();
      console.log("✅ Backend accessible:", data);
      return true;
    } else {
      console.error("❌ Backend inaccessible:", response.status);
      return false;
    }
  } catch (error) {
    console.error("❌ Erreur de connexion au backend:", error);
    return false;
  }
}

// Fonction pour tester l'authentification API
async function testAPIAuth() {
  console.log("3️⃣ Test de l'authentification API...");

  const token = localStorage.getItem("token");

  if (!token) {
    console.log("❌ Pas de token - Impossible de tester l'API");
    return false;
  }

  try {
    const response = await fetch("http://localhost:3000/api/users/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log("✅ API d'authentification fonctionne:", data);
      return true;
    } else {
      console.error("❌ API d'authentification échouée:", response.status);
      return false;
    }
  } catch (error) {
    console.error("❌ Erreur API d'authentification:", error);
    return false;
  }
}

// Fonction pour corriger automatiquement les problèmes
async function autoFixAuthIssues() {
  console.log("4️⃣ Correction automatique des problèmes...");

  // Étape 1: Vérifier l'état
  const authState = testCompleteAuthState();

  if (authState) {
    console.log("✅ État d'authentification valide");
    return true;
  }

  // Étape 2: Vérifier le backend
  const backendState = await testBackendConnection();

  if (!backendState) {
    console.log(
      "❌ Backend inaccessible - Vérifiez que le serveur est démarré"
    );
    return false;
  }

  // Étape 3: Reconnexion automatique
  console.log("🔄 Tentative de reconnexion automatique...");

  try {
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

      console.log("✅ Reconnexion automatique réussie");

      // Rediriger vers le dashboard
      window.location.href = "/dashboard";
      return true;
    } else {
      console.error("❌ Reconnexion automatique échouée");
      window.location.href = "/auth";
      return false;
    }
  } catch (error) {
    console.error("❌ Erreur lors de la reconnexion automatique:", error);
    window.location.href = "/auth";
    return false;
  }
}

// Fonction de test complet
async function runCompleteTest() {
  console.log("🔄 Test complet de l'authentification...");

  // Étape 1: Test de l'état
  console.log("\n--- Étape 1: Test de l'état ---");
  const authState = testCompleteAuthState();

  // Étape 2: Test du backend
  console.log("\n--- Étape 2: Test du backend ---");
  const backendState = await testBackendConnection();

  // Étape 3: Test de l'API
  console.log("\n--- Étape 3: Test de l'API ---");
  const apiState = await testAPIAuth();

  // Résultats
  console.log("\n📊 Résultats du test:");
  console.log("- État d'authentification:", authState ? "✅" : "❌");
  console.log("- Connexion backend:", backendState ? "✅" : "❌");
  console.log("- API d'authentification:", apiState ? "✅" : "❌");

  // Recommandations
  console.log("\n📋 Recommandations:");
  if (authState && backendState && apiState) {
    console.log("🎉 Tout fonctionne parfaitement !");
    console.log("✅ L'authentification est complètement fonctionnelle");
  } else if (!backendState) {
    console.log("🔧 Problème: Backend inaccessible");
    console.log("→ Démarrez le backend avec: cd backend && node server.js");
  } else if (!authState) {
    console.log("🔧 Problème: État d'authentification invalide");
    console.log("→ Utilisez autoFixAuthIssues() pour corriger automatiquement");
  } else if (!apiState) {
    console.log("🔧 Problème: API d'authentification");
    console.log("→ Vérifiez que le token est valide");
  }

  return authState && backendState && apiState;
}

// Menu interactif
console.log("\n📋 Menu de test final:");
console.log("1. testCompleteAuthState() - Test de l'état d'authentification");
console.log("2. testBackendConnection() - Test de connexion au backend");
console.log("3. testAPIAuth() - Test de l'API d'authentification");
console.log("4. autoFixAuthIssues() - Correction automatique");
console.log("5. runCompleteTest() - Test complet");

// Exposer les fonctions globalement
window.testCompleteAuthState = testCompleteAuthState;
window.testBackendConnection = testBackendConnection;
window.testAPIAuth = testAPIAuth;
window.autoFixAuthIssues = autoFixAuthIssues;
window.runCompleteTest = runCompleteTest;

console.log("\n✅ Fonctions de test final disponibles:");
console.log("- testCompleteAuthState()");
console.log("- testBackendConnection()");
console.log("- testAPIAuth()");
console.log("- autoFixAuthIssues()");
console.log("- runCompleteTest()");

// Test automatique si on est sur une page protégée
if (
  window.location.pathname.includes("/dashboard") ||
  window.location.pathname.includes("/profile") ||
  window.location.pathname.includes("/favorites")
) {
  console.log("🔍 Page protégée détectée - Test automatique...");
  setTimeout(() => {
    runCompleteTest();
  }, 1000);
}
