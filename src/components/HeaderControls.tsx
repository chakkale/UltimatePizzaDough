import React from 'react';
import styled from '@emotion/styled';
import ThemeToggle from './ThemeToggle';
import AddToHomeButton from './AddToHomeButton';
import GitHubButton from './GitHubButton';
import { useTheme } from '../context/ThemeContext';

const ControlsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  margin-top: 1rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
`;

const HeaderControls: React.FC = () => {
  const { theme } = useTheme();
  const repoUrl = 'https://github.com/chakkale/UltimatePizzaDough';
  
  return (
    <ControlsContainer>
      <ThemeToggle />
      <ButtonGroup>
        <AddToHomeButton theme={theme} />
        <GitHubButton theme={theme} repoUrl={repoUrl} />
      </ButtonGroup>
    </ControlsContainer>
  );
};

export default HeaderControls; 