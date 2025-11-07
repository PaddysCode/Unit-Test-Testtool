import React, { memo } from 'react'; // memo ist optional, aber empfohlen
import Header from './Components/header';
import Footer from './Components/footer';
import GeneratorPage from './Pages/GeneratorPage';

// 1. Definition des Typs: Ein Objekt mit dem Schlüssel 'appContainer', dessen Wert ein CSS-Objekt ist.
type AppStyles = Record<'appContainer', React.CSSProperties>;

const App: React.FC = () => {
  
  // 2. Korrektur: Die styles-Variable erhält nun den korrekten Typ AppStyles
  const styles: AppStyles = { 
    appContainer: {
      backgroundColor: '#1E1E1E', 
      color: '#FFFFFF',          
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'Arial, sans-serif',
    },
  };

  return (
    <div style={styles.appContainer}>
      <Header />
      <GeneratorPage />
      <Footer />
    </div>
  );
};

export default memo(App);