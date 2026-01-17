#!/bin/bash

echo "🚀 Příprava projektu Šuplík pro GitHub Pages"
echo ""

# Kontrola Git
if [ ! -d .git ]; then
    echo "📦 Inicializace Git repozitáře..."
    git init
    git branch -M main
else
    echo "✅ Git repozitář již existuje"
fi

# Přidání souborů
echo "📝 Přidávání souborů do Git..."
git add .

# Kontrola změn
if git diff-index --quiet HEAD --; then
    echo "ℹ️  Žádné změny k commitu"
else
    echo "💾 Vytváření commitu..."
    git commit -m "Initial commit - Šuplík app"
fi

echo ""
echo "✅ Projekt je připraven!"
echo ""
echo "📋 Další kroky:"
echo ""
echo "1. Vytvořte nový repozitář na GitHubu:"
echo "   https://github.com/new"
echo ""
echo "2. Připojte remote a pushněte:"
echo "   git remote add origin https://github.com/USERNAME/suplik.git"
echo "   git push -u origin main"
echo ""
echo "3. V GitHub repozitáři nastavte Secrets:"
echo "   Settings → Secrets and variables → Actions → New repository secret"
echo "   - SUPABASE_URL"
echo "   - SUPABASE_ANON_KEY"
echo ""
echo "4. Povolte GitHub Pages:"
echo "   Settings → Pages → Source: GitHub Actions"
echo ""
echo "5. Push automaticky spustí deployment! 🎉"

