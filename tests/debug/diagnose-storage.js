/**
 * Script de diagnostic pour le localStorage
 * À exécuter dans la console du navigateur
 */

const diagnoseStorage = () => {
  console.log("🔍 Diagnostic du localStorage...");

  // Vérifier le token
  const token = localStorage.getItem("token");
  console.log("1️⃣ Token:", token ? "✅ Présent" : "❌ Absent");
  if (token) {
    console.log("   - Type:", typeof token);
    console.log("   - Longueur:", token.length);
    console.log("   - Commence par:", token.substring(0, 20) + "...");
  }

  // Vérifier l'utilisateur
  const user = localStorage.getItem("user");
  console.log("2️⃣ User:", user ? "✅ Présent" : "❌ Absent");
  if (user) {
    console.log("   - Type:", typeof user);
    console.log("   - Longueur:", user.length);
    console.log("   - Commence par:", user.substring(0, 50) + "...");

    // Tester le parsing
    try {
      const parsedUser = JSON.parse(user);
      console.log("   - Parsing: ✅ Réussi");
      console.log("   - Données:", parsedUser);
    } catch (error) {
      console.log("   - Parsing: ❌ Échec");
      console.log("   - Erreur:", error.message);
      console.log("   - Données corrompues:", user);
    }
  }

  // Vérifier d'autres clés
  console.log("3️⃣ Autres clés dans localStorage:");
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);
    console.log(
      `   - ${key}: ${value ? "✅" : "❌"} (${value?.length || 0} chars)`
    );
  }

  // Suggestions de correction
  console.log("\n4️⃣ Suggestions:");
  if (!token && !user) {
    console.log("   ✅ localStorage propre - pas de problème");
  } else if (token && !user) {
    console.log("   🔧 Token sans utilisateur - nettoyer le token");
  } else if (!token && user) {
    console.log("   🔧 Utilisateur sans token - nettoyer l'utilisateur");
  } else {
    try {
      JSON.parse(user);
      console.log("   ✅ Données valides - pas de problème");
    } catch (error) {
      console.log("   🔧 Données corrompues - nettoyer le localStorage");
    }
  }

  console.log("\n=== FIN DU DIAGNOSTIC ===");
};

// Exécuter le diagnostic
diagnoseStorage();

// Exporter pour utilisation manuelle
window.diagnoseStorage = diagnoseStorage;
