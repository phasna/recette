import axios from "axios";

const API_URL = "http://localhost:3000/api";
let testToken = null;
let testUserId = null;

console.log("🧪 TESTS API COMPLETS - Espace Communauté\n");
console.log("=".repeat(60));

const tests = {
  passed: 0,
  failed: 0,
  skipped: 0,
  results: [],
};

function logTest(name, status, message = "") {
  const icons = { pass: "✅", fail: "❌", skip: "⏭️" };
  const icon = icons[status] || "❓";
  console.log(`${icon} ${name}`);
  if (message) console.log(`   ${message}`);

  tests.results.push({ name, status, message });
  if (status === "pass") tests.passed++;
  else if (status === "fail") tests.failed++;
  else tests.skipped++;
}

async function testEndpoint(name, method, url, data = null, headers = {}) {
  try {
    const config = { method, url: `${API_URL}${url}`, headers };
    if (data) config.data = data;

    const response = await axios(config);
    logTest(name, "pass", `Status: ${response.status}`);
    return response.data;
  } catch (error) {
    logTest(name, "fail", error.response?.data?.error || error.message);
    return null;
  }
}

async function runTests() {
  console.log("\n📡 Vérification du serveur...");

  try {
    await axios.get(`${API_URL}/test`);
    logTest("Serveur accessible", "pass", "API répond correctement");
  } catch (error) {
    logTest("Serveur accessible", "fail", "Serveur non démarré!");
    console.log("\n⚠️  ERREUR: Le backend n'est pas démarré!");
    console.log("   Démarrez-le avec: cd backend && npm start\n");
    process.exit(1);
  }

  // ==========================================
  // SECTION 1: AUTHENTIFICATION
  // ==========================================
  console.log("\n" + "=".repeat(60));
  console.log("1️⃣  TESTS D'AUTHENTIFICATION");
  console.log("=".repeat(60));

  // Login
  const loginData = await testEndpoint(
    "Login utilisateur",
    "post",
    "/users/login",
    {
      loginField: "Phasna",
      password: "123456", // Changez selon votre mot de passe
    }
  );

  if (loginData?.token) {
    testToken = loginData.token;
    testUserId = loginData.user.id;
    logTest("Token reçu", "pass", `User ID: ${testUserId}`);
  } else {
    logTest("Token reçu", "fail", "Pas de token - tests authentifiés ignorés");
  }

  // ==========================================
  // SECTION 2: BADGES
  // ==========================================
  console.log("\n" + "=".repeat(60));
  console.log("2️⃣  TESTS DES BADGES");
  console.log("=".repeat(60));

  const badges = await testEndpoint(
    "GET /badges - Tous les badges",
    "get",
    "/badges"
  );
  if (badges?.badges?.length >= 15) {
    logTest(
      "Nombre de badges",
      "pass",
      `${badges.badges.length} badges trouvés`
    );
  } else {
    logTest(
      "Nombre de badges",
      "fail",
      `Seulement ${badges?.badges?.length || 0} badges`
    );
  }

  await testEndpoint(
    "GET /badges/categories - Badges par catégorie",
    "get",
    "/badges/categories"
  );

  if (testUserId) {
    await testEndpoint(
      "GET /badges/user/:id - Badges d'un utilisateur",
      "get",
      `/badges/user/${testUserId}`
    );

    await testEndpoint(
      "GET /badges/user/:id/stats - Stats badges",
      "get",
      `/badges/user/${testUserId}/stats`
    );
  }

  if (testToken) {
    await testEndpoint(
      "GET /badges/next - Prochains badges",
      "get",
      "/badges/next",
      null,
      { Authorization: `Bearer ${testToken}` }
    );

    await testEndpoint(
      "POST /badges/check - Vérifier badges",
      "post",
      "/badges/check",
      {},
      { Authorization: `Bearer ${testToken}` }
    );
  }

  await testEndpoint(
    "GET /badges/leaderboard - Classement badges",
    "get",
    "/badges/leaderboard?limit=5"
  );

  // ==========================================
  // SECTION 3: COMMUNAUTÉ
  // ==========================================
  console.log("\n" + "=".repeat(60));
  console.log("3️⃣  TESTS COMMUNAUTÉ");
  console.log("=".repeat(60));

  const stats = await testEndpoint(
    "GET /community/stats - Statistiques globales",
    "get",
    "/community/stats"
  );
  if (stats) {
    console.log(`   Utilisateurs actifs: ${stats.active_users || 0}`);
    console.log(`   Recettes partagées: ${stats.shared_recipes || 0}`);
    console.log(`   Commentaires: ${stats.total_comments || 0}`);
  }

  const topRecipes = await testEndpoint(
    "GET /community/recipes/top - Recettes populaires",
    "get",
    "/community/recipes/top?limit=5&period=all"
  );
  if (topRecipes?.recipes?.length > 0) {
    logTest(
      "Recettes trouvées",
      "pass",
      `${topRecipes.recipes.length} recettes`
    );
  }

  const topUsers = await testEndpoint(
    "GET /community/users/top - Utilisateurs actifs",
    "get",
    "/community/users/top?limit=5&sortBy=recipes"
  );

  await testEndpoint(
    "GET /community/users/search - Recherche utilisateurs",
    "get",
    "/community/users/search?query=Phasna&limit=5"
  );

  await testEndpoint(
    "GET /community/trends/monthly - Tendances du mois",
    "get",
    "/community/trends/monthly"
  );

  if (testToken) {
    await testEndpoint(
      "GET /community/feed - Fil d'actualité",
      "get",
      "/community/feed?limit=10",
      null,
      { Authorization: `Bearer ${testToken}` }
    );
  }

  // ==========================================
  // SECTION 4: COMMENTAIRES
  // ==========================================
  console.log("\n" + "=".repeat(60));
  console.log("4️⃣  TESTS COMMENTAIRES");
  console.log("=".repeat(60));

  await testEndpoint(
    "GET /comments/recent - Commentaires récents",
    "get",
    "/comments/recent?limit=10"
  );

  // Supposons que la recette ID 1 existe
  const recipeComments = await testEndpoint(
    "GET /comments/recipe/:id - Commentaires d'une recette",
    "get",
    "/comments/recipe/1"
  );

  if (testToken && topRecipes?.recipes?.[0]?.id) {
    const recipeId = topRecipes.recipes[0].id;

    // Créer un commentaire de test
    const newComment = await testEndpoint(
      "POST /comments - Créer un commentaire",
      "post",
      "/comments",
      {
        recipeId: recipeId,
        commentText: "Test automatique - Super recette !",
        rating: 5,
      },
      { Authorization: `Bearer ${testToken}` }
    );

    if (newComment?.comment?.id) {
      const commentId = newComment.comment.id;

      // Modifier le commentaire
      await testEndpoint(
        "PUT /comments/:id - Modifier un commentaire",
        "put",
        `/comments/${commentId}`,
        {
          commentText: "Test modifié - Excellente recette !",
          rating: 5,
        },
        { Authorization: `Bearer ${testToken}` }
      );

      // Liker le commentaire
      await testEndpoint(
        "POST /comments/:id/like - Liker",
        "post",
        `/comments/${commentId}/like`,
        {},
        { Authorization: `Bearer ${testToken}` }
      );

      // Retirer le like
      await testEndpoint(
        "DELETE /comments/:id/like - Retirer like",
        "delete",
        `/comments/${commentId}/like`,
        null,
        { Authorization: `Bearer ${testToken}` }
      );

      // Supprimer le commentaire
      await testEndpoint(
        "DELETE /comments/:id - Supprimer",
        "delete",
        `/comments/${commentId}`,
        null,
        { Authorization: `Bearer ${testToken}` }
      );
    }
  }

  if (testUserId) {
    await testEndpoint(
      "GET /comments/user/:id - Commentaires d'un user",
      "get",
      `/comments/user/${testUserId}`
    );
  }

  // ==========================================
  // SECTION 5: FOLLOW
  // ==========================================
  console.log("\n" + "=".repeat(60));
  console.log("5️⃣  TESTS FOLLOW");
  console.log("=".repeat(60));

  if (testToken && testUserId) {
    // Trouver un autre utilisateur
    let otherUserId = null;
    if (topUsers?.users?.length > 0) {
      otherUserId = topUsers.users.find((u) => u.id !== testUserId)?.id;
    }

    if (otherUserId) {
      // Suivre l'utilisateur
      await testEndpoint(
        "POST /follow - Suivre un utilisateur",
        "post",
        "/follow",
        { userId: otherUserId },
        { Authorization: `Bearer ${testToken}` }
      );

      // Vérifier le statut
      await testEndpoint(
        "GET /follow/:id/status - Statut de suivi",
        "get",
        `/follow/${otherUserId}/status`,
        null,
        { Authorization: `Bearer ${testToken}` }
      );

      // Stats
      await testEndpoint(
        "GET /follow/:id/stats - Stats de suivi",
        "get",
        `/follow/${otherUserId}/stats`,
        null,
        { Authorization: `Bearer ${testToken}` }
      );

      // Ne plus suivre
      await testEndpoint(
        "DELETE /follow/:id - Ne plus suivre",
        "delete",
        `/follow/${otherUserId}`,
        null,
        { Authorization: `Bearer ${testToken}` }
      );
    } else {
      logTest("Tests follow", "skip", "Pas d'autre utilisateur disponible");
    }

    // Followers et following
    await testEndpoint(
      "GET /follow/:id/followers - Abonnés",
      "get",
      `/follow/${testUserId}/followers`,
      null,
      { Authorization: `Bearer ${testToken}` }
    );

    await testEndpoint(
      "GET /follow/:id/following - Abonnements",
      "get",
      `/follow/${testUserId}/following`,
      null,
      { Authorization: `Bearer ${testToken}` }
    );

    await testEndpoint(
      "GET /follow/suggestions - Suggestions",
      "get",
      "/follow/suggestions/users?limit=5",
      null,
      { Authorization: `Bearer ${testToken}` }
    );
  }

  // ==========================================
  // RÉSUMÉ
  // ==========================================
  console.log("\n" + "=".repeat(60));
  console.log("📊 RÉSUMÉ DES TESTS API");
  console.log("=".repeat(60));

  console.log(`\n✅ Tests réussis: ${tests.passed}`);
  console.log(`❌ Tests échoués: ${tests.failed}`);
  console.log(`⏭️  Tests ignorés: ${tests.skipped}`);
  console.log(
    `📝 Total: ${tests.passed + tests.failed + tests.skipped} tests\n`
  );

  // Grouper par statut
  const failed = tests.results.filter((t) => t.status === "fail");
  if (failed.length > 0) {
    console.log("❌ Tests échoués:");
    failed.forEach((t) => console.log(`   - ${t.name}: ${t.message}`));
    console.log("");
  }

  if (tests.failed === 0) {
    console.log("🎉 TOUS LES TESTS API SONT PASSÉS !");
    console.log("✨ L'API est pleinement fonctionnelle !\n");
  } else {
    console.log("⚠️  Certains tests ont échoué.");
    console.log("   Vérifiez les détails ci-dessus.\n");
  }

  process.exit(tests.failed > 0 ? 1 : 0);
}

runTests().catch((error) => {
  console.error("\n❌ Erreur fatale:", error.message);
  process.exit(1);
});

