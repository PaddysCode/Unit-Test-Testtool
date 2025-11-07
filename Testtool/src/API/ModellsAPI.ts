// Definiere die URL deines Node.js Proxys
// Da der Proxy auf Port 3000 läuft, sprichst du ihn so an:
const PROXY_CHATGPT_URL = 'http://localhost:3000/api/ki/openai-chat';
const PROXY_GEMINI_URL = 'http://localhost:3000/api/ki/gemini';
const PROXY_CLAUDE_URL = 'http://localhost:3000/api/ki/claude';

/**
 * Sendet den Benutzer-Prompt an den Node.js Proxy und ruft die GPT-Antwort ab.
 * @param {string} userPrompt - Die Eingabe des Benutzers.
 */
export async function sendPromptToGPT(userPrompt: string) {
    if (!userPrompt) {
        console.error("Bitte eine Eingabe machen.");
        return;
    }

    try {
        console.log("Sende Anfrage an Proxy...");
        
        // 1. Die POST-Anfrage an deinen Proxy
        const response = await fetch(PROXY_CHATGPT_URL, {
            method: 'POST', // Muss POST sein, wie in server.js definiert
            headers: {
                // Sagt dem Server, dass der Body JSON-Daten enthält
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({
                // Die Nutzereingabe wird im 'prompt'-Feld gesendet, 
                // da dein Backend es als 'req.body.prompt' erwartet.
                prompt: userPrompt 
            })
        });

        // Prüfen auf HTTP-Fehler (z.B. 400, 500)
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Proxy-Fehler: ${response.status} - ${errorData.error}`);
        }

        // 2. Die JSON-Antwort vom Proxy verarbeiten
        const data = await response.json();
        
        // Die Antwort enthält 'text' und 'model' aus deinem Proxy
        const kiAntwort = data.text;
        const modellName = data.model;

        console.log(`Antwort von ${modellName}:`, kiAntwort);
        
        // Hier würdest du die Antwort im DOM (HTML) anzeigen
        return kiAntwort;

    } catch (error) {
        console.error("Fehler beim Abrufen der KI-Antwort:", error);
        // Zeige einen Fehler im Frontend an
        return `Fehler: ${error}`;
    }
}


/**
 * Sendet den Benutzer-Prompt an den Node.js Proxy und ruft die GPT-Antwort ab.
 * @param {string} userPrompt - Die Eingabe des Benutzers.
 */
export async function sendPromptToGemini(userPrompt: string) {
    if (!userPrompt) {
        console.error("Bitte eine Eingabe machen.");
        return;
    }

    try {
        console.log("Sende Anfrage an Proxy...");
        
        // 1. Die POST-Anfrage an deinen Proxy
        const response = await fetch(PROXY_GEMINI_URL, {
            method: 'POST', // Muss POST sein, wie in server.js definiert
            headers: {
                // Sagt dem Server, dass der Body JSON-Daten enthält
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({
                // Die Nutzereingabe wird im 'prompt'-Feld gesendet, 
                // da dein Backend es als 'req.body.prompt' erwartet.
                prompt: userPrompt 
            })
        });

        // Prüfen auf HTTP-Fehler (z.B. 400, 500)
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Proxy-Fehler: ${response.status} - ${errorData.error}`);
        }

        // 2. Die JSON-Antwort vom Proxy verarbeiten
        const data = await response.json();
        
        // Die Antwort enthält 'text' und 'model' aus deinem Proxy
        const kiAntwort = data.text;
        const modellName = data.model;

        console.log(`Antwort von ${modellName}:`, kiAntwort);
        
        // Hier würdest du die Antwort im DOM (HTML) anzeigen
        return kiAntwort;

    } catch (error) {
        console.error("Fehler beim Abrufen der KI-Antwort:", error);
        // Zeige einen Fehler im Frontend an
        return `Fehler: ${error}`;
    }
}

/**
 * Sendet den Benutzer-Prompt an den Node.js Proxy und ruft die GPT-Antwort ab.
 * @param {string} userPrompt - Die Eingabe des Benutzers.
 */
export async function sendPromptToClaude(userPrompt: string) {
    if (!userPrompt) {
        console.error("Bitte eine Eingabe machen.");
        return;
    }

    try {
        console.log("Sende Anfrage an Proxy...");
        
        // 1. Die POST-Anfrage an deinen Proxy
        const response = await fetch(PROXY_CLAUDE_URL, {
            method: 'POST', // Muss POST sein, wie in server.js definiert
            headers: {
                // Sagt dem Server, dass der Body JSON-Daten enthält
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({
                // Die Nutzereingabe wird im 'prompt'-Feld gesendet, 
                // da dein Backend es als 'req.body.prompt' erwartet.
                prompt: userPrompt 
            })
        });

        // Prüfen auf HTTP-Fehler (z.B. 400, 500)
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Proxy-Fehler: ${response.status} - ${errorData.error}`);
        }

        // 2. Die JSON-Antwort vom Proxy verarbeiten
        const data = await response.json();
        
        // Die Antwort enthält 'text' und 'model' aus deinem Proxy
        const kiAntwort = data.text;
        const modellName = data.model;

        console.log(`Antwort von ${modellName}:`, kiAntwort);
        
        // Hier würdest du die Antwort im DOM (HTML) anzeigen
        return kiAntwort;

    } catch (error) {
        console.error("Fehler beim Abrufen der KI-Antwort:", error);
        // Zeige einen Fehler im Frontend an
        return `Fehler: ${error}`;
    }
}


