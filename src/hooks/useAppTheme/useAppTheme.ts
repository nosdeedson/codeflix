import { useEffect, useState } from "react";
import { darkTheme, lightTheme } from "../../app/config/theme";
import { useLocalStorage } from "../userLocalStorage/userLocalStorage";


export function useAppTheme() {
    const [theme, setTheme] = useState(darkTheme);

    const [storedThemeMode, setStoreThemeMode] = useLocalStorage<'dark' | 'light'>("themeMode", "dark");

    const toogleTheme = () => {
        const currentTheme = theme.palette.mode === 'dark' ? lightTheme : darkTheme;
        setTheme(currentTheme);
        setStoreThemeMode(currentTheme.palette.mode);
    }

    useEffect(() => {
        const currentTheme = storedThemeMode === 'dark' ? darkTheme : lightTheme;
        if(currentTheme){
            setTheme(currentTheme)
        }
    }, [storedThemeMode]);

    return [theme, toogleTheme] as const;
}