import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const ContrastContext = createContext(undefined);

export const ContrastProvider = ({ children }) => {
    const [isHighContrast, setIsHighContrast] = useState(() => {
        return JSON.parse(localStorage.getItem('isHighContrast') || 'false');
    });

    useEffect(() => {
        if (isHighContrast) {
            document.documentElement.classList.add('high-contrast');
        } else {
            document.documentElement.classList.remove('high-contrast');
        }
    }, [isHighContrast]);

    const toggleContrast = () => {
        const newContrastState = !isHighContrast;
        setIsHighContrast(newContrastState);
        localStorage.setItem('isHighContrast', JSON.stringify(newContrastState));
    };

    return (
        <ContrastContext.Provider value={{ isHighContrast, toggleContrast }}>
            {children}
        </ContrastContext.Provider>
    );
};

ContrastProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
