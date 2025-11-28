import React from 'react';
import { IconContext } from 'react-icons'; 
import { VscCode, VscBeaker } from 'react-icons/vsc'; 

const Header: React.FC = () => {
  const styles: { [key: string]: React.CSSProperties } = {
    header: {
      padding: '20px 40px',
      textAlign: 'center',
      borderBottom: '1px solid #333',
    },
    title: {
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '5px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    subtitle: {
      fontSize: '16px',
      color: '#B0B0B0',
    },
  };

  return (
    <header style={styles.header}>
      {/* IconContext wird verwendet, um Icons einheitlich zu stylen (optional) */}
      <IconContext.Provider value={{ style: { margin: '0 10px' } }}>
        <div style={styles.title}>
          <VscCode />
          Unit Test Generator
          <VscBeaker />
        </div>
      </IconContext.Provider>
      <p style={styles.subtitle}>
        Geben Sie Ihre Methoden und Klassen ein und erhalten Sie automatisch generierte Unit Tests
      </p>
    </header>
  );
}; 

export default Header; 

