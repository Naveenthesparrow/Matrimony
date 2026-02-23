import { createContext, useContext, useState, useEffect } from 'react';
import enTranslations from '../locales/en.json';
import taTranslations from '../locales/ta.json';

const TranslationContext = createContext();

export const TranslationProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'en';
  });

  const translations = {
    en: enTranslations,
    ta: taTranslations,
  };

  const getCurrentTranslations = () => translations[language] || enTranslations;

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'ta' : 'en';
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
    
    // Add Tamil font class to body when Tamil is selected
    if (language === 'ta') {
      document.body.classList.add('tamil-text');
      document.body.classList.remove('english-text');
    } else {
      document.body.classList.add('english-text');
      document.body.classList.remove('tamil-text');
    }
  }, [language]);

  return (
    <TranslationContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        t: getCurrentTranslations(),
      }}
    >
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within TranslationProvider');
  }
  return context;
};
