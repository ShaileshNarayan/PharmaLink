import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Globe, Check } from 'lucide-react';

// Define language options with their codes
const languages = [
  { code: 'en', name: 'English' },
  { code: 'ta', name: 'Tamil' },
  { code: 'hi', name: 'Hindi' },
  { code: 'ml', name: 'Malayalam' },
  { code: 'te', name: 'Telugu' }
];

// Define Google Translate API interface
declare global {
  interface Window {
    googleTranslateElementInit: () => void;
    google: {
      translate: {
        TranslateElement: any;
      };
    };
  }
}

const LanguageSwitcher: React.FC = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isTranslateReady, setIsTranslateReady] = useState(false);

  // Load Google Translate script
  useEffect(() => {
    // Create Google translate element
    const createTranslateElement = () => {
      if (!window.google || !window.google.translate) return;
      
      try {
        // Create the translate element if it doesn't exist
        if (!document.getElementById('google_translate_element')) {
          const div = document.createElement('div');
          div.id = 'google_translate_element';
          div.style.display = 'none';
          document.body.appendChild(div);
        }
        
        new window.google.translate.TranslateElement(
          {
            pageLanguage: 'en',
            includedLanguages: 'en,ta,hi,ml,te',
            autoDisplay: false
          },
          'google_translate_element'
        );
        
        setIsTranslateReady(true);
      } catch (error) {
        console.error('Failed to initialize Google Translate:', error);
      }
    };

    // Define translate initialization function
    window.googleTranslateElementInit = createTranslateElement;
    
    // Load translate script
    const loadScript = () => {
      const script = document.createElement('script');
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      script.id = 'google-translate-script';
      
      script.onerror = () => console.error('Failed to load Google Translate script');
      
      document.head.appendChild(script);
    };
    
    // Only load if not already loaded
    if (!document.getElementById('google-translate-script')) {
      loadScript();
    } else if (window.google && window.google.translate) {
      // If script is already loaded but element not created
      createTranslateElement();
    }
    
    // Cleanup function
    return () => {
      // Keeping translate functionality when unmounting
    };
  }, []);
  
  // Function to change language
  const switchLanguage = (languageCode: string) => {
    if (languageCode === currentLanguage) return;
    
    setCurrentLanguage(languageCode);
    
    // Wait a bit to ensure translate element is ready
    setTimeout(() => {
      try {
        // Look for the Google translate combo box
        const select = document.querySelector('.goog-te-combo') as HTMLSelectElement;
        if (select) {
          select.value = languageCode;
          select.dispatchEvent(new Event('change'));
        } else {
          console.error('Google Translate element not found');
          
          // Fallback: recreate the translate element
          if (window.google && window.google.translate) {
            window.googleTranslateElementInit();
            
            // Try again after element is recreated
            setTimeout(() => {
              const select = document.querySelector('.goog-te-combo') as HTMLSelectElement;
              if (select) {
                select.value = languageCode;
                select.dispatchEvent(new Event('change'));
              }
            }, 500);
          }
        }
      } catch (error) {
        console.error('Error changing language:', error);
      }
    }, 300);
  };
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Globe className="h-4 w-4" />
          <span className="hidden md:inline">
            {languages.find(lang => lang.code === currentLanguage)?.name || 'English'}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => switchLanguage(language.code)}
            className="flex items-center justify-between"
          >
            {language.name}
            {currentLanguage === language.code && (
              <Check className="h-4 w-4 ml-2" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;