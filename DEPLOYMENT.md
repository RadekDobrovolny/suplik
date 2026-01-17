# 🚀 Průvodce nasazením na GitHub Pages

## Krok 1: Příprava Supabase databáze

1. Přihlaste se do [Supabase Dashboard](https://app.supabase.com)
2. Vytvořte nový projekt (nebo použijte existující)
3. Otevřete **SQL Editor**
4. Zkopírujte a spusťte obsah souboru `supabase-setup.sql`
5. Ověřte, že tabulka `ideas` byla vytvořena

## Krok 2: Získání API údajů

1. V Supabase Dashboard jděte do **Settings → API**
2. Zkopírujte si:
   - **Project URL** (např. `https://xxxxx.supabase.co`)
   - **anon/public key** (dlouhý token začínající `eyJhbGc...`)

## Krok 3: Lokální testování (volitelné)

1. Vyplňte údaje do `config.js`:
```javascript
const SUPABASE_CONFIG = {
    url: 'https://xxxxx.supabase.co',
    anonKey: 'eyJhbGc...'
};
```

2. Spusťte lokální server:
```bash
python3 -m http.server 8000
```

3. Otevřete http://localhost:8000/ a vyzkoušejte přidání nápadu

## Krok 4: Vytvoření GitHub repozitáře

### Pomocí skriptu (doporučeno):
```bash
./setup-github.sh
```

### Manuálně:
```bash
git init
git branch -M main
git add .
git commit -m "Initial commit - Šuplík app"
```

Pak jděte na https://github.com/new a vytvořte nový repozitář

```bash
git remote add origin https://github.com/USERNAME/suplik.git
git push -u origin main
```

## Krok 5: Nastavení GitHub Secrets

1. Jděte do vašeho repozitáře na GitHubu
2. **Settings** → **Secrets and variables** → **Actions**
3. Klikněte **New repository secret**
4. Přidejte první secret:
   - Name: `SUPABASE_URL`
   - Secret: vaše Supabase Project URL
   - Klikněte **Add secret**
5. Přidejte druhý secret:
   - Name: `SUPABASE_ANON_KEY`
   - Secret: váš anon/public key
   - Klikněte **Add secret**

## Krok 6: Povolení GitHub Pages

1. V repozitáři jděte do **Settings** → **Pages**
2. V sekci **Source** vyberte: **GitHub Actions**
3. Klikněte **Save**

## Krok 7: Spuštění deployment

1. Jděte do záložky **Actions** ve vašem repozitáři
2. Měli byste vidět workflow "Deploy to GitHub Pages"
3. Pokud ještě neběží, klikněte na **Run workflow**
4. Počkejte pár sekund až deployment doběhne (zelená fajfka ✅)

## Krok 8: Otevřete aplikaci! 🎉

Vaše aplikace bude dostupná na:
```
https://USERNAME.github.io/suplik/
```

(Kde USERNAME je vaše GitHub uživatelské jméno)

---

## 🐛 Řešení problémů

### Deployment selhal?
- Zkontrolujte, že jste správně nastavili oba Secrets
- Ověřte, že názvy secrets jsou přesně `SUPABASE_URL` a `SUPABASE_ANON_KEY`
- Zkontrolujte logy v záložce Actions

### Aplikace se nenačítá?
- Otevřete Developer Console (F12)
- Zkontrolujte chybové hlášky
- Ověřte, že RLS policies jsou správně nastavené v Supabase

### Nejdou přidávat nápady?
- Zkontrolujte INSERT policy v Supabase
- Spusťte SQL: `SELECT * FROM ideas;` v SQL Editoru
- Ověřte, že máte správný anon key v Secrets

---

## 📝 Aktualizace aplikace

Po jakékoli změně v kódu:

```bash
git add .
git commit -m "Popis změny"
git push
```

GitHub Actions automaticky nasadí novou verzi! 🚀

