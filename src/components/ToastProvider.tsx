import React, { createContext, useContext, useState, useCallback } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

interface ToastContextType {
  showToast: (message: string, type: ToastType, duration?: number) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

const ToastContainer = styled.div`
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 10000;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  pointer-events: none;
  
  @media (max-width: 768px) {
    top: 0.5rem;
    right: 0.5rem;
    left: 0.5rem;
  }
`;

const ToastItem = styled(motion.div)<{ type: ToastType }>`
  background-color: ${props => {
    switch (props.type) {
      case 'success': return 'var(--success, #34c759)';
      case 'error': return 'var(--error, #ff3b30)';
      case 'warning': return 'var(--warning, #ff9500)';
      case 'info':
      default: return 'var(--primary, #0071e3)';
    }
  }};
  color: white;
  padding: 1rem 1.5rem;
  border-radius: 14px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  font-size: 0.9rem;
  font-weight: 500;
  max-width: 400px;
  min-width: 250px;
  pointer-events: auto;
  cursor: pointer;
  
  @media (max-width: 768px) {
    min-width: auto;
    max-width: none;
  }
`;

const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: ToastType, duration = 4000) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast: Toast = { id, message, type, duration };
    
    setToasts(prev => [...prev, newToast]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast, removeToast }}>
      {children}
      <ToastContainer>
        <AnimatePresence>
          {toasts.map(toast => (
            <ToastItem
              key={toast.id}
              type={toast.type}
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              onClick={() => removeToast(toast.id)}
            >
              {toast.message}
            </ToastItem>
          ))}
        </AnimatePresence>
      </ToastContainer>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export default ToastProvider;
