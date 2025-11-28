require('dotenv').config(); 
const express = require('express');
const app = express();
const port = 3000;


const OpenAI = require('openai');
const { GoogleGenerativeAI } = require("@google/generative-ai");

app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});


app.post('/api/ki/openai-chat', async (req, res) => {
    const { prompt, temperature } = req.body;

    if (!prompt) {
        return res.status(400).json({ error: 'Prompt ist erforderlich.' });
    }

    
    const STATIC_SYSTEM_PROMPT = "Du bist ein Senior Software Engineer und Experte für Frontend Unit Tests (Jest & React Testing Library). Schreibe präzisen, modernen Code.";

    console.log(`🤖 Anfrage an OpenAI`);

    try {
        if (!process.env.OPENAI_API_KEY) {
            throw new Error("OPENAI_API_KEY fehlt in der .env Datei");
        }

        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });

        const response = await openai.chat.completions.create({
            model: "gpt-5.1",
            messages: [
                { 
                    role: 'system', 
                    content: STATIC_SYSTEM_PROMPT 
                },
                { 
                    role: 'user', 
                    content: prompt 
                }
            ],

            temperature: temperature !== undefined ? parseFloat(temperature) : 0.2,
        });

        const text = response.choices[0].message.content;

        res.json({
            model: "gpt-5.1",
            text: text
        });
        
    } catch (error) {
        console.error(`❌ Fehler bei OpenAI:`, error.message);
        res.status(500).json({ error: 'API Fehler', details: error.message });
    }
});



app.post('/api/ki/gemini', async (req, res) => {
    
    const { prompt, temperature } = req.body;

    if (!prompt) {
        return res.status(400).json({ error: 'Prompt ist erforderlich.' });
    }

    console.log(`🤖 Anfrage an Gemini 3 Pro. Temp: ${temperature || 0.2}`);

    try {
        if (!process.env.GEMINI_API_KEY) {
            throw new Error("GEMINI_API_KEY fehlt in der .env Datei");
        }

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

        const model = genAI.getGenerativeModel({ 
      
            model: "gemini-3-pro-preview", 

            systemInstruction: "Du bist ein Senior Software Engineer und Experte für Frontend Unit Tests.",
            
            generationConfig: { 
                temperature: temperature !== undefined ? parseFloat(temperature) : 0.2, 
            }
        });

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        res.json({
            model: 'Gemini 3 Pro',
            text: text
        });

    } catch (error) {
        console.error('❌ Gemini Fehler:', error);

        if (error.message.includes('404') || error.message.includes('not found')) {
             res.status(500).json({ error: 'Modell gemini-3-pro-preview nicht gefunden. Prüfe deinen API Key oder nutze gemini-1.5-pro.' });
        } else {
             res.status(500).json({ error: 'Fehler bei der Anfrage', details: error.message });
        }
    }
});


app.post('/api/ki/claude', async (req, res) => {
    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ error: 'Prompt ist erforderlich.' });
    }
    
    console.log(`Anfrage an OpenAI/GPT erhalten: ${prompt.substring(0, 50)}...`);

    try {
        const fakresponse = "Dies ist eine gefälschte Antwort von der Anfrage an Model 3 für Testzwecke.";
        res.json({
            model: 'OpenAI/GPT',
            text: fakresponse 
        });
    } catch (error) {
        console.error('OpenAI API Fehler:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Fehler bei der OpenAI-Anfrage.', details: error.message });
    }
});


app.listen(port, () => {
  console.log(`\n🚀 KI-Proxy läuft auf http://localhost:${port}`);
  console.log('📡 Verfügbare Endpunkte:');
  console.log('   🔹 /api/ki/openai-chat');
  console.log('   🔹 /api/ki/gemini');
  console.log('   🔹 /api/ki/claude');
});
