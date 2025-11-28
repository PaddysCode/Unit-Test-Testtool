const PROXY_CHATGPT_URL = 'http://localhost:3000/api/ki/openai-chat';
const PROXY_GEMINI_URL = 'http://localhost:3000/api/ki/gemini';
const PROXY_CLAUDE_URL = 'http://localhost:3000/api/ki/claude';

export async function sendPromptToGPT(userPrompt: string, temperature: number) {
    if (!userPrompt) {
        console.error("Bitte eine Eingabe machen.");
        return;
    }

    try {
        console.log("Sende Anfrage an Proxy...");
        
        const response = await fetch(PROXY_CHATGPT_URL, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({
               
                prompt: userPrompt,
                temperature: temperature

            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Proxy-Fehler: ${response.status} - ${errorData.error}`);
        }

        const data = await response.json();
        
        // Die Antwort enthält 'text' und 'model' aus deinem Proxy
        const kiAntwort = data.text;
        const modellName = data.model;

        console.log(`Antwort von ${modellName}:`, kiAntwort);
        
        return kiAntwort;

    } catch (error) {
        console.error("Fehler beim Abrufen der KI-Antwort:", error);
        return `Fehler: ${error}`;
    }
}



export async function sendPromptToGemini(userPrompt: string, temperature: number) {
    if (!userPrompt) {
        console.error("Bitte eine Eingabe machen.");
        return;
    }

    try {
        console.log("Sende Anfrage an Proxy...");
    
        const response = await fetch(PROXY_GEMINI_URL, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({

                prompt: userPrompt,
                temperature: temperature

            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Proxy-Fehler: ${response.status} - ${errorData.error}`);
        }

        const data = await response.json();
        
        // Die Antwort enthält 'text' und 'model' aus deinem Proxy
        const kiAntwort = data.text;
        const modellName = data.model;

        console.log(`Antwort von ${modellName}:`, kiAntwort);
        
        return kiAntwort;

    } catch (error) {
        console.error("Fehler beim Abrufen der KI-Antwort:", error);
        return `Fehler: ${error}`;
    }
}


export async function sendPromptToClaude(userPrompt: string, temperature: number) {
    if (!userPrompt) {
        console.error("Bitte eine Eingabe machen.");
        return;
    }

    try {
        console.log("Sende Anfrage an Proxy...");
        
        const response = await fetch(PROXY_CLAUDE_URL, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({

                prompt: userPrompt,
                temperature: temperature
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Proxy-Fehler: ${response.status} - ${errorData.error}`);
        }

        const data = await response.json();
        
        // Die Antwort enthält 'text' und 'model' aus deinem Proxy
        const kiAntwort = data.text;
        const modellName = data.model;

        console.log(`Antwort von ${modellName}:`, kiAntwort);
        
        return kiAntwort;

    } catch (error) {
        console.error("Fehler beim Abrufen der KI-Antwort:", error);
        return `Fehler: ${error}`;
    }
}


