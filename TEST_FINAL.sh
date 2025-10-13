#!/bin/bash

echo "╔══════════════════════════════════════════════════════════╗"
echo "║          🧪 TEST FINAL - ESPACE COMMUNAUTÉ               ║"
echo "╚══════════════════════════════════════════════════════════╝"
echo ""

cd "$(dirname "$0")"

TOTAL=0
PASSED=0
FAILED=0

# Couleurs
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

test_result() {
    local name="$1"
    local result=$2
    
    TOTAL=$((TOTAL + 1))
    
    if [ $result -eq 0 ]; then
        echo -e "${GREEN}✅${NC} $name"
        PASSED=$((PASSED + 1))
    else
        echo -e "${RED}❌${NC} $name"
        FAILED=$((FAILED + 1))
    fi
}

# ==========================================
# TEST 1: Base de données
# ==========================================
echo "1️⃣  BASE DE DONNÉES"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

cd backend && node scripts/test-community.js > /tmp/test-bdd.log 2>&1
test_result "Configuration BDD (22 sous-tests)" $?

if grep -q "TOUS LES TESTS SONT OK" /tmp/test-bdd.log; then
    echo "   → 22/22 tests BDD passés"
else
    echo "   → Voir détails: /tmp/test-bdd.log"
fi
cd ..

# ==========================================
# TEST 2: Structure backend
# ==========================================
echo ""
echo "2️⃣  STRUCTURE BACKEND"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

[ -f "backend/models/Follow.js" ] && test_result "Model Follow.js" 0 || test_result "Model Follow.js" 1
[ -f "backend/models/Comment.js" ] && test_result "Model Comment.js" 0 || test_result "Model Comment.js" 1
[ -f "backend/models/Badge.js" ] && test_result "Model Badge.js" 0 || test_result "Model Badge.js" 1

[ -f "backend/controllers/followController.js" ] && test_result "Controller followController.js" 0 || test_result "Controller followController.js" 1
[ -f "backend/controllers/commentController.js" ] && test_result "Controller commentController.js" 0 || test_result "Controller commentController.js" 1

[ -f "backend/routes/follow.js" ] && test_result "Route follow.js" 0 || test_result "Route follow.js" 1
[ -f "backend/routes/comments.js" ] && test_result "Route comments.js" 0 || test_result "Route comments.js" 1
[ -f "backend/routes/badges.js" ] && test_result "Route badges.js" 0 || test_result "Route badges.js" 1
[ -f "backend/routes/community.js" ] && test_result "Route community.js" 0 || test_result "Route community.js" 1

# ==========================================
# TEST 3: Structure frontend
# ==========================================
echo ""
echo "3️⃣  STRUCTURE FRONTEND"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

[ -f "frontend/src/pages/community/CommunityPage.jsx" ] && test_result "Page CommunityPage.jsx" 0 || test_result "Page CommunityPage.jsx" 1

[ -f "frontend/src/components/community/ExplorerTab.jsx" ] && test_result "Onglet ExplorerTab.jsx" 0 || test_result "Onglet ExplorerTab.jsx" 1
[ -f "frontend/src/components/community/FollowingTab.jsx" ] && test_result "Onglet FollowingTab.jsx" 0 || test_result "Onglet FollowingTab.jsx" 1
[ -f "frontend/src/components/community/LeaderboardTab.jsx" ] && test_result "Onglet LeaderboardTab.jsx" 0 || test_result "Onglet LeaderboardTab.jsx" 1
[ -f "frontend/src/components/community/BadgesTab.jsx" ] && test_result "Onglet BadgesTab.jsx" 0 || test_result "Onglet BadgesTab.jsx" 1

[ -f "frontend/src/services/followService.js" ] && test_result "Service followService.js" 0 || test_result "Service followService.js" 1
[ -f "frontend/src/services/commentService.js" ] && test_result "Service commentService.js" 0 || test_result "Service commentService.js" 1
[ -f "frontend/src/services/badgeService.js" ] && test_result "Service badgeService.js" 0 || test_result "Service badgeService.js" 1
[ -f "frontend/src/services/communityService.js" ] && test_result "Service communityService.js" 0 || test_result "Service communityService.js" 1

# ==========================================
# TEST 4: Intégration
# ==========================================
echo ""
echo "4️⃣  INTÉGRATION"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

grep -q "followRoutes" backend/routes/index.js && test_result "Routes backend enregistrées" 0 || test_result "Routes backend enregistrées" 1
grep -q "CommunityPage" frontend/src/App.jsx && test_result "Route /community dans App.jsx" 0 || test_result "Route /community dans App.jsx" 1
grep -q "community" frontend/src/components/layout/UserLayout.jsx && test_result "Menu Communauté dans UserLayout" 0 || test_result "Menu Communauté dans UserLayout" 1

# ==========================================
# TEST 5: Corrections bugs
# ==========================================
echo ""
echo "5️⃣  CORRECTIONS DE BUGS"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Vérifier que les .split() sont sécurisés
grep -q "(recipe.ingredients || \"\")" frontend/src/components/recipes/RecipeDetails.jsx && test_result "Fix .split() dans RecipeDetails.jsx" 0 || test_result "Fix .split() dans RecipeDetails.jsx" 1
grep -q "(recipe.ingredients || \"\")" frontend/src/components/recipes/RecipeCard.jsx && test_result "Fix .split() dans RecipeCard.jsx" 0 || test_result "Fix .split() dans RecipeCard.jsx" 1
grep -q "(this.ingredients || \"\")" frontend/src/models/Recipe.js && test_result "Fix .split() dans Recipe.js" 0 || test_result "Fix .split() dans Recipe.js" 1

# ==========================================
# RÉSUMÉ
# ==========================================
echo ""
echo "╔══════════════════════════════════════════════════════════╗"
echo "║                   📊 RÉSUMÉ FINAL                        ║"
echo "╚══════════════════════════════════════════════════════════╝"
echo ""
echo -e "✅ Tests réussis: ${GREEN}$PASSED${NC}/$TOTAL"
echo -e "❌ Tests échoués: ${RED}$FAILED${NC}/$TOTAL"
echo ""

if [ $FAILED -eq 0 ]; then
    echo "╔══════════════════════════════════════════════════════════╗"
    echo "║                                                          ║"
    echo "║        🎉  TOUS LES TESTS SONT PASSÉS ! 🎉              ║"
    echo "║                                                          ║"
    echo "║     L'espace communauté est prêt à être utilisé !       ║"
    echo "║                                                          ║"
    echo "╚══════════════════════════════════════════════════════════╝"
    echo ""
    echo "🚀 PROCHAINES ÉTAPES:"
    echo ""
    echo "   1. Démarrer le backend:"
    echo "      cd backend && npm start"
    echo ""
    echo "   2. Démarrer le frontend:"
    echo "      cd frontend && npm start"
    echo ""
    echo "   3. Ouvrir http://localhost:3000"
    echo ""
    echo "   4. Se connecter et cliquer sur '🌟 Communauté'"
    echo ""
    echo "✨ Profitez de votre espace communauté ! 🍽️"
    echo ""
    exit 0
else
    echo "⚠️  $FAILED test(s) échoué(s)"
    echo ""
    echo "Consultez les détails ci-dessus."
    echo ""
    exit 1
fi

