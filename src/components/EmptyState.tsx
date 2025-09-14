import React from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

const EmptyStateContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 2rem;
  text-align: center;
  color: var(--lightText);
`;

const EmptyStateIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
  opacity: 0.6;
`;

const EmptyStateTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--text);
`;

const EmptyStateMessage = styled.p`
  font-size: 1rem;
  line-height: 1.5;
  max-width: 400px;
  margin-bottom: 1.5rem;
  opacity: 0.8;
`;

const EmptyStateAction = styled.button`
  background-color: var(--primary);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #0062c3;
    transform: translateY(-1px);
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 113, 227, 0.3);
  }
`;

interface EmptyStateProps {
  icon?: string;
  title: string;
  message: string;
  actionText?: string;
  onAction?: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon = "🍕",
  title,
  message,
  actionText,
  onAction
}) => {
  return (
    <EmptyStateContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <EmptyStateIcon>{icon}</EmptyStateIcon>
      <EmptyStateTitle>{title}</EmptyStateTitle>
      <EmptyStateMessage>{message}</EmptyStateMessage>
      {actionText && onAction && (
        <EmptyStateAction onClick={onAction}>
          {actionText}
        </EmptyStateAction>
      )}
    </EmptyStateContainer>
  );
};

export default EmptyState;
