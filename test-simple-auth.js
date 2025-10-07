/**
 * Test simple de l'API d'authentification
 */

const testSimpleAuth = async () => {
  console.log("🧪 Test simple de l'API...");

  try {
    // Test avec email
    console.log("\n📧 Test avec email...");
    const response = await fetch("http://localhost:3000/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "test@example.com",
        password: "password123",
      }),
    });

    const data = await response.json();
    console.log("Status:", response.status);
    console.log("Response:", data);

    if (response.ok) {
      console.log("✅ Connexion avec email réussie !");
    } else {
      console.log("❌ Erreur:", data.message);
    }
  } catch (error) {
    console.error("❌ Erreur:", error);
  }
};

testSimpleAuth();
