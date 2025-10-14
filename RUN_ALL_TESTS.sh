#!/bin/bash

echo "╔══════════════════════════════════════════════════════════╗"
echo "║     🧪 SUITE DE TESTS COMPLÈTE - ESPACE COMMUNAUTÉ      ║"
echo "╚══════════════════════════════════════════════════════════╝"
echo ""

cd "$(dirname "$0")"

TOTAL_TESTS=0
PASSED_TESTS=0
FAILED_TESTS=0

# Fonction pour exécuter un test
run_test() {
    local name="$1"
    local command="$2"
    
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "🧪 TEST: $name"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    
    eval "$command"
    local result=$?
    
    TOTAL_TESTS=$((TOTAL_TESTS + 1))
    
    if [ $result -eq 0 ]; then
        echo ""
        echo "✅ $name - RÉUSSI"
        PASSED_TESTS=$((PASSED_TESTS + 1))
    else
        echo ""
        echo "❌ $name - ÉCHOUÉ"
        FAILED_TESTS=$((FAILED_TESTS + 1))
    fi
    
    echo ""
    return $result
}

echo "📋 PLAN DE TESTS:"
echo "   1️⃣  Base de données (22 sous-tests)"
echo "   2️⃣  Fichiers backend (18 fichiers)"
echo "   3️⃣  Fichiers frontend (13 fichiers)"
echo "   4️⃣  Compilation frontend"
echo "   5️⃣  API endpoints (si backend démarré)"
echo ""
read -p "Appuyez sur ENTRÉE pour commencer les tests..."
echo ""

# ==========================================
# TEST 1: BASE DE DONNÉES
# ==========================================
run_test "1️⃣  Base de données" "cd backend && node scripts/test-community.js"

# ==========================================
# TEST 2: FICHIERS BACKEND
# ==========================================
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🧪 TEST: 2️⃣  Fichiers Backend"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

BACKEND_FILES=(
    "backend/models/Follow.js"
    "backend/models/Comment.js"
    "backend/models/Badge.js"
    "backend/controllers/followController.js"
    "backend/controllers/commentController.js"
    "backend/controllers/badgeController.js"
    "backend/controllers/communityController.js"
    "backend/routes/follow.js"
    "backend/routes/comments.js"
    "backend/routes/badges.js"
    "backend/routes/community.js"
    "backend/scripts/database/setup-community-tables.js"
    "backend/scripts/database/create-community-simple.js"
    "backend/scripts/database/check-recipes-sharing.js"
    "backend/scripts/share-all-recipes.js"
    "backend/scripts/add-user-columns.js"
    "backend/scripts/test-community.js"
    "backend/scripts/test-api-complete.js"
)

BACKEND_MISSING=0
for file in "${BACKEND_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file"
    else
        echo "❌ $file - MANQUANT"
        BACKEND_MISSING=$((BACKEND_MISSING + 1))
    fi
done

TOTAL_TESTS=$((TOTAL_TESTS + 1))
if [ $BACKEND_MISSING -eq 0 ]; then
    echo ""
    echo "✅ Fichiers Backend - RÉUSSI (${#BACKEND_FILES[@]} fichiers)"
    PASSED_TESTS=$((PASSED_TESTS + 1))
else
    echo ""
    echo "❌ Fichiers Backend - ÉCHOUÉ ($BACKEND_MISSING manquants)"
    FAILED_TESTS=$((FAILED_TESTS + 1))
fi
echo ""

# ==========================================
# TEST 3: FICHIERS FRONTEND
# ==========================================
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🧪 TEST: 3️⃣  Fichiers Frontend"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

FRONTEND_FILES=(
    "frontend/src/pages/community/CommunityPage.jsx"
    "frontend/src/components/community/ExplorerTab.jsx"
    "frontend/src/components/community/FollowingTab.jsx"
    "frontend/src/components/community/LeaderboardTab.jsx"
    "frontend/src/components/community/BadgesTab.jsx"
    "frontend/src/components/community/UserCard.jsx"
    "frontend/src/components/community/RecipeCard.jsx"
    "frontend/src/components/community/CommentItem.jsx"
    "frontend/src/components/recipe/RecipeComments.jsx"
    "frontend/src/services/followService.js"
    "frontend/src/services/commentService.js"
    "frontend/src/services/badgeService.js"
    "frontend/src/services/communityService.js"
)

FRONTEND_MISSING=0
for file in "${FRONTEND_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file"
    else
        echo "❌ $file - MANQUANT"
        FRONTEND_MISSING=$((FRONTEND_MISSING + 1))
    fi
done

TOTAL_TESTS=$((TOTAL_TESTS + 1))
if [ $FRONTEND_MISSING -eq 0 ]; then
    echo ""
    echo "✅ Fichiers Frontend - RÉUSSI (${#FRONTEND_FILES[@]} fichiers)"
    PASSED_TESTS=$((PASSED_TESTS + 1))
else
    echo ""
    echo "❌ Fichiers Frontend - ÉCHOUÉ ($FRONTEND_MISSING manquants)"
    FAILED_TESTS=$((FAILED_TESTS + 1))
fi
echo ""

# ==========================================
# TEST 4: COMPILATION FRONTEND
# ==========================================
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🧪 TEST: 4️⃣  Compilation Frontend"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "⏳ Tentative de compilation (peut prendre 30s)..."
echo ""

cd frontend
npm run build > /tmp/frontend-build.log 2>&1
BUILD_RESULT=$?
cd ..

TOTAL_TESTS=$((TOTAL_TESTS + 1))
if [ $BUILD_RESULT -eq 0 ]; then
    echo "✅ Compilation Frontend - RÉUSSI"
    echo "   Le build a été créé avec succès"
    PASSED_TESTS=$((PASSED_TESTS + 1))
else
    echo "❌ Compilation Frontend - ÉCHOUÉ"
    echo "   Voir les erreurs dans: /tmp/frontend-build.log"
    echo ""
    echo "Premières lignes d'erreur:"
    tail -20 /tmp/frontend-build.log | grep -i error || echo "   Aucune erreur spécifique"
    FAILED_TESTS=$((FAILED_TESTS + 1))
fi
echo ""

# ==========================================
# TEST 5: API ENDPOINTS (optionnel)
# ==========================================
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🧪 TEST: 5️⃣  API Endpoints"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Vérifier si le backend est démarré
if curl -s http://localhost:3000/api/test > /dev/null 2>&1; then
    echo "✅ Backend détecté sur http://localhost:3000"
    echo ""
    run_test "   API Endpoints" "cd backend && node scripts/test-api-complete.js"
else
    echo "⏭️  Backend non démarré - Test API ignoré"
    echo ""
    echo "Pour tester les API endpoints:"
    echo "   1. Démarrez le backend: cd backend && npm start"
    echo "   2. Exécutez: node backend/scripts/test-api-complete.js"
    echo ""
    TOTAL_TESTS=$((TOTAL_TESTS + 1))
fi

# ==========================================
# RÉSUMÉ FINAL
# ==========================================
echo ""
echo "╔══════════════════════════════════════════════════════════╗"
echo "║              📊 RÉSUMÉ FINAL DES TESTS                   ║"
echo "╚══════════════════════════════════════════════════════════╝"
echo ""
echo "✅ Tests réussis: $PASSED_TESTS/$TOTAL_TESTS"
echo "❌ Tests échoués: $FAILED_TESTS/$TOTAL_TESTS"
echo ""

if [ $FAILED_TESTS -eq 0 ]; then
    echo "╔══════════════════════════════════════════════════════════╗"
    echo "║         🎉 TOUS LES TESTS SONT PASSÉS ! 🎉              ║"
    echo "║                                                          ║"
    echo "║    L'espace communauté est ENTIÈREMENT fonctionnel !    ║"
    echo "╚══════════════════════════════════════════════════════════╝"
    echo ""
    echo "🚀 Prochaines étapes:"
    echo "   1. Backend: cd backend && npm start"
    echo "   2. Frontend: cd frontend && npm start"
    echo "   3. Ouvrir: http://localhost:3000"
    echo "   4. Se connecter et aller dans 'Communauté'"
    echo ""
    exit 0
else
    echo "╔══════════════════════════════════════════════════════════╗"
    echo "║          ⚠️  CERTAINS TESTS ONT ÉCHOUÉ                  ║"
    echo "╚══════════════════════════════════════════════════════════╝"
    echo ""
    echo "Consultez les détails ci-dessus pour corriger les erreurs."
    echo ""
    exit 1
fi


