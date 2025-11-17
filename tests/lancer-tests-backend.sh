#!/bin/bash

# Script pour lancer tous les tests backend

# Couleurs pour l'affichage
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo ""
echo "=================================================="
echo "🧪 TESTS BACKEND - AddRecipe"
echo "=================================================="
echo ""

# Aller dans le répertoire du projet
cd "$(dirname "$0")/.." || exit

# ============================================
# TEST 1 : Modèle Recipe (pas besoin de backend)
# ============================================

echo -e "${BLUE}1️⃣ TEST UNITAIRE - Modèle Recipe${NC}"
echo "--------------------------------------------------"

if node tests/unitaire/modeles/test-recipe.js; then
    echo -e "${GREEN}✅ Test Modèle Recipe réussi !${NC}"
    MODEL_PASSED=true
else
    echo -e "${RED}❌ Test Modèle Recipe échoué${NC}"
    MODEL_PASSED=false
fi

echo ""
echo ""

# ============================================
# TEST 2 : API Recette (besoin du backend)
# ============================================

echo -e "${BLUE}2️⃣ TEST UNITAIRE - API Recette${NC}"
echo "--------------------------------------------------"
echo -e "${YELLOW}⚠️  Nécessite le backend démarré (cd backend && npm start)${NC}"
echo ""

if node tests/unitaire/api/test-api-recette.js; then
    echo -e "${GREEN}✅ Test API Recette réussi !${NC}"
    API_PASSED=true
else
    echo -e "${RED}❌ Test API Recette échoué${NC}"
    echo -e "${YELLOW}💡 Assurez-vous que le backend est démarré :${NC}"
    echo "   cd backend && npm start"
    API_PASSED=false
fi

# ============================================
# RÉSUMÉ
# ============================================

echo ""
echo "=================================================="
echo "📊 RÉSUMÉ"
echo "=================================================="
echo ""

if [ "$MODEL_PASSED" = true ]; then
    echo -e "${GREEN}✅ Modèle Recipe : PASS${NC}"
else
    echo -e "${RED}❌ Modèle Recipe : FAIL${NC}"
fi

if [ "$API_PASSED" = true ]; then
    echo -e "${GREEN}✅ API Recette : PASS${NC}"
else
    echo -e "${RED}❌ API Recette : FAIL${NC}"
fi

if [ "$MODEL_PASSED" = true ] && [ "$API_PASSED" = true ]; then
    echo ""
    echo -e "${GREEN}🎉 TOUS LES TESTS BACKEND SONT PASSÉS !${NC}"
    echo ""
    exit 0
else
    echo ""
    echo -e "${YELLOW}⚠️  CERTAINS TESTS ONT ÉCHOUÉ${NC}"
    echo ""
    if [ "$API_PASSED" = false ]; then
        echo -e "${YELLOW}💡 Pour résoudre :${NC}"
        echo "   1. Démarrer le backend : cd backend && npm start"
        echo "   2. Vérifier que le port 3000 est libre"
        echo "   3. Vérifier la connexion à la base de données"
    fi
    echo ""
    exit 1
fi

