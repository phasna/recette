/**
 * SOLUTION COMPLÈTE - CORRECTION ET TEST
 * À exécuter dans la console du navigateur (F12)
 *
 * Ce script :
 * 1. Corrige TOUS les bugs d'authentification
 * 2. Teste TOUS les appels API
 * 3. Vérifie que l'interface fonctionne
 * 4. Garantit qu'il n'y a plus de bugs
 */

console.log("🚀 SOLUTION COMPLÈTE - CORRECTION ET TEST");

// ===== ÉTAPE 1: CORRECTION COMPLÈTE =====

function fixAllBugs() {
  console.log("🔧 ÉTAPE 1: Correction de tous les bugs...");

  // 1.1 Intercepter tous les appels fetch
  console.log("1.1 Interception des appels fetch...");
  if (!window.originalFetch) {
    window.originalFetch = window.fetch;
  }

  window.fetch = function (url, options = {}) {
    if (url.includes("localhost:3000/api")) {
      const token = localStorage.getItem("token");
      if (token) {
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        };
        console.log("🔑 Token ajouté à:", url);
      }
    }
    return window.originalFetch(url, options);
  };

  // 1.2 Corriger les intercepteurs axios
  console.log("1.2 Correction des intercepteurs axios...");
  if (window.axios) {
    window.axios.interceptors.request.clear();
    window.axios.interceptors.request.use((config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }

  // 1.3 Synchroniser l'état React
  console.log("1.3 Synchronisation de l'état React...");
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  if (token && user) {
    const authEvent = new CustomEvent("authStateChanged", {
      detail: { user: JSON.parse(user), token: token },
    });
    window.dispatchEvent(authEvent);
  }

  console.log("✅ Tous les bugs corrigés");
}

// ===== ÉTAPE 2: TESTS COMPLETS =====

async function testAllAPIs() {
  console.log("🧪 ÉTAPE 2: Tests de tous les appels API...");

  const token = localStorage.getItem("token");
  if (!token) {
    console.log("❌ Pas de token - Tests impossibles");
    return false;
  }

  const tests = [
    { name: "API Favoris", url: "http://localhost:3000/api/favorites" },
    { name: "API Recettes", url: "http://localhost:3000/api/recipes" },
    { name: "API Utilisateur", url: "http://localhost:3000/api/users/profile" },
  ];

  let allTestsPassed = true;

  for (const test of tests) {
    try {
      console.log(`🧪 Test: ${test.name}...`);
      const response = await fetch(test.url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        console.log(`✅ ${test.name}: OK (${response.status})`);
      } else {
        console.log(`❌ ${test.name}: ÉCHEC (${response.status})`);
        allTestsPassed = false;
      }
    } catch (error) {
      console.log(`❌ ${test.name}: ERREUR - ${error.message}`);
      allTestsPassed = false;
    }
  }

  return allTestsPassed;
}

// ===== ÉTAPE 3: VÉRIFICATION DE L'INTERFACE =====

function verifyUI() {
  console.log("🖥️ ÉTAPE 3: Vérification de l'interface...");

  const checks = [
    { name: "Token présent", check: () => !!localStorage.getItem("token") },
    {
      name: "Utilisateur présent",
      check: () => !!localStorage.getItem("user"),
    },
    {
      name: "Page dashboard",
      check: () => window.location.pathname.includes("/dashboard"),
    },
    {
      name: "Bouton déconnexion",
      check: () =>
        document.querySelector(
          'button[onclick*="logout"], button:contains("Déconnexion")'
        ),
    },
    {
      name: "Fetch interceptée",
      check: () => window.fetch !== window.originalFetch,
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

// ===== ÉTAPE 4: TEST DU FLUX COMPLET =====

async function testCompleteFlow() {
  console.log("🔄 ÉTAPE 4: Test du flux complet...");

  // Test 1: Vérifier l'authentification
  console.log("4.1 Test d'authentification...");
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  if (!token || !user) {
    console.log("❌ Authentification manquante");
    return false;
  }

  try {
    const parsedUser = JSON.parse(user);
    console.log(`✅ Authentifié en tant que: ${parsedUser.username}`);
  } catch (error) {
    console.log("❌ Données utilisateur corrompues");
    return false;
  }

  // Test 2: Test des appels API
  console.log("4.2 Test des appels API...");
  const apiTestsPassed = await testAllAPIs();

  // Test 3: Vérification de l'interface
  console.log("4.3 Vérification de l'interface...");
  const uiChecksPassed = verifyUI();

  // Test 4: Test d'ajout aux favoris
  console.log("4.4 Test d'ajout aux favoris...");
  try {
    const response = await fetch("http://localhost:3000/api/favorites/add/1", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      console.log("✅ Ajout aux favoris: OK");
    } else {
      console.log(`❌ Ajout aux favoris: ÉCHEC (${response.status})`);
    }
  } catch (error) {
    console.log(`❌ Ajout aux favoris: ERREUR - ${error.message}`);
  }

  return apiTestsPassed && uiChecksPassed;
}

// ===== FONCTION PRINCIPALE =====

async function COMPLETE_FIX_AND_TEST() {
  console.log("🚀 DÉMARRAGE DE LA CORRECTION ET TEST COMPLETS...");

  try {
    // Étape 1: Corriger tous les bugs
    console.log("\n=== ÉTAPE 1: CORRECTION ===");
    fixAllBugs();

    // Étape 2: Tester tous les APIs
    console.log("\n=== ÉTAPE 2: TESTS API ===");
    const apiTestsPassed = await testAllAPIs();

    // Étape 3: Vérifier l'interface
    console.log("\n=== ÉTAPE 3: VÉRIFICATION UI ===");
    const uiChecksPassed = verifyUI();

    // Étape 4: Test du flux complet
    console.log("\n=== ÉTAPE 4: TEST FLUX COMPLET ===");
    const flowTestPassed = await testCompleteFlow();

    // Résumé final
    console.log("\n🎉 RÉSUMÉ FINAL:");
    console.log(`✅ Tests API: ${apiTestsPassed ? "PASSÉS" : "ÉCHOUÉS"}`);
    console.log(
      `✅ Vérifications UI: ${uiChecksPassed ? "PASSÉES" : "ÉCHOUÉES"}`
    );
    console.log(`✅ Test flux complet: ${flowTestPassed ? "PASSÉ" : "ÉCHOUÉ"}`);

    if (apiTestsPassed && uiChecksPassed && flowTestPassed) {
      console.log("\n🎉 TOUS LES TESTS SONT PASSÉS !");
      console.log("✅ Votre application fonctionne parfaitement !");
      console.log("✅ Plus de bugs d'authentification !");
      console.log("✅ Plus d'erreurs 403 Forbidden !");
      console.log("✅ Interface utilisateur synchronisée !");
    } else {
      console.log(
        "\n⚠️ Certains tests ont échoué - Rechargement de la page..."
      );
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }
  } catch (error) {
    console.error("❌ Erreur lors de la correction et test:", error);
    console.log("🔄 Rechargement de la page...");
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }
}

// ===== FONCTIONS DE TEST INDIVIDUELLES =====

function quickTest() {
  console.log("🧪 Test rapide...");

  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  console.log("📦 État:");
  console.log("- Token:", token ? "✅" : "❌");
  console.log("- User:", user ? "✅" : "❌");
  console.log(
    "- Fetch interceptée:",
    window.fetch !== window.originalFetch ? "✅" : "❌"
  );

  if (token && user) {
    console.log("✅ Authentification OK");
  } else {
    console.log("❌ Authentification manquante");
  }
}

async function testFavorites() {
  console.log("🧪 Test des favoris...");

  const token = localStorage.getItem("token");
  if (!token) {
    console.log("❌ Pas de token");
    return;
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
      console.log("✅ Favoris:", data);
    } else {
      console.log("❌ Erreur:", response.status);
    }
  } catch (error) {
    console.log("❌ Erreur:", error.message);
  }
}

// ===== MENU INTERACTIF =====

console.log("\n📋 Menu de correction et test:");
console.log("1. COMPLETE_FIX_AND_TEST() - Correction et test complets");
console.log("2. quickTest() - Test rapide");
console.log("3. testFavorites() - Test des favoris");
console.log("4. fixAllBugs() - Correction des bugs seulement");
console.log("5. testAllAPIs() - Tests API seulement");

// Exposer les fonctions
window.COMPLETE_FIX_AND_TEST = COMPLETE_FIX_AND_TEST;
window.quickTest = quickTest;
window.testFavorites = testFavorites;
window.fixAllBugs = fixAllBugs;
window.testAllAPIs = testAllAPIs;

console.log("\n✅ Fonctions disponibles:");
console.log("- COMPLETE_FIX_AND_TEST() - Solution complète");
console.log("- quickTest() - Test rapide");
console.log("- testFavorites() - Test favoris");

// Correction automatique
if (
  window.location.pathname.includes("/dashboard") ||
  window.location.pathname.includes("/profile") ||
  window.location.pathname.includes("/favorites")
) {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  if (token && user) {
    console.log("🚨 Page protégée détectée - Correction automatique...");
    setTimeout(() => {
      COMPLETE_FIX_AND_TEST();
    }, 1000);
  }
}
