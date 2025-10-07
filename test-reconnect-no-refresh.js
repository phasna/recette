/**
 * TEST DE RECONNEXION SANS RAFRAÎCHISSEMENT
 * À exécuter dans la console du navigateur (F12)
 *
 * Ce script teste que la reconnexion fonctionne directement sans rafraîchissement
 */

console.log("🧪 TEST DE RECONNEXION SANS RAFRAÎCHISSEMENT");

// Fonction pour tester la reconnexion complète
async function testReconnectNoRefresh() {
  console.log("🚀 Test de reconnexion sans rafraîchissement...");

  // Étape 1: Vérifier l'état initial
  console.log("\n--- ÉTAPE 1: État initial ---");
  const initialToken = localStorage.getItem("token");
  const initialUser = localStorage.getItem("user");

  console.log("📦 État initial:");
  console.log("- Token:", initialToken ? "✅ Présent" : "❌ Absent");
  console.log("- User:", initialUser ? "✅ Présent" : "❌ Absent");

  if (!initialToken || !initialUser) {
    console.log("❌ Pas d'authentification initiale - Test impossible");
    return false;
  }

  // Étape 2: Simuler la déconnexion
  console.log("\n--- ÉTAPE 2: Déconnexion ---");
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  // Déclencher l'événement de déconnexion
  const logoutEvent = new CustomEvent("authStateChanged", {
    detail: { user: null, token: null },
  });
  window.dispatchEvent(logoutEvent);

  console.log("✅ Déconnexion simulée");

  // Attendre un peu pour voir l'effet
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Étape 3: Simuler la reconnexion
  console.log("\n--- ÉTAPE 3: Reconnexion ---");
  try {
    const response = await fetch("http://localhost:3000/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "Phasna@gmail.com",
        password: "password123",
      }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("✅ Reconnexion réussie:", data);

      // Stocker les nouvelles données
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.data));

      // Déclencher l'événement de reconnexion
      const loginEvent = new CustomEvent("authStateChanged", {
        detail: { user: data.data, token: data.token },
      });
      window.dispatchEvent(loginEvent);

      console.log("✅ Événement de reconnexion déclenché");

      // Étape 4: Tester l'API immédiatement
      console.log("\n--- ÉTAPE 4: Test API immédiat ---");
      await new Promise((resolve) => setTimeout(resolve, 500));

      const apiResponse = await fetch("http://localhost:3000/api/favorites", {
        headers: {
          Authorization: `Bearer ${data.token}`,
          "Content-Type": "application/json",
        },
      });

      console.log(`📡 Status API: ${apiResponse.status}`);

      if (apiResponse.ok) {
        console.log("✅ API fonctionne immédiatement après reconnexion");
        return true;
      } else {
        console.log(`❌ API échouée: ${apiResponse.status}`);
        return false;
      }
    } else {
      console.log("❌ Échec de la reconnexion");
      return false;
    }
  } catch (error) {
    console.log(`❌ Erreur lors de la reconnexion: ${error.message}`);
    return false;
  }
}

// Fonction pour vérifier l'interface après reconnexion
function checkInterfaceAfterReconnect() {
  console.log("🖥️ Vérification de l'interface après reconnexion...");

  const checks = [
    { name: "Token présent", check: () => !!localStorage.getItem("token") },
    { name: "User présent", check: () => !!localStorage.getItem("user") },
    {
      name: "Pas d'erreur 403",
      check: () =>
        !document.querySelector(
          'h1:contains("Accès non autorisé"), h2:contains("Accès non autorisé")'
        ),
    },
    {
      name: "Page accessible",
      check: () => window.location.pathname.includes("/dashboard"),
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

// Fonction de test complet
async function runCompleteReconnectTest() {
  console.log("🚀 TEST COMPLET DE RECONNEXION SANS RAFRAÎCHISSEMENT...");

  try {
    // Test de reconnexion
    const reconnectTest = await testReconnectNoRefresh();

    // Vérification de l'interface
    const interfaceCheck = checkInterfaceAfterReconnect();

    // Résumé final
    console.log("\n🎉 RÉSUMÉ FINAL:");
    console.log(`✅ Test reconnexion: ${reconnectTest ? "PASSÉ" : "ÉCHOUÉ"}`);
    console.log(
      `✅ Vérification interface: ${interfaceCheck ? "PASSÉE" : "ÉCHOUÉE"}`
    );

    if (reconnectTest && interfaceCheck) {
      console.log("\n🎉 RECONNEXION SANS RAFRAÎCHISSEMENT FONCTIONNE !");
      console.log("✅ Plus besoin de rafraîchir la page");
      console.log("✅ Tout fonctionne directement après reconnexion");
      console.log("✅ Interface synchronisée automatiquement");
    } else {
      console.log("\n⚠️ Certains tests ont échoué");
      console.log("🔧 Vérifiez que les corrections sont appliquées");
    }

    return reconnectTest && interfaceCheck;
  } catch (error) {
    console.error("❌ Erreur lors du test:", error);
    return false;
  }
}

// Menu interactif
console.log("\n📋 Menu de test de reconnexion:");
console.log("1. runCompleteReconnectTest() - Test complet");
console.log("2. testReconnectNoRefresh() - Test reconnexion seulement");
console.log(
  "3. checkInterfaceAfterReconnect() - Vérification interface seulement"
);

// Exposer les fonctions
window.runCompleteReconnectTest = runCompleteReconnectTest;
window.testReconnectNoRefresh = testReconnectNoRefresh;
window.checkInterfaceAfterReconnect = checkInterfaceAfterReconnect;

console.log("\n✅ Fonctions de test disponibles:");
console.log("- runCompleteReconnectTest() - Test complet");
console.log("- testReconnectNoRefresh() - Test reconnexion");
console.log("- checkInterfaceAfterReconnect() - Vérification interface");

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
      runCompleteReconnectTest();
    }, 1000);
  }
}
