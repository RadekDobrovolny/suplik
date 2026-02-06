# Šuplík 💡

Webová aplikace pro ukládání a zobrazení nápadů z PocketBase databáze.

## 🚀 Rychlý start

### Lokální vývoj

1. **Vyplňte PocketBase URL** v souboru `config.js`:
   ```javascript
   const POCKETBASE_CONFIG = {
       url: 'https://pocketbase.hippou.cz'
   };
   ```

2. **Spusťte lokální server**:
   ```bash
   python3 -m http.server 8000
   ```

3. Otevřete: http://localhost:8000/

### Deployment na GitHub Pages

1. **Vytvořte GitHub repozitář** a nahrajte kód

2. **Povolte GitHub Pages v Actions**:
   - Settings → Pages
   - Source: "GitHub Actions"

3. **Push do main branch** - automaticky se spustí deployment!

GitHub Actions workflow nasadí aplikaci včetně `config.js` s URL PocketBase serveru.

## 🗄️ Databázová struktura

Kolekce `ideas` v PocketBase obsahuje:
- `id` (automaticky generované)
- `created` (automaticky generované)
- `updated` (automaticky generované)
- `text` (Text pole) - samotný nápad

### Vytvoření kolekce v PocketBase

1. Přihlaste se do PocketBase Admin UI: `https://vase-url/_/`
2. Vytvořte novou kolekci `ideas`
3. Přidejte pole:
   - `text` (typ: Text, povinné)
4. Pole `id`, `created` a `updated` se vytvoří automaticky

## 🔒 API Rules (oprávnění)

Pro veřejný přístup nastavte v Admin UI → Collections → ideas → API Rules:

- **List/Search rule**: prázdné (veřejné čtení)
- **View rule**: prázdné (veřejné zobrazení)
- **Create rule**: prázdné (veřejné přidávání)
- **Update rule**: `@request.auth.id != ""` (jen přihlášení)
- **Delete rule**: `@request.auth.id != ""` (jen přihlášení)

**Prázdné pole = veřejný přístup pro všechny**

## 📁 Struktura projektu

```
suplik/
├── .github/
│   └── workflows/
│       └── deploy.yml       # GitHub Actions workflow
├── index.html               # HTML struktura
├── styles.css               # Styly pro karty nápadů
├── script.js                # Logika načítání dat
├── config.js                # Konfigurace PocketBase
└── README.md                # Dokumentace
```

## ✨ Funkce

- 💡 Přidávání nových nápadů
- 📋 Zobrazení nápadů ve čtverečcích (cards)
- 📅 Řazení od nejnovějších
- 🎨 Barevné karty s různými akcenty
- 📱 Responsivní design
- ⚡ Automatické načítání při startu
- 🔒 Bezpečné připojení s kontrolou přístupu

## 🔐 Bezpečnost

- **PocketBase URL je veřejná** - bezpečnost řídíte přes **API Rules** v PocketBase Admin UI
- Oprávnění nastavujete přímo v databázi, ne v klientském kódu
- Žádné API klíče nejsou potřeba pro veřejné operace
- Pro admin operace je PocketBase chráněno vlastním přihlášením

## 🛠️ Technologie

- Vanilla JavaScript (žádné framework závislosti!)
- PocketBase JS SDK
- GitHub Pages + GitHub Actions
- CSS Grid Layout

## 🔄 Migrace ze Supabase

Pokud migrujete ze Supabase:
1. Exportujte data ze Supabase tabulky `ideas`
2. Importujte do PocketBase kolekce `ideas`
3. Přejmenujte pole `created_at` na `created` (PocketBase standard)
4. Nahraďte Supabase JS knihovnu za PocketBase SDK v HTML
5. Upravte `script.js` podle nové API (viz výše)
6. Nastavte API Rules v PocketBase Admin UI