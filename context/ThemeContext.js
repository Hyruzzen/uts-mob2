// context/ThemeContext.js
// Context pengelola tema (Dark / Light) dengan persistensi AsyncStorage (Level 10)
import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../constants/Colors';

const ThemeContext = createContext();

const THEME_STORAGE_KEY = '@app_theme_preference';

export function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isThemeLoaded, setIsThemeLoaded] = useState(false);

  // Membaca preferensi tema tersimpan saat aplikasi pertama kali dimuat
  useEffect(() => {
    const loadSavedTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        if (savedTheme !== null) {
          setIsDarkMode(savedTheme === 'dark');
        }
      } catch (error) {
        console.warn('Gagal memuat preferensi tema dari AsyncStorage:', error);
      } finally {
        setIsThemeLoaded(true);
      }
    };

    loadSavedTheme();
  }, []);

  // Mengubah tema dan menyimpannya ke AsyncStorage
  const toggleTheme = async () => {
    try {
      const newMode = !isDarkMode;
      setIsDarkMode(newMode);
      await AsyncStorage.setItem(THEME_STORAGE_KEY, newMode ? 'dark' : 'light');
    } catch (error) {
      console.warn('Gagal menyimpan preferensi tema ke AsyncStorage:', error);
    }
  };

  const currentTheme = isDarkMode ? Colors.dark : Colors.light;

  return (
    <ThemeContext.Provider
      value={{
        isDarkMode,
        theme: currentTheme,
        toggleTheme,
        isThemeLoaded,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

// Custom Hook untuk mempermudah akses tema di seluruh komponen
export function useAppTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useAppTheme harus digunakan di dalam ThemeProvider');
  }
  return context;
}

export default ThemeContext;
