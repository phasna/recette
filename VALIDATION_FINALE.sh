#!/bin/bash

echo "╔══════════════════════════════════════════════════════════╗"
echo "║         ✅ VALIDATION FINALE - ESPACE COMMUNAUTÉ         ║"
echo "╚══════════════════════════════════════════════════════════╝"
echo ""

cd "$(dirname "$0")"

PASSED=0
FAILED=0

# Test 1: Bugs corrigés
echo "1️⃣  VÉRIFICATION DES CORRECTIONS DE BUGS"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Vérifier les .split() sécurisés
if grep -q "(recipe.ingredients || \"\")" frontend/src/components/recipes/RecipeDetails.jsx; then
    echo "✅ Bug .split() corrigé dans RecipeDetails.jsx"
    PASSED=$((PASSED + 1))
else
    echo "❌ Bug .split() NON corrigé dans RecipeDetails.jsx"
    FAILED=$((FAILED + 1))
fi

if grep -q "(recipe.ingredients || \"\")" frontend/src/components/recipes/RecipeCard.jsx; then
    echo "✅ Bug .split() corrigé dans RecipeCard.jsx"
    PASSED=$((PASSED + 1))
else
    echo "❌ Bug .split() NON corrigé dans RecipeCard.jsx"
    FAILED=$((FAILED + 1))
fi

if grep -q "parseFloat(recipe.average_rating)" frontend/src/components/community/RecipeCard.jsx; then
    echo "✅ Bug .toFixed() corrigé dans community/RecipeCard.jsx"
    PASSED=$((PASSED + 1))
else
    echo "❌ Bug .toFixed() NON corrigé dans community/RecipeCard.jsx"
    FAILED=$((FAILED + 1))
fi

# Test 2: Données de démo
echo ""
echo "2️⃣  VÉRIFICATION DES DONNÉES DE DÉMONSTRATION"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

cd backend && node -e "
import db from './database.js';

db.query('SELECT COUNT(*) as count FROM recipe_comments', (err, result) => {
  if (err) {
    console.log('❌ Erreur vérification commentaires');
    process.exit(1);
  }
  const count = result[0].count;
  if (count >= 6) {
    console.log(\`✅ Commentaires créés: \${count}\`);
    process.exit(0);
  } else {
    console.log(\`⚠️  Seulement \${count} commentaires (attendu: 6+)\`);
    process.exit(1);
  }
});
" && PASSED=$((PASSED + 1)) || FAILED=$((FAILED + 1))

cd .. > /dev/null 2>&1

cd backend && node -e "
import db from './database.js';

db.query('SELECT COUNT(*) as count FROM user_follows', (err, result) => {
  if (err) {
    console.log('❌ Erreur vérification follows');
    process.exit(1);
  }
  const count = result[0].count;
  if (count >= 4) {
    console.log(\`✅ Relations de suivi créées: \${count}\`);
    process.exit(0);
  } else {
    console.log(\`⚠️  Seulement \${count} follows (attendu: 4)\`);
    process.exit(1);
  }
});
" && PASSED=$((PASSED + 1)) || FAILED=$((FAILED + 1))

cd .. > /dev/null 2>&1

cd backend && node -e "
import db from './database.js';

db.query('SELECT COUNT(*) as count FROM user_badges', (err, result) => {
  if (err) {
    console.log('❌ Erreur vérification badges');
    process.exit(1);
  }
  const count = result[0].count;
  if (count >= 1) {
    console.log(\`✅ Badges gagnés: \${count}\`);
    process.exit(0);
  } else {
    console.log(\`⚠️  Aucun badge gagné\`);
    process.exit(1);
  }
});
" && PASSED=$((PASSED + 1)) || FAILED=$((FAILED + 1))

cd .. > /dev/null 2>&1

# Test 3: Structure complète
echo ""
echo "3️⃣  VÉRIFICATION DE LA STRUCTURE COMPLÈTE"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

ESSENTIAL_FILES=(
    "backend/models/Follow.js"
    "backend/models/Comment.js"
    "backend/models/Badge.js"
    "frontend/src/pages/community/CommunityPage.jsx"
    "frontend/src/components/community/ExplorerTab.jsx"
    "frontend/src/services/followService.js"
    "START_COMMUNITY.txt"
    "README_COMMUNAUTE.md"
)

FILES_OK=0
for file in "${ESSENTIAL_FILES[@]}"; do
    if [ -f "$file" ]; then
        FILES_OK=$((FILES_OK + 1))
    fi
done

if [ $FILES_OK -eq ${#ESSENTIAL_FILES[@]} ]; then
    echo "✅ Fichiers essentiels: ${FILES_OK}/${#ESSENTIAL_FILES[@]}"
    PASSED=$((PASSED + 1))
else
    echo "❌ Fichiers manquants: $((${#ESSENTIAL_FILES[@]} - FILES_OK))"
    FAILED=$((FAILED + 1))
fi

# Résumé
echo ""
echo "╔══════════════════════════════════════════════════════════╗"
echo "║                   📊 RÉSUMÉ FINAL                        ║"
echo "╚══════════════════════════════════════════════════════════╝"
echo ""
echo "✅ Validations réussies: $PASSED"
echo "❌ Validations échouées: $FAILED"
echo ""

if [ $FAILED -eq 0 ]; then
    echo "╔══════════════════════════════════════════════════════════╗"
    echo "║                                                          ║"
    echo "║        🎉 VALIDATION RÉUSSIE À 100% ! 🎉                ║"
    echo "║                                                          ║"
    echo "║     Tous les bugs sont corrigés                          ║"
    echo "║     Toutes les données sont en place                     ║"
    echo "║     Tous les fichiers sont présents                      ║"
    echo "║                                                          ║"
    echo "║     L'espace communauté est PRÊT ! 🚀                   ║"
    echo "║                                                          ║"
    echo "╚══════════════════════════════════════════════════════════╝"
    echo ""
    echo "🚀 DÉMARREZ MAINTENANT:"
    echo ""
    echo "   Terminal 1:  cd backend && npm start"
    echo "   Terminal 2:  cd frontend && npm start"
    echo ""
    echo "   Puis: http://localhost:3000 → Communauté"
    echo ""
    exit 0
else
    echo "⚠️  $FAILED validation(s) échouée(s)"
    echo ""
    echo "Consultez les détails ci-dessus."
    echo ""
    exit 1
fi


