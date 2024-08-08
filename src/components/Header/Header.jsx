import { useContext } from 'react';
import { ContrastContext } from '../../context/ContrastContext';
import styles from './styles.module.css';
import dark from './dark.module.css'
import { useFontSizeContext } from '../../context/FontSizeContext';
import { BsFillMoonStarsFill } from "react-icons/bs";
import { FaSun } from "react-icons/fa";

const Header = () => {
  const contrastContext = useContext(ContrastContext);
  const { increaseFontSize, decreaseFontSize } = useFontSizeContext();

  if (!contrastContext) {
    throw new Error('LoginHeader must be used within a ContrastProvider');
  }

  const { isHighContrast, toggleContrast } = contrastContext;

  return (
    <header className={styles.acessibilidade}>
      <button onClick={increaseFontSize} className={`${styles.font} ${isHighContrast ? dark.font : ''}`}>A+</button>
      <button onClick={decreaseFontSize} className={`${styles.font} ${isHighContrast ? dark.font : ''}`}>A-</button>
      {isHighContrast ? 
            <FaSun onClick={toggleContrast} size={30} style={{ color: '#E6D6C1', cursor: 'pointer' }} /> :
            <BsFillMoonStarsFill onClick={toggleContrast} size={30} style={{ color: '#0C1A24', cursor: 'pointer' }} />}
    </header>
  );
};

export default Header;