-- Šuplík - Supabase Database Setup
-- Spusťte tento SQL v Supabase SQL Editor

-- 1. Vytvoření tabulky ideas
CREATE TABLE IF NOT EXISTS ideas (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  text TEXT NOT NULL
);

-- 2. Povolení Row Level Security (RLS)
ALTER TABLE ideas ENABLE ROW LEVEL SECURITY;

-- 3. Politika pro čtení - všichni mohou číst nápady
CREATE POLICY "Enable read access for all users" ON ideas
FOR SELECT USING (true);

-- 4. Politika pro vkládání - všichni mohou přidávat nápady
CREATE POLICY "Enable insert for all users" ON ideas
FOR INSERT WITH CHECK (true);

-- 5. (Volitelné) Politika pro mazání - přidejte později pokud chcete
-- CREATE POLICY "Enable delete for authenticated users only" ON ideas
-- FOR DELETE USING (auth.role() = 'authenticated');

-- 6. Testovací data (volitelné)
INSERT INTO ideas (text) VALUES
  ('Vytvořit aplikaci pro správu nápadů'),
  ('Naučit se Supabase'),
  ('Nasadit na GitHub Pages');

-- 7. Ověření
SELECT * FROM ideas ORDER BY created_at DESC;

