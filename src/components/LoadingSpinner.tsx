import React from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const SpinnerContainer = styled.div<{ size?: 'small' | 'medium' | 'large' }>`
  display: inline-block;
  width: ${props => 
    props.size === 'small' ? '16px' : 
    props.size === 'large' ? '32px' : '24px'};
  height: ${props => 
    props.size === 'small' ? '16px' : 
    props.size === 'large' ? '32px' : '24px'};
`;

const Spinner = styled.div<{ size?: 'small' | 'medium' | 'large' }>`
  border: 2px solid var(--border);
  border-top: 2px solid var(--primary);
  border-radius: 50%;
  width: 100%;
  height: 100%;
  animation: ${spin} 1s linear infinite;
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  gap: 1rem;
`;

const LoadingText = styled.p`
  color: var(--lightText);
  font-size: 0.9rem;
  margin: 0;
`;

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  text?: string;
  fullScreen?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'medium', 
  text,
  fullScreen = false 
}) => {
  if (fullScreen) {
    return (
      <LoadingContainer>
        <SpinnerContainer size={size}>
          <Spinner size={size} />
        </SpinnerContainer>
        {text && <LoadingText>{text}</LoadingText>}
      </LoadingContainer>
    );
  }

  return (
    <SpinnerContainer size={size}>
      <Spinner size={size} />
    </SpinnerContainer>
  );
};

export default LoadingSpinner;
