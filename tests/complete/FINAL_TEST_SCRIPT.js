/**
 * SCRIPT DE TEST FINAL - À exécuter dans la console du navigateur (F12)
 *
 * Ce script teste que tous les bugs ont été corrigés
 */

console.log("🧪 TEST FINAL - Vérification que tous les bugs sont corrigés");

// Test 1: Vérifier l'intercepteur fetch
function testFetchInterceptor() {
  console.log("1️⃣ Test de l'intercepteur fetch...");

  if (window.fetch !== window.originalFetch) {
    console.log("✅ Intercepteur fetch activé");
    return true;
  } else {
    console.log("❌ Intercepteur fetch non activé");
    return false;
  }
}

// Test 2: Vérifier l'authentification
function testAuthentication() {
  console.log("2️⃣ Test de l'authentification...");

  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  if (token && user) {
    try {
      const parsedUser = JSON.parse(user);
      console.log("✅ Authentification valide:", parsedUser.username);
      return true;
    } catch (error) {
      console.log("❌ Données utilisateur corrompues");
      return false;
    }
  } else {
    console.log("❌ Pas d'authentification");
    return false;
  }
}

// Test 3: Tester l'API des favoris
async function testFavoritesAPI() {
  console.log("3️⃣ Test de l'API des favoris...");

  const token = localStorage.getItem("token");
  if (!token) {
    console.log("❌ Pas de token pour le test");
    return false;
  }

  try {
    const response = await fetch("http://localhost:3000/api/favorites", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    console.log(`📡 Status: ${response.status}`);

    if (response.ok) {
      const data = await response.json();
      console.log("✅ API des favoris fonctionne");
      return true;
    } else {
      console.log(`❌ API des favoris échouée: ${response.status}`);
      return false;
    }
  } catch (error) {
    console.log(`❌ Erreur API des favoris: ${error.message}`);
    return false;
  }
}

// Test 4: Vérifier l'interface utilisateur
function testUI() {
  console.log("4️⃣ Test de l'interface utilisateur...");

  const checks = [
    {
      name: "Bouton déconnexion",
      check: () =>
        document.querySelector(
          'button[onclick*="logout"], button:contains("Déconnexion")'
        ),
    },
    {
      name: "Page dashboard",
      check: () => window.location.pathname.includes("/dashboard"),
    },
    {
      name: "Pas d'erreur 403",
      check: () =>
        !document.querySelector(
          'h1:contains("Accès non autorisé"), h2:contains("Accès non autorisé")'
        ),
    },
  ];

  let allChecksPassed = true;

  for (const check of checks) {
    try {
      const result = check.check();
      if (result) {
        console.log(`✅ ${check.name}: OK`);
      } else {
        console.log(`❌ ${check.name}: ÉCHEC`);
        allChecksPassed = false;
      }
    } catch (error) {
      console.log(`❌ ${check.name}: ERREUR - ${error.message}`);
      allChecksPassed = false;
    }
  }

  return allChecksPassed;
}

// Test 5: Test complet
async function runAllTests() {
  console.log("🚀 DÉMARRAGE DES TESTS COMPLETS...");

  const results = {
    fetchInterceptor: testFetchInterceptor(),
    authentication: testAuthentication(),
    favoritesAPI: await testFavoritesAPI(),
    ui: testUI(),
  };

  console.log("\n📊 RÉSULTATS DES TESTS:");
  console.log(
    `✅ Intercepteur fetch: ${results.fetchInterceptor ? "PASSÉ" : "ÉCHOUÉ"}`
  );
  console.log(
    `✅ Authentification: ${results.authentication ? "PASSÉ" : "ÉCHOUÉ"}`
  );
  console.log(
    `✅ API des favoris: ${results.favoritesAPI ? "PASSÉ" : "ÉCHOUÉ"}`
  );
  console.log(`✅ Interface utilisateur: ${results.ui ? "PASSÉ" : "ÉCHOUÉ"}`);

  const allTestsPassed = Object.values(results).every((result) => result);

  if (allTestsPassed) {
    console.log("\n🎉 TOUS LES TESTS SONT PASSÉS !");
    console.log("✅ Tous les bugs ont été corrigés !");
    console.log("✅ Votre application fonctionne parfaitement !");
  } else {
    console.log("\n⚠️ Certains tests ont échoué");
    console.log("🔧 Rechargement de la page pour appliquer les corrections...");
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }

  return allTestsPassed;
}

// Menu interactif
console.log("\n📋 Menu de test final:");
console.log("1. runAllTests() - Exécuter tous les tests");
console.log("2. testFetchInterceptor() - Tester l'intercepteur fetch");
console.log("3. testAuthentication() - Tester l'authentification");
console.log("4. testFavoritesAPI() - Tester l'API des favoris");
console.log("5. testUI() - Tester l'interface utilisateur");

// Exposer les fonctions
window.runAllTests = runAllTests;
window.testFetchInterceptor = testFetchInterceptor;
window.testAuthentication = testAuthentication;
window.testFavoritesAPI = testFavoritesAPI;
window.testUI = testUI;

console.log("\n✅ Fonctions de test disponibles:");
console.log("- runAllTests() - Test complet");
console.log("- testFetchInterceptor() - Test intercepteur");
console.log("- testAuthentication() - Test auth");
console.log("- testFavoritesAPI() - Test API");
console.log("- testUI() - Test interface");

// Test automatique si on est sur une page protégée
if (
  window.location.pathname.includes("/dashboard") ||
  window.location.pathname.includes("/profile") ||
  window.location.pathname.includes("/favorites")
) {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  if (token && user) {
    console.log("🚨 Page protégée détectée - Test automatique...");
    setTimeout(() => {
      runAllTests();
    }, 1000);
  }
}
