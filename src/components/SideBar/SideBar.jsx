import { useContext, useState } from 'react';
import { GrHomeRounded } from "react-icons/gr";
import { FaTasks } from 'react-icons/fa';
import { PiPencilSimpleLineDuotone } from "react-icons/pi";
import { BsArrowBarRight, BsArrowBarLeft } from 'react-icons/bs';
import { MdOutlineExitToApp, MdOutlineTextDecrease, MdOutlineTextIncrease } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import styles from './styles.module.css';
import dark from './dark.module.css';
import { useAuthContext } from '../../../context/AuthContext';
import { ContrastContext } from '../../../context/ContrastContext';
import { IoIosContrast } from 'react-icons/io';
import { useFontSizeContext } from '../../../context/FontSizeContext';

const SideBar = () => {
    const { logout, user } = useAuthContext();
    const navigate = useNavigate();
    const contrastContext = useContext(ContrastContext);
    const { increaseFontSize, decreaseFontSize } = useFontSizeContext();

    const [isExpanded, setIsExpanded] = useState(false);

    if (!contrastContext) {
        throw new Error('SideBar must be used within a ContrastProvider');
    }
    
    const { isHighContrast, toggleContrast } = contrastContext;

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const toggleSidebar = () => {
        setIsExpanded(prevState => !prevState);
    };

    return (
        <div className={`${isHighContrast ? dark.sideBar : styles.sideBar} ${isExpanded ? (isHighContrast ? dark.expanded : styles.expanded) : ''}`}>
            <div className={styles.scrollContainer}>
                <ul>
                    {[
                    { icon: <IoIosContrast size={20} />, text: 'Contraste', path: '#', action:toggleContrast },
                    { icon: <MdOutlineTextIncrease size={20}/>, text: 'Aumentar', path: '#', action: increaseFontSize },
                    { icon: <MdOutlineTextDecrease size={20}/>, text: 'Diminuir', path: '#', action: decreaseFontSize },
                    { icon: isExpanded ? <BsArrowBarLeft size={20} /> : <BsArrowBarRight size={20} />, text: isExpanded ? 'Retrair' : 'Expandir', path: '#', action: toggleSidebar },
                    { icon: <GrHomeRounded size={20} />, text: 'Home', path: user?.role === 'MANAGER' ? '/home-gestor' : '/' },
                    ...(user?.role === 'COLLABORATOR' ? [
                        { icon: <PiPencilSimpleLineDuotone size={20} />, text: isExpanded ? 'Registrar Atividades' : 'Registrar<br />Atividades', path: '/registrar-atividades' },
                        { icon: <FaTasks size={20} />, text: isExpanded ? 'Visualizar Atividades' : 'Visualizar<br />Atividades', path: '/atividades-registradas' },
                    ] : []),
                    { icon: <MdOutlineExitToApp size={20} />, text: 'Sair', path: '#', action: handleLogout },
                    ].map(({ icon, text, path, action }) => (
                    <li key={text} className={styles.sideBarItem} onClick={action}>
                        <Link to={path} className={isExpanded ? (isHighContrast ? dark.sideBarOpen : styles.sideBarOpen ): styles.sideBarClickable}>
                        <span className={isExpanded ? (isHighContrast ? dark.iconOpen : styles.iconOpen) : styles.icon}>{typeof icon === 'string' ? <span dangerouslySetInnerHTML={{ __html: icon }} /> : icon}</span>
                        <div className={isExpanded ? (isHighContrast ? dark.textoOpen : styles.textoOpen) : ''}>
                            <span dangerouslySetInnerHTML={{ __html: text }}></span>
                        </div>
                        </Link>
                    </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default SideBar;
