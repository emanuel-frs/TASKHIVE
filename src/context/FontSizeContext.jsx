import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const FontSizeContext = createContext();

export const FontSizeProvider = ({ children }) => {
    const [fontSize, setFontSize] = useState(
        () => parseFloat(localStorage.getItem('fontSize') || '16')
    );

    useEffect(() => {
        document.documentElement.style.fontSize = `${fontSize}px`;
        localStorage.setItem('fontSize', fontSize.toString());
    }, [fontSize]);

    const increaseFontSize = () => {
        setFontSize(prevSize => Math.min(prevSize + 1, 20));
    };

    const decreaseFontSize = () => {
        setFontSize(prevSize => Math.max(prevSize - 1, 14));
    };

    return (
        <FontSizeContext.Provider value={{ fontSize, increaseFontSize, decreaseFontSize }}>
        {children}
        </FontSizeContext.Provider>
    );
};

FontSizeProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const useFontSizeContext = () => {
    const context = useContext(FontSizeContext);
    if (!context) {
        throw new Error('useFontSizeContext must be used within a FontSizeProvider');
    }
    return context;
};
