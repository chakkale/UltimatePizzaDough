import React from 'react';
import styled from '@emotion/styled';
import AddToHomeButton from './AddToHomeButton';
// GitHub button temporarily disabled - uncomment to re-enable
// import GitHubButton from './GitHubButton';
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
  // GitHub button temporarily disabled - uncomment to re-enable
  // const repoUrl = 'https://github.com/chakkale/UltimatePizzaDough';
  
  return (
    <ControlsContainer>
      <ButtonGroup>
        <AddToHomeButton theme={theme} />
        {/* GitHub button temporarily disabled - uncomment to re-enable */}
        {/* <GitHubButton theme={theme} repoUrl={repoUrl} /> */}
      </ButtonGroup>
    </ControlsContainer>
  );
};

export default HeaderControls; 