import React, { createContext, useContext, useEffect, useState } from "react";
import { darkTheme, lightTheme } from "./theme";
import { Appearance } from "react-native";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }: {children: any}) => {

    const [theme, setTheme] = useState(
        Appearance.getColorScheme() === 'dark' ? darkTheme : lightTheme
    );

    useEffect(()=> {
        const subscription = Appearance.addChangeListener(({colorScheme}) => {
            setTheme(colorScheme === 'dark' ? darkTheme : lightTheme)
        });

        return () => subscription.remove()
    }, []);

    return (
        <ThemeContext.Provider value={{theme}}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => useContext(ThemeContext);