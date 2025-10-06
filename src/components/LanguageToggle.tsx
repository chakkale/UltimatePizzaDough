import React from 'react';
import styled from '@emotion/styled';
import { useTranslation } from '../context/TranslationContext';

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

const FlagIcon = styled.span`
  font-size: 1.1rem;
`;

interface LanguageToggleProps {
  theme?: string;
}

const LanguageToggle: React.FC<LanguageToggleProps> = ({ theme }) => {
  const { language, setLanguage } = useTranslation();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'tr' : 'en');
  };

  return (
    <LanguageButton
      onClick={toggleLanguage}
      theme={theme}
      aria-label={`Switch to ${language === 'en' ? 'Turkish' : 'English'}`}
      title={language === 'en' ? 'Türkçe\'ye geç' : 'Switch to English'}
    >
      <FlagIcon>{language === 'en' ? '🇹🇷' : '🇺🇸'}</FlagIcon>
      <span>{language === 'en' ? 'TR' : 'EN'}</span>
    </LanguageButton>
  );
};

export default LanguageToggle;
