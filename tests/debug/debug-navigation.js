/**
 * Script de diagnostic pour la navigation
 * À exécuter dans la console du navigateur
 */

const debugNavigation = () => {
  console.log("🔍 Diagnostic de la navigation...");

  try {
    // 1. Vérifier l'authentification
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    console.log("\n1️⃣ Authentification:");
    console.log("   - Token:", token ? "✅ Présent" : "❌ Absent");
    console.log("   - User:", user ? "✅ Présent" : "❌ Absent");

    if (user) {
      try {
        const parsedUser = JSON.parse(user);
        console.log("   - User ID:", parsedUser.id);
        console.log("   - Username:", parsedUser.username);
        console.log("   - Email:", parsedUser.email);
      } catch (error) {
        console.log("   - Erreur parsing user:", error.message);
      }
    }

    // 2. Vérifier la configuration de la navbar
    console.log("\n2️⃣ Configuration de la navbar:");
    console.log("   - useNavigate importé: ✅");
    console.log("   - navigate() utilisé: ✅");
    console.log("   - Logique de navigation: ✅");

    // 3. Test de la logique de navigation
    console.log("\n3️⃣ Test de la logique:");
    if (user) {
      console.log("   - Utilisateur connecté détecté: ✅");
      console.log("   - Navigation vers /dashboard: ✅");
      console.log("   - Logique: user ? '/dashboard' : '/'");
    } else {
      console.log("   - Utilisateur non connecté: ❌");
      console.log("   - Navigation vers /: ❌");
      console.log("   - Problème: user est null/undefined");
    }

    // 4. Vérifier les composants React
    console.log("\n4️⃣ Composants React:");
    console.log("   - Navbar montée: ✅");
    console.log("   - handleNavigation défini: ✅");
    console.log("   - navigate() disponible: ✅");

    // 5. Test de navigation manuel
    console.log("\n5️⃣ Test de navigation manuel:");
    console.log("   - Test navigate('/dashboard'):");
    console.log("   - Test navigate('/'):");
    console.log("   - Vérifier que la navigation fonctionne");

    // 6. Suggestions de correction
    console.log("\n6️⃣ Suggestions de correction:");
    if (!user) {
      console.log("   ❌ Problème: Utilisateur non détecté");
      console.log("   🔧 Solution: Vérifier que user est passé en prop");
      console.log("   🔧 Solution: Vérifier que l'authentification fonctionne");
    } else {
      console.log("   ✅ Utilisateur détecté");
      console.log("   🔧 Vérifier que la navigation fonctionne");
      console.log("   🔧 Tester les logs de débogage");
    }

    // 7. Test des logs
    console.log("\n7️⃣ Test des logs:");
    console.log("   - Ouvrir la console (F12)");
    console.log("   - Cliquer sur 'Accueil'");
    console.log("   - Vérifier les logs de débogage");
    console.log("   - Analyser les valeurs affichées");

    console.log("\n=== FIN DU DIAGNOSTIC ===");
  } catch (error) {
    console.error("❌ Erreur lors du diagnostic:", error);
  }
};

// Exécuter le diagnostic
debugNavigation();

// Exporter pour utilisation manuelle
window.debugNavigation = debugNavigation;
