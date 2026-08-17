import { useState, useEffect } from 'react';

export function useTheme(defaultTheme = 'light') {
    
    // 1. Initialize state from localStorage if available, otherwise use default
    const [theme, setTheme] = useState(() => {
        try {
            const savedTheme = localStorage.getItem('theme');
            return savedTheme ? savedTheme : defaultTheme;
        } catch (error) {
            console.error('Failed to read theme from localStorage', error);
            return defaultTheme;
        }
    });

    // 2. Sync theme changes to localStorage and update DOM attribute/class
    useEffect(() => {
        if (theme === 'dark') {
            document.querySelector('html')?.classList.add('dark');
        } else {
            document.querySelector('html')?.classList.remove('dark');
        }

        localStorage.setItem('theme', theme);

    }, [theme]);

    return [theme, setTheme];
}
