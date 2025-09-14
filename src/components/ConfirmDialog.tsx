import React from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';

const DialogOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 1rem;
`;

const DialogContainer = styled(motion.div)`
  background-color: var(--cardBackground);
  border-radius: 1rem;
  padding: 2rem;
  max-width: 400px;
  width: 100%;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
`;

const DialogTitle = styled.h3`
  margin: 0 0 1rem 0;
  color: var(--text);
  font-size: 1.25rem;
  font-weight: 600;
`;

const DialogMessage = styled.p`
  margin: 0 0 2rem 0;
  color: var(--lightText);
  line-height: 1.5;
`;

const DialogActions = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
`;

const DialogButton = styled.button<{ variant?: 'primary' | 'secondary' | 'danger' }>`
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  border: none;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  ${props => {
    switch (props.variant) {
      case 'danger':
        return `
          background-color: var(--error, #ff3b30);
          color: white;
          &:hover {
            background-color: #ff2d1b;
          }
        `;
      case 'secondary':
        return `
          background-color: transparent;
          color: var(--text);
          border: 1px solid var(--border);
          &:hover {
            background-color: var(--border);
          }
        `;
      case 'primary':
      default:
        return `
          background-color: var(--primary);
          color: white;
          &:hover {
            background-color: #0062c3;
          }
        `;
    }
  }}
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 113, 227, 0.3);
  }
`;

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'primary' | 'danger';
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'primary',
  onConfirm,
  onCancel
}) => {
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onCancel();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <DialogOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleOverlayClick}
        >
          <DialogContainer
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <DialogTitle>{title}</DialogTitle>
            <DialogMessage>{message}</DialogMessage>
            <DialogActions>
              <DialogButton variant="secondary" onClick={onCancel}>
                {cancelText}
              </DialogButton>
              <DialogButton variant={variant} onClick={onConfirm}>
                {confirmText}
              </DialogButton>
            </DialogActions>
          </DialogContainer>
        </DialogOverlay>
      )}
    </AnimatePresence>
  );
};

export default ConfirmDialog;
