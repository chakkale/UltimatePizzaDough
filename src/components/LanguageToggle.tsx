import React from 'react';
import styled from '@emotion/styled';
import { useTranslation } from '../context/TranslationContext';

const LanguageButton = styled.button`
  background: var(--inputBackground);
  border: 1.5px solid var(--border);
  border-radius: 30px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 6px 12px;
  height: 30px;
  transition: all 0.2s ease;
  color: var(--text);
  font-size: 0.85rem;
  font-weight: 500;

  &:hover {
    border-color: var(--border-strong);
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px var(--primary-soft);
  }

  &:active {
    transform: translateY(0);
  }
`;

const FlagIcon = styled.span`
  font-size: 1.1rem;
`;

const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useTranslation();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'tr' : 'en');
  };

  return (
    <LanguageButton
      onClick={toggleLanguage}
      aria-label={`Switch to ${language === 'en' ? 'Turkish' : 'English'}`}
      title={language === 'en' ? 'Türkçe\'ye geç' : 'Switch to English'}
    >
      <FlagIcon>{language === 'en' ? '🇹🇷' : '🇺🇸'}</FlagIcon>
      <span>{language === 'en' ? 'TR' : 'EN'}</span>
    </LanguageButton>
  );
};

export default LanguageToggle;
