#!/bin/bash

echo "⚡ TESTS RAPIDES - Espace Communauté"
echo "===================================="
echo ""

cd "$(dirname "$0")"

PASSED=0
FAILED=0

# Test 1: Base de données
echo "1️⃣  TEST BASE DE DONNÉES..."
echo ""
cd backend && node scripts/test-community.js
if [ $? -eq 0 ]; then
    PASSED=$((PASSED + 1))
else
    FAILED=$((FAILED + 1))
fi
cd ..

# Test 2: Fichiers Backend
echo ""
echo "2️⃣  TEST FICHIERS BACKEND..."
FILES_OK=0
FILES_MISSING=0

BACKEND_FILES="backend/models/Follow.js backend/models/Comment.js backend/models/Badge.js backend/controllers/followController.js backend/routes/follow.js backend/routes/comments.js backend/routes/badges.js backend/routes/community.js"

for file in $BACKEND_FILES; do
    if [ -f "$file" ]; then
        FILES_OK=$((FILES_OK + 1))
    else
        FILES_MISSING=$((FILES_MISSING + 1))
        echo "❌ Manquant: $file"
    fi
done

if [ $FILES_MISSING -eq 0 ]; then
    echo "✅ $FILES_OK fichiers backend trouvés"
    PASSED=$((PASSED + 1))
else
    echo "❌ $FILES_MISSING fichiers manquants"
    FAILED=$((FAILED + 1))
fi

# Test 3: Fichiers Frontend
echo ""
echo "3️⃣  TEST FICHIERS FRONTEND..."
FILES_OK=0
FILES_MISSING=0

FRONTEND_FILES="frontend/src/pages/community/CommunityPage.jsx frontend/src/components/community/ExplorerTab.jsx frontend/src/services/followService.js frontend/src/services/commentService.js frontend/src/services/badgeService.js"

for file in $FRONTEND_FILES; do
    if [ -f "$file" ]; then
        FILES_OK=$((FILES_OK + 1))
    else
        FILES_MISSING=$((FILES_MISSING + 1))
        echo "❌ Manquant: $file"
    fi
done

if [ $FILES_MISSING -eq 0 ]; then
    echo "✅ $FILES_OK fichiers frontend trouvés"
    PASSED=$((PASSED + 1))
else
    echo "❌ $FILES_MISSING fichiers manquants"
    FAILED=$((FAILED + 1))
fi

# Test 4: Vérifier les routes dans index.js
echo ""
echo "4️⃣  TEST ROUTES BACKEND..."
if grep -q "followRoutes" backend/routes/index.js && \
   grep -q "commentsRoutes" backend/routes/index.js && \
   grep -q "badgesRoutes" backend/routes/index.js && \
   grep -q "communityRoutes" backend/routes/index.js; then
    echo "✅ Routes communautaires enregistrées"
    PASSED=$((PASSED + 1))
else
    echo "❌ Routes manquantes dans index.js"
    FAILED=$((FAILED + 1))
fi

# Test 5: Vérifier la route dans App.jsx
echo ""
echo "5️⃣  TEST ROUTE FRONTEND..."
if grep -q "/community" frontend/src/App.jsx && \
   grep -q "CommunityPage" frontend/src/App.jsx; then
    echo "✅ Route /community configurée"
    PASSED=$((PASSED + 1))
else
    echo "❌ Route /community manquante"
    FAILED=$((FAILED + 1))
fi

# Résumé
echo ""
echo "════════════════════════════════════"
echo "📊 RÉSUMÉ"
echo "════════════════════════════════════"
echo "✅ Réussis: $PASSED/5"
echo "❌ Échoués: $FAILED/5"
echo ""

if [ $FAILED -eq 0 ]; then
    echo "🎉 TOUS LES TESTS RAPIDES SONT OK !"
    echo ""
    exit 0
else
    echo "⚠️  $FAILED test(s) échoué(s)"
    echo ""
    exit 1
fi

