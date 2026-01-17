# Šuplík 💡

Webová aplikace pro ukládání a zobrazení nápadů ze Supabase databáze.

## 🚀 Rychlý start

### Lokální vývoj

1. **Vyplňte Supabase údaje** v souboru `config.js`:
   ```javascript
   const SUPABASE_CONFIG = {
       url: 'https://xxxxxxxxxxxxx.supabase.co',
       anonKey: 'vaše-anon-key'
   };
   ```

2. **Spusťte lokální server**:
   ```bash
   python3 -m http.server 8000
   ```

3. Otevřete: http://localhost:8000/

### Deployment na GitHub Pages

1. **Vytvořte GitHub repozitář** a nahrajte kód

2. **Nastavte GitHub Secrets** v repozitáři:
   - Jděte do: Settings → Secrets and variables → Actions → New repository secret
   - Přidejte tyto dva secrets:
     - `SUPABASE_URL` - vaše Supabase Project URL
     - `SUPABASE_ANON_KEY` - váš anon/public key

3. **Povolte GitHub Pages v Actions**:
   - Settings → Pages
   - Source: "GitHub Actions"

4. **Push do main branch** - automaticky se spustí deployment!

GitHub Actions workflow automaticky vytvoří `config.js` ze secrets a nasadí aplikaci.

## 🗄️ Databázová struktura

Tabulka `ideas` musí obsahovat:
```sql
CREATE TABLE ideas (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  text TEXT NOT NULL
);
```

## 🔒 Row Level Security (RLS)

Pro bezpečný přístup nastavte RLS policies:

```sql
-- Povolení čtení pro všechny
CREATE POLICY "Enable read access for all users" ON ideas
FOR SELECT USING (true);

-- Povolení vkládání pro všechny
CREATE POLICY "Enable insert for all users" ON ideas
FOR INSERT WITH CHECK (true);
```

## 📁 Struktura projektu

```
suplik/
├── .github/
│   └── workflows/
│       └── deploy.yml       # GitHub Actions workflow
├── index.html               # HTML struktura
├── styles.css               # Styly pro karty nápadů
├── script.js                # Logika načítání dat
├── config.js                # Konfigurace Supabase (pro lokální vývoj)
├── .gitignore               # Ignoruje config.js
└── README.md                # Dokumentace
```

## ✨ Funkce

- 💡 Přidávání nových nápadů
- 📋 Zobrazení nápadů ve čtverečcích (cards)
- 📅 Řazení od nejnovějších
- 🎨 Barevné karty s různými akcenty
- 📱 Responsivní design
- ⚡ Automatické načítání při startu
- 🔒 Bezpečné připojení přes GitHub Secrets

## 🔐 Bezpečnost

- **Anon key je bezpečný** pro použití v prohlížeči - je navržen právě pro tento účel
- Bezpečnost řídíte přes **Row Level Security (RLS)** v Supabase
- GitHub Secrets chrání vaše údaje v repozitáři
- `config.js` není v Git historii (díky .gitignore)

## 🛠️ Technologie

- Vanilla JavaScript (žádné framework závislosti!)
- Supabase JS Client
- GitHub Pages + GitHub Actions
- CSS Grid Layout

