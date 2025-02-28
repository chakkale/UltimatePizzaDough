import React from 'react';
import styled from '@emotion/styled';
import ThemeToggle from './ThemeToggle';
import AddToHomeButton from './AddToHomeButton';
import { useTheme } from '../context/ThemeContext';

const ControlsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  margin-top: 1rem;
`;

const HeaderControls: React.FC = () => {
  const { theme } = useTheme();
  
  return (
    <ControlsContainer>
      <ThemeToggle />
      <AddToHomeButton theme={theme} />
    </ControlsContainer>
  );
};

export default HeaderControls; 