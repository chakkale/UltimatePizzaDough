import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';

interface ThemedProps {
  theme?: string;
}

const LanguageButton = styled.button<ThemedProps>`
  background: ${props => props.theme === 'dark' ? '#555' : '#f5f5f7'};
  border: 2px solid ${props => props.theme === 'dark' ? '#777' : '#d2d2d7'};
  border-radius: 30px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 6px 12px;
  height: 30px;
  transition: all 0.3s ease;
  color: ${props => props.theme === 'dark' ? '#f5f5f7' : '#1d1d1f'};
  font-size: 0.85rem;
  font-weight: 500;
  position: relative;

  &:hover {
    background: ${props => props.theme === 'dark' ? '#666' : '#e8e8ed'};
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 113, 227, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

const LanguageIcon = styled.span`
  font-size: 1.1rem;
`;

const DropdownContainer = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 8px;
  background: var(--cardBackground);
  border: 1px solid var(--border);
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  min-width: 200px;
  z-index: 9999;
  display: ${props => props.isOpen ? 'block' : 'none'};
  overflow: hidden;
  max-height: 400px;
  overflow-y: auto;
`;

const DropdownItem = styled.button`
  width: 100%;
  padding: 10px 16px;
  border: none;
  background: transparent;
  color: var(--text);
  text-align: left;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.2s ease;
  display: flex;
  align-items: center;
  gap: 10px;

  &:hover {
    background: var(--border);
  }

  &:active {
    background: rgba(0, 113, 227, 0.1);
  }

  &:first-of-type {
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
  }

  &:last-of-type {
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
  }
`;

const Divider = styled.div`
  height: 1px;
  background: var(--border);
  margin: 4px 0;
`;

interface LanguageSelectorProps {
  theme?: string;
}

// Declare Google Translate type
declare global {
  interface Window {
    google: any;
    googleTranslateElementInit: () => void;
  }
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ theme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Set a timeout to mark as ready even if Google Translate doesn't load
    const fallbackTimer = setTimeout(() => {
      console.log('Google Translate fallback - marking as ready');
      setIsReady(true);
    }, 3000); // Wait 3 seconds max

    // Check if script already exists
    if (document.getElementById('google-translate-script')) {
      console.log('Google Translate script already exists');
      // Check if widget is ready
      const checkReady = setInterval(() => {
        const combo = document.querySelector('.goog-te-combo');
        if (combo) {
          console.log('Google Translate widget found');
          setIsReady(true);
          clearInterval(checkReady);
          clearTimeout(fallbackTimer);
        }
      }, 100);
      
      setTimeout(() => {
        clearInterval(checkReady);
      }, 5000); // Stop checking after 5 seconds
      return () => {
        clearInterval(checkReady);
        clearTimeout(fallbackTimer);
      };
    }

    // Add Google Translate script
    console.log('Loading Google Translate script...');
    const script = document.createElement('script');
    script.id = 'google-translate-script';
    script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    script.onerror = () => {
      console.error('Failed to load Google Translate script');
      setIsReady(true); // Mark as ready anyway so button is usable
    };
    document.body.appendChild(script);

    // Initialize Google Translate
    window.googleTranslateElementInit = () => {
      console.log('Initializing Google Translate...');
      try {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: 'en',
            includedLanguages: 'en,es,fr,de,it,pt,ru,zh-CN,ja,ko,ar,hi,tr,pl,nl,sv,no,da,fi,el,he,id,th,vi',
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false,
          },
          'google_translate_element'
        );
        
        // Check when widget is ready
        const checkReady = setInterval(() => {
          const combo = document.querySelector('.goog-te-combo');
          if (combo) {
            console.log('Google Translate widget initialized successfully');
            setIsReady(true);
            clearInterval(checkReady);
            clearTimeout(fallbackTimer);
          }
        }, 100);
        
        setTimeout(() => {
          clearInterval(checkReady);
        }, 5000); // Stop after 5 seconds
      } catch (error) {
        console.error('Error initializing Google Translate:', error);
        setIsReady(true);
      }
    };

    return () => {
      clearTimeout(fallbackTimer);
    };
  }, []);

  const changeLanguage = (langCode: string) => {
    console.log('Attempting to change language to:', langCode);
    
    // Wait a bit for Google Translate to fully initialize
    const attemptChange = (attempts = 0) => {
      const selectElement = document.querySelector('.goog-te-combo') as HTMLSelectElement;
      if (selectElement) {
        console.log('Google Translate select element found, changing to:', langCode);
        selectElement.value = langCode;
        // Trigger change event in multiple ways to ensure it works
        selectElement.dispatchEvent(new Event('change', { bubbles: true }));
        selectElement.dispatchEvent(new Event('input', { bubbles: true }));
        // Also try triggering it the old-fashioned way
        if (selectElement.onchange) {
          selectElement.onchange(new Event('change') as any);
        }
        setIsOpen(false);
        console.log('Language change triggered successfully');
      } else if (attempts < 5) {
        console.log(`Google Translate not ready, attempt ${attempts + 1}/5`);
        // Retry up to 5 times with 300ms delay
        setTimeout(() => attemptChange(attempts + 1), 300);
      } else {
        console.warn('Google Translate widget not available');
        setIsOpen(false);
        // Show a friendly message
        alert('Translation feature is currently unavailable. This might be due to:\n\n' +
              '1. Ad blockers or privacy extensions blocking Google services\n' +
              '2. Network connectivity issues\n' +
              '3. Browser settings restricting third-party scripts\n\n' +
              'Please try disabling ad blockers for this site or check your browser settings.');
      }
    };
    attemptChange();
  };

  const resetToOriginal = () => {
    // To reset, we need to reload the page or set to empty value
    const selectElement = document.querySelector('.goog-te-combo') as HTMLSelectElement;
    if (selectElement) {
      selectElement.value = '';
      selectElement.dispatchEvent(new Event('change', { bubbles: true }));
      // Reload to clear translation
      setTimeout(() => window.location.reload(), 100);
    }
  };

  const popularLanguages = [
    { code: '', name: 'English (Original)', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹' },
    { code: 'pt', name: 'Português', flag: '🇵🇹' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'zh-CN', name: '中文', flag: '🇨🇳' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'ko', name: '한국어', flag: '🇰🇷' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
    { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
  ];

  return (
    <div style={{ position: 'relative' }}>
      {/* Hidden Google Translate Element */}
      <div 
        id="google_translate_element" 
        style={{ 
          display: 'none',
          visibility: 'hidden',
          position: 'absolute',
          top: '-9999px'
        }}
      />
      
      <LanguageButton
        onClick={() => setIsOpen(!isOpen)}
        theme={theme}
        aria-label="Select Language"
        disabled={false}
        style={{ opacity: isReady ? 1 : 0.6 }}
      >
        <LanguageIcon>🌐</LanguageIcon>
        <span>Language</span>
      </LanguageButton>

      <DropdownContainer isOpen={isOpen}>
        {popularLanguages.map((lang, index) => (
          <React.Fragment key={lang.code}>
            {index === 1 && <Divider />}
            <DropdownItem onClick={() => lang.code === '' ? resetToOriginal() : changeLanguage(lang.code)}>
              <span>{lang.flag}</span>
              <span>{lang.name}</span>
            </DropdownItem>
          </React.Fragment>
        ))}
      </DropdownContainer>

      {isOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 9998,
          }}
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default LanguageSelector;
