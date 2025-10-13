#!/bin/bash

# Script pour mettre à jour la base de données avec la colonne country
# Ce script fonctionne avec MAMP

echo "🔄 Mise à jour de la base de données..."
echo ""

# Tenter avec MAMP (port 8889 par défaut)
echo "Tentative avec MAMP (port 8889)..."
/Applications/MAMP/Library/bin/mysql -u root -proot -P 8889 -h localhost recipe_app < /Users/phasna/Documents/Addproduct/database/add_country_column.sql

if [ $? -eq 0 ]; then
    echo "✅ Base de données mise à jour avec succès via MAMP!"
    exit 0
fi

# Tenter avec MAMP (port 3306)
echo "Tentative avec MAMP (port 3306)..."
/Applications/MAMP/Library/bin/mysql -u root -proot -P 3306 -h localhost recipe_app < /Users/phasna/Documents/Addproduct/database/add_country_column.sql

if [ $? -eq 0 ]; then
    echo "✅ Base de données mise à jour avec succès via MAMP!"
    exit 0
fi

# Tenter avec MySQL natif
echo "Tentative avec MySQL natif..."
mysql -u root -p recipe_app < /Users/phasna/Documents/Addproduct/database/add_country_column.sql

if [ $? -eq 0 ]; then
    echo "✅ Base de données mise à jour avec succès!"
    exit 0
fi

echo ""
echo "❌ Échec de la mise à jour automatique."
echo "📝 Veuillez utiliser l'une des méthodes manuelles ci-dessous:"
echo ""
echo "MÉTHODE 1 - Via phpMyAdmin (RECOMMANDÉ):"
echo "1. Ouvrez http://localhost:8888/phpMyAdmin"
echo "2. Sélectionnez la base 'recipe_app'"
echo "3. Cliquez sur l'onglet 'SQL'"
echo "4. Copiez-collez cette commande:"
echo ""
echo "ALTER TABLE users ADD COLUMN country VARCHAR(100) DEFAULT NULL AFTER last_name;"
echo ""
echo "5. Cliquez sur 'Exécuter'"
echo ""
echo "MÉTHODE 2 - Commande SQL directe:"
echo "Copiez le contenu de: database/add_country_column.sql"

