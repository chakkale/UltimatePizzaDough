import React from 'react';
import styled from '@emotion/styled';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';

// Fix the type for the theme prop
interface ThemedProps {
  theme?: string;
}

const ToggleContainer = styled.button<ThemedProps>`
  background: ${props => props.theme === 'dark' ? '#3D3530' : '#F5EFE7'};
  border: 2px solid ${props => props.theme === 'dark' ? '#4D4540' : '#E0D5C7'};
  border-radius: 30px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  overflow: hidden;
  padding: 3px;
  position: relative;
  width: 60px;
  height: 30px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
  }
`;

const Icons = styled.div<ThemedProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
  
  svg {
    height: 15px;
    width: 15px;
    transition: all 0.3s linear;
    
    &:first-of-type {
      color: ${props => props.theme === 'dark' ? '#F5F3CE' : '#6E6E6E'};
      margin-left: 4px;
    }
    
    &:nth-of-type(2) {
      color: ${props => props.theme === 'dark' ? '#F5F3CE' : '#F1C40F'};
      margin-right: 4px;
    }
  }
`;

const ToggleButton = styled(motion.div)<ThemedProps>`
  background: ${props => props.theme === 'dark' ? '#F0E8DC' : '#C75B39'};
  border-radius: 50%;
  height: 22px;
  width: 22px;
  position: absolute;
  top: 2px;
  left: 2px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  z-index: 2;
`;

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <ToggleContainer onClick={toggleTheme} theme={theme}>
      <Icons theme={theme}>
        {/* Moon Icon */}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clipRule="evenodd" />
        </svg>
        
        {/* Sun Icon */}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
        </svg>
      </Icons>
      <ToggleButton 
        theme={theme}
        animate={{ 
          x: theme === 'dark' ? 32 : 0 
        }}
        transition={{ type: "spring", stiffness: 700, damping: 30 }}
      />
    </ToggleContainer>
  );
};

export default ThemeToggle; 