import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';

interface ThemedProps {
  theme?: string;
}

const AddToHomeContainer = styled.button<ThemedProps>`
  background: ${props => props.theme === 'dark' ? '#555' : '#f5f5f7'};
  border: 2px solid ${props => props.theme === 'dark' ? '#777' : '#d2d2d7'};
  border-radius: 30px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px 12px;
  height: 30px;
  transition: all 0.3s ease;
  color: ${props => props.theme === 'dark' ? '#fff' : '#0071e3'};
  font-weight: 500;
  font-size: 12px;
  
  &:focus {
    outline: none;
  }
  
  &:hover {
    background: ${props => props.theme === 'dark' ? '#666' : '#e5e5e7'};
  }
  
  svg {
    height: 15px;
    width: 15px;
    margin-right: 5px;
    fill: currentColor;
  }
`;

// Extend Navigator interface to include standalone property
interface NavigatorWithStandalone extends Navigator {
  standalone?: boolean;
}

// Define BeforeInstallPromptEvent interface
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: string }>;
}

const AddToHomeButton: React.FC<{ theme?: string }> = ({ theme }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isIOS, setIsIOS] = useState(false);
  
  useEffect(() => {
    // Check if it's iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as Window & { MSStream?: unknown }).MSStream;
    setIsIOS(iOS);
    
    // For PWA install prompt (Android)
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      // Show the button
      setIsVisible(true);
    };
    
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    
    // If it's iOS and not in standalone mode, show the button
    if (iOS && !(window.navigator as NavigatorWithStandalone).standalone) {
      setIsVisible(true);
    }
    
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);
  
  const handleClick = () => {
    if (isIOS) {
      // Show iOS instructions
      alert('To add this app to your home screen:\n\n1. Tap the share icon in your browser\n2. Scroll down and tap "Add to Home Screen"\n3. Tap "Add" in the top right corner');
    } else if (deferredPrompt) {
      // Show the install prompt for Android
      deferredPrompt.prompt();
      
      // Wait for the user to respond to the prompt
      deferredPrompt.userChoice.then((choiceResult: { outcome: string }) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
          setIsVisible(false);
        } else {
          console.log('User dismissed the install prompt');
        }
        // Clear the saved prompt
        setDeferredPrompt(null);
      });
    }
  };
  
  if (!isVisible) return null;
  
  return (
    <AddToHomeContainer onClick={handleClick} theme={theme}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.47 1.72a.75.75 0 011.06 0l3 3a.75.75 0 01-1.06 1.06l-1.72-1.72V7.5h-1.5V4.06L9.53 5.78a.75.75 0 01-1.06-1.06l3-3zM11.25 7.5V15a.75.75 0 001.5 0V7.5h3.75a3 3 0 013 3v9a3 3 0 01-3 3h-9a3 3 0 01-3-3v-9a3 3 0 013-3h3.75z" />
      </svg>
      Add to Home
    </AddToHomeContainer>
  );
};

export default AddToHomeButton; 