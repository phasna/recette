/**
 * Script de diagnostic pour la navbar
 * À exécuter dans la console du navigateur
 */

console.log("🔍 Diagnostic de la navbar...");

const debugNavbar = () => {
  console.log("=== DIAGNOSTIC NAVBAR ===");

  // 1. Vérifier si la navbar existe
  const navbar = document.querySelector('[class*="bg-white/90"]');
  console.log("1️⃣ Navbar trouvée:", navbar ? "✅ Oui" : "❌ Non");

  if (navbar) {
    console.log("   - Largeur:", navbar.offsetWidth + "px");
    console.log("   - Hauteur:", navbar.offsetHeight + "px");
    console.log("   - Position:", navbar.getBoundingClientRect());
    console.log("   - Classes CSS:", navbar.className);
  }

  // 2. Vérifier les boutons de connexion
  const loginButtons = document.querySelectorAll("button");
  const authButtons = Array.from(loginButtons).filter(
    (btn) =>
      btn.textContent.includes("Connexion") ||
      btn.textContent.includes("Inscription") ||
      btn.textContent.includes("Test Auto")
  );

  console.log("2️⃣ Boutons d'authentification trouvés:", authButtons.length);
  authButtons.forEach((btn, index) => {
    console.log(`   - Bouton ${index + 1}:`, btn.textContent.trim());
    console.log(`   - Visible:`, btn.offsetParent !== null ? "✅" : "❌");
  });

  // 3. Vérifier la largeur de l'écran
  console.log("3️⃣ Taille de l'écran:");
  console.log("   - Largeur:", window.innerWidth + "px");
  console.log("   - Hauteur:", window.innerHeight + "px");
  console.log(
    "   - Type d'écran:",
    window.innerWidth >= 1024 ? "Desktop" : "Mobile/Tablet"
  );

  // 4. Vérifier les styles CSS
  const layout = document.querySelector(".flex.h-screen");
  console.log("4️⃣ Layout principal:", layout ? "✅ Trouvé" : "❌ Non trouvé");

  if (layout) {
    console.log("   - Classes:", layout.className);
    console.log("   - Flex direction:", getComputedStyle(layout).flexDirection);
  }

  // 5. Suggestions de correction
  console.log("\n5️⃣ Suggestions de correction:");

  if (!navbar) {
    console.log(
      "🔧 La navbar n'est pas trouvée. Vérifiez que le composant Layout est bien rendu."
    );
  } else if (navbar.offsetWidth < 50) {
    console.log(
      "🔧 La navbar est trop étroite. Vérifiez les classes CSS de largeur."
    );
  } else if (authButtons.length === 0) {
    console.log(
      "🔧 Aucun bouton d'authentification trouvé. Vérifiez que l'utilisateur n'est pas connecté."
    );
  } else {
    console.log("✅ La navbar semble fonctionner correctement !");
  }

  console.log("\n=== FIN DU DIAGNOSTIC ===");
};

// Exécuter le diagnostic
debugNavbar();

// Exporter la fonction pour réutilisation
window.debugNavbar = debugNavbar;
