import { useContext } from 'react';
import { ContrastContext } from '../../context/ContrastContext';
import styles from './styles.module.css';
import dark from './dark.module.css'
import { useFontSizeContext } from '../../context/FontSizeContext';
import logo from '../../assets/novaLogoDark.png'
import logoDark from '../../assets/novaLogoTaskHive.png'
import { BiSolidHelpCircle } from "react-icons/bi";
import { BiSolidBellRing } from "react-icons/bi";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { FaSun } from "react-icons/fa";

const HeaderDefault = () => {
  const contrastContext = useContext(ContrastContext);
  const { increaseFontSize, decreaseFontSize } = useFontSizeContext();

  if (!contrastContext) {
    throw new Error('LoginHeader must be used within a ContrastProvider');
  }

  const { isHighContrast, toggleContrast } = contrastContext;

  return (
    <header className={styles.mainContent}>
      <div className={`${styles.container} ${isHighContrast ? dark.container : ''}`}>
        <div className={`${styles.help} ${isHighContrast ? dark.help : ''}`}>
        {isHighContrast ?
            <BiSolidBellRing size={30} style={{ color: '#A67B5B', cursor: 'pointer' }} /> :
            <BiSolidBellRing size={30} style={{ color: '#061826', cursor: 'pointer' }} />}
          {isHighContrast ?
            <BiSolidHelpCircle size={30} style={{ color: '#A67B5B', cursor: 'pointer' }} /> :
            <BiSolidHelpCircle size={30} style={{ color: '#061826', cursor: 'pointer' }} />}
            <BiSolidHelpCircle size={30} style={{ opacity: 0 }} />
        </div>
        <div className={`${styles.logo} ${isHighContrast ? dark.logo : ''}`}>
          {isHighContrast ?
            <img src={logoDark} alt='' className={styles.logoImg}></img> :
            <img src={logo} alt='' className={styles.logoImg}></img>}
        </div>
        <div className={styles.acessibilidade}>
          <button onClick={increaseFontSize} className={`${styles.font} ${isHighContrast ? dark.font : ''}`}>A+</button>
          <button onClick={decreaseFontSize} className={`${styles.font} ${isHighContrast ? dark.font : ''}`}>A-</button>
          {isHighContrast ? 
            <FaSun onClick={toggleContrast} size={30} style={{ color: '#A67B5B', cursor: 'pointer' }} /> :
            <BsFillMoonStarsFill onClick={toggleContrast} size={30} style={{ color: '#061826', cursor: 'pointer' }} />}
        </div>
      </div>
    </header>
  );
};

export default HeaderDefault;