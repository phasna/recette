/**
 * Script de test pour vérifier la fonctionnalité des favoris
 */

console.log("🧪 Test de la fonctionnalité des favoris\n");

// Simuler un appel API pour vérifier si le backend répond
async function testFavorites() {
  try {
    console.log("1️⃣ Test de connexion au serveur backend...");
    const healthCheck = await fetch("http://localhost:3000/api/recipes");

    if (healthCheck.ok) {
      console.log("✅ Serveur backend accessible\n");
    } else {
      console.log("❌ Serveur backend ne répond pas correctement");
      console.log("Status:", healthCheck.status);
      return;
    }

    console.log("2️⃣ Informations importantes :");
    console.log(
      "   - Le serveur backend doit être démarré : cd backend && npm start"
    );
    console.log("   - Vous devez être connecté pour ajouter aux favoris");
    console.log("   - La table 'favorites' doit exister dans MySQL\n");

    console.log("3️⃣ Routes API des favoris :");
    console.log("   POST   /api/favorites           - Ajouter aux favoris");
    console.log("   DELETE /api/favorites/:id       - Retirer des favoris");
    console.log("   GET    /api/favorites           - Liste des favoris");
    console.log("   GET    /api/favorites/check/:id - Vérifier statut\n");
  } catch (error) {
    console.log("❌ Erreur de connexion au serveur backend");
    console.log("   Assurez-vous que le serveur est démarré:");
    console.log("   cd backend && npm start\n");
    console.log("   Erreur:", error.message);
  }
}

testFavorites();
