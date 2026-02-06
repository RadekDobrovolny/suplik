let pbClient = null;

// Inicializace a načtení dat při startu
window.addEventListener('DOMContentLoaded', () => {
    initPocketBase();
    loadIdeas();
});

function initPocketBase() {
    if (!POCKETBASE_CONFIG.url) {
        showStatus('Chyba: Není nakonfigurován PocketBase. Zkontrolujte config.js', 'error');
        return;
    }

    if (POCKETBASE_CONFIG.url === 'YOUR_POCKETBASE_URL') {
        showStatus('Prosím, nakonfigurujte PocketBase URL v souboru config.js', 'error');
        return;
    }

    try {
        pbClient = new PocketBase(POCKETBASE_CONFIG.url);
    } catch (error) {
        showStatus(`Chyba při inicializaci: ${error.message}`, 'error');
    }
}

function showStatus(message, type) {
    const statusDiv = document.getElementById('status');
    statusDiv.textContent = message;
    statusDiv.className = type;
    statusDiv.style.display = 'block';
}

function hideStatus() {
    const statusDiv = document.getElementById('status');
    statusDiv.style.display = 'none';
}

async function addIdea() {
    if (!pbClient) {
        showStatus('Chyba: PocketBase není inicializován', 'error');
        return;
    }

    const textarea = document.getElementById('newIdeaText');
    const button = document.getElementById('addIdeaBtn');
    const text = textarea.value.trim();

    if (!text) {
        showStatus('Prosím, napište nějaký nápad', 'error');
        textarea.focus();
        return;
    }

    // Zakázání tlačítka během odesílání
    button.disabled = true;
    button.textContent = '⏳ Přidávám...';

    try {
        const record = await pbClient.collection('ideas').create({
            text: text
        });

        showStatus('✅ Nápad byl úspěšně přidán!', 'success');
        textarea.value = ''; // Vyčistit pole

        // Znovu načíst všechny nápady
        await loadIdeas();

        // Skrýt status po 3 sekundách
        setTimeout(hideStatus, 3000);

    } catch (error) {
        showStatus(`Chyba při přidávání nápadu: ${error.message}`, 'error');
        console.error('Chyba při přidávání nápadu:', error);
    } finally {
        button.disabled = false;
        button.textContent = '➕ Přidat nápad';
    }
}

async function loadIdeas() {
    if (!pbClient) {
        return;
    }

    const container = document.getElementById('ideasContainer');

    try {
        // Načtení nápadů z kolekce ideas, seřazeno od nejnovějších
        const records = await pbClient.collection('ideas').getFullList({
            sort: '-created',
        });

        if (records && records.length > 0) {
            hideStatus();
            displayIdeas(records);
        } else {
            container.innerHTML = '<p class="loading-message">Zatím žádné nápady 💭</p>';
        }

    } catch (error) {
        showStatus(`Chyba při načítání nápadů: ${error.message}`, 'error');
        console.error('Chyba při načítání nápadů:', error);
        container.innerHTML = '<p class="loading-message" style="color: #f8d7da;">Nepodařilo se načíst nápady</p>';
    }
}

function displayIdeas(ideas) {
    const container = document.getElementById('ideasContainer');

    if (!ideas || ideas.length === 0) {
        container.innerHTML = '<p class="loading-message">Zatím žádné nápady 💭</p>';
        return;
    }

    let html = '';

    ideas.forEach(idea => {
        const date = new Date(idea.created);
        const formattedDate = date.toLocaleDateString('cs-CZ', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });

        html += `
            <div class="idea-card">
                <div class="idea-text">${escapeHtml(idea.text)}</div>
                <div class="idea-meta">
                    <span class="idea-id">ID: ${idea.id}</span>
                    <span class="idea-date">📅 ${formattedDate}</span>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
}

function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}