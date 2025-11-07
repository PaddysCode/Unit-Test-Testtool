// Lädt die Umgebungsvariablen (API-Keys) aus der .env-Datei
require('dotenv').config(); 
const express = require('express');
const app = express();
const port = 3000;

// --- Importiere den OpenAI Client ---
const OpenAI = require('openai');

// 1. Initialisierung des OpenAI Clients
// Der Schlüssel wird automatisch aus process.env.OPENAI_API_KEY verwendet.
//const openai = new OpenAI(); 

// --- Middleware ---
// Erlaubt dem Server, JSON-Anfragen zu verarbeiten
app.use(express.json());

// Setze CORS-Header (WICHTIG für Frontend-Zugriff)
// Ersetze '*' durch deine spezifische Frontend-URL im Produktiveinsatz!
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// ----------------------------------------------------
// 2. Endpunkt für OpenAI (/api/ki/openai-chat)
// ----------------------------------------------------
// Dieser Endpunkt ist jetzt die einzige KI-Schnittstelle
app.post('/api/ki/openai-chat', async (req, res) => {
    // Nimmt den 'prompt' aus dem Body der Frontend-Anfrage entgegen
    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ error: 'Prompt ist erforderlich.' });
    }
    
    console.log(`Anfrage an OpenAI/GPT erhalten: ${prompt.substring(0, 50)}...`);

    try {
        // const response = await openai.chat.completions.create({
        //     // Du kannst hier auch 'gpt-4o' oder 'gpt-4-turbo' verwenden, falls du Zugriff hast
        //     model: 'gpt-3.5-turbo', 
        //     messages: [{ role: 'user', content: prompt }],
        // });
        const fakresponse = "Dies ist eine gefälschte Antwort von der Anfrage an Model 1 für Testzwecke.";
        // Schickt die generierte Antwort zurück an das Frontend
        res.json({
            model: 'OpenAI/GPT',
            text: fakresponse //response.choices[0].message.content,
        });
        
    } catch (error) {
        // Gibt eine detaillierte Fehlermeldung auf der Konsole aus
        console.error('OpenAI API Fehler:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Fehler bei der OpenAI-Anfrage.', details: error.message });
    }
});

app.post('/api/ki/gemini', async (req, res) => {
    // Nimmt den 'prompt' aus dem Body der Frontend-Anfrage entgegen
    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ error: 'Prompt ist erforderlich.' });
    }
    
    console.log(`Anfrage an OpenAI/GPT erhalten: ${prompt.substring(0, 50)}...`);

    try {
        // const response = await openai.chat.completions.create({
        //     // Du kannst hier auch 'gpt-4o' oder 'gpt-4-turbo' verwenden, falls du Zugriff hast
        //     model: 'gpt-3.5-turbo', 
        //     messages: [{ role: 'user', content: prompt }],
        // });
        const fakresponse = "Dies ist eine gefälschte Antwort von der Anfrage an Model 2 für Testzwecke.";
        // Schickt die generierte Antwort zurück an das Frontend
        res.json({
            model: 'OpenAI/GPT',
            text: fakresponse //response.choices[0].message.content,
        });
        
    } catch (error) {
        // Gibt eine detaillierte Fehlermeldung auf der Konsole aus
        console.error('OpenAI API Fehler:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Fehler bei der OpenAI-Anfrage.', details: error.message });
    }
});


app.post('/api/ki/claude', async (req, res) => {
    // Nimmt den 'prompt' aus dem Body der Frontend-Anfrage entgegen
    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ error: 'Prompt ist erforderlich.' });
    }
    
    console.log(`Anfrage an OpenAI/GPT erhalten: ${prompt.substring(0, 50)}...`);

    try {
        // const response = await openai.chat.completions.create({
        //     // Du kannst hier auch 'gpt-4o' oder 'gpt-4-turbo' verwenden, falls du Zugriff hast
        //     model: 'gpt-3.5-turbo', 
        //     messages: [{ role: 'user', content: prompt }],
        // });
        const fakresponse = "Dies ist eine gefälschte Antwort von der Anfrage an Model 3 für Testzwecke.";
        // Schickt die generierte Antwort zurück an das Frontend
        res.json({
            model: 'OpenAI/GPT',
            text: fakresponse //response.choices[0].message.content,
        });
        
    } catch (error) {
        // Gibt eine detaillierte Fehlermeldung auf der Konsole aus
        console.error('OpenAI API Fehler:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Fehler bei der OpenAI-Anfrage.', details: error.message });
    }
});



// ----------------------------------------------------
// Server starten
// ----------------------------------------------------
app.listen(port, () => {
  console.log(`\n🚀 KI-Proxy läuft auf http://localhost:${port}`);
  console.log('📡 Verfügbare Endpunkte:');
  console.log('   🔹 /api/ki/openai-chat');
  console.log('   🔹 /api/ki/gemini');
  console.log('   🔹 /api/ki/claude');
});
