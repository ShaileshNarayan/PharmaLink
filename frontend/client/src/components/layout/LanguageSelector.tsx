import React, { useState, useEffect } from 'react';
import { Check, ChevronDown, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Define language options
const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
  { code: 'zh-CN', name: '中文' },
  { code: 'ja', name: '日本語' },
  { code: 'ko', name: '한국어' },
  { code: 'ar', name: 'العربية' },
  { code: 'ru', name: 'Русский' },
  { code: 'pt', name: 'Português' },
];

// Define the Google Translate initialization function
declare global {
  interface Window {
    googleTranslateElementInit: () => void;
    google: any;
  }
}

const LanguageSelector: React.FC = () => {
  const [currentLanguage, setCurrentLanguage] = useState<string>('en');
  const [isTranslateLoaded, setIsTranslateLoaded] = useState<boolean>(false);

  // Add the Google Translate script to the document
  useEffect(() => {
    // Create Google Translate script element
    const addScript = () => {
      if (document.getElementById('google-translate-api')) {
        return;
      }

      const script = document.createElement('script');
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.id = 'google-translate-api';
      document.body.appendChild(script);

      // Create hidden div for Google Translate
      const translateDiv = document.createElement('div');
      translateDiv.id = 'google_translate_element';
      translateDiv.style.display = 'none';
      document.body.appendChild(translateDiv);
    };

    // Initialize Google Translate
    window.googleTranslateElementInit = () => {
      if (window.google && window.google.translate) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: 'en',
            autoDisplay: false,
          },
          'google_translate_element'
        );
        setIsTranslateLoaded(true);
      }
    };

    addScript();

    return () => {
      // Clean up
      const script = document.getElementById('google-translate-api');
      const translateDiv = document.getElementById('google_translate_element');
      if (script) document.body.removeChild(script);
      if (translateDiv) document.body.removeChild(translateDiv);
      // Remove the reference to the initialization function
      if (window.googleTranslateElementInit) {
        window.googleTranslateElementInit = function() { /* empty function */ };
      }
    };
  }, []);

  // Function to change the language
  const changeLanguage = (languageCode: string) => {
    if (!isTranslateLoaded) return;

    try {
      // Change language using Google Translate
      const select = document.querySelector('.goog-te-combo') as HTMLSelectElement;
      if (select) {
        select.value = languageCode;
        select.dispatchEvent(new Event('change'));
        setCurrentLanguage(languageCode);
      }
    } catch (error) {
      console.error('Error changing language:', error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Globe className="h-4 w-4" />
          <span className="hidden md:inline">{languages.find(lang => lang.code === currentLanguage)?.name || 'English'}</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => changeLanguage(language.code)}
            className="flex items-center justify-between"
          >
            <span>{language.name}</span>
            {currentLanguage === language.code && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;