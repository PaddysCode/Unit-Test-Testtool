import React from 'react';
import { VscInfo } from 'react-icons/vsc';

const Footer: React.FC = () => {
  const styles: { [key: string]: React.CSSProperties } = {
    footer: {
      padding: '20px 40px',
      marginTop: 'auto', 
      borderTop: '1px solid #333',
      fontSize: '14px',
      color: '#B0B0B0',
    },
    instructionTitle: {
      fontWeight: 'bold',
      color: '#FFFFFF',
      display: 'flex',
      alignItems: 'center',
    },
  };

  return (
    <footer style={styles.footer}>
      <div style={styles.instructionTitle}>
        <VscInfo style={{ marginRight: '5px', color: '#6A5ACD' }} />
        Anleitung
      </div>
      {/* Hier könnten die eigentlichen Anweisungen stehen */}
    </footer>
  );
};

export default Footer;