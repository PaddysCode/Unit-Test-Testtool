import React, { useState } from 'react';
import { VscOutput, VscRunAll, VscTrash } from 'react-icons/vsc';
import './Generatorpage.css';
import { sendPromptToGPT } from '../API/ModellsAPI';
import { sendPromptToGemini } from '../API/ModellsAPI';
import { sendPromptToClaude } from '../API/ModellsAPI'; 


const GeneratorPage: React.FC = () => {
  
  const [code, setCode] = useState<string>(`Beispiel:
function calculateSum(a, b) {
  return a + b;
}

class Calculator {
  add(a, b) {
    return a + b;
  }
  

  multiply(a, b) {
    return a * b;
  }
}`);



  const [generatedTests, setGeneratedTests] = useState<string>('Hier erscheinen die generierten Unit Tests...');

  const [selectedModel, setSelectedModel] = useState<string>('ChatGPT');

  const handleGenerateTests = async () => {

    try {

      setGeneratedTests('Generiere Tests, bitte warten...');

      let tests: string | undefined;

       switch (selectedModel) {
        case 'chatgpt':
          tests = await sendPromptToGPT(code);
          break;
        case 'gemini':
          tests = await sendPromptToGemini(code);
          break;
        case 'claude':
          tests = await sendPromptToClaude(code);
          break;
        default:
          throw new Error('Unbekanntes Modell ausgewählt.');
      }
    
      console.log('Tests generieren für:', code);
      setGeneratedTests(tests || 'Keine Tests generiert.');
    } 
    catch (error) {
      console.error('Fehler beim Generieren der Tests:', error);
      setGeneratedTests(`Fehler beim Generieren der Tests: ${error}`);
    }
  };


  const handleClearCode = () => {
      setCode('');
  }

  return (
    <main className='main-content'>
      {/* Linke Spalte: Code-Eingabe */}
      <div className='panel'>
        <div className='panel-header code'>
          Code Eingabe
        </div>
        <div className='code-input-container'>
          <textarea
            className='text-area'
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Geben Sie hier Ihre Methoden, Funktionen oder Klassen ein..."
          />
          <div className='button-container'>
                        <select
              className="model-select"
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              title="KI-Modell auswählen"
            >
              <option value="chatgpt">ChatGPT</option>
              <option value="claude">Claude</option>
              <option value="gemini">Gemini</option>
            </select>
            
            <button
              className='generate-button'
              onClick={handleGenerateTests}
            >
              <VscRunAll style={{ marginRight: '8px' }} />
              Tests Generieren
            </button>
            {/* Löschen-Button */}
            <button 
                className='delete-button'
                onClick={handleClearCode} 
                title="Eingabe löschen"
            >
                <VscTrash /> 
            </button>
          </div>
        </div>
      </div>

      {/* Rechte Spalte: Generierte Unit Tests */}
      <div className='panel'>
        <div className='paneld-header output'>
          <VscOutput style={{ marginRight: '10px' }} />
          Generierte Unit Tests
        </div>
        <textarea
          className='text-area'
          value={generatedTests}
          readOnly
          placeholder="Hier erscheinen die generierten Unit Tests..."
        />
      </div>
    </main>
  );
};

export default GeneratorPage;

