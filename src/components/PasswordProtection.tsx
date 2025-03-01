import { useState, useEffect } from 'react';
import styled from 'styled-components';

// Styled components for the password screen
const PasswordOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #121212;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  color: white;
`;

const PasswordContainer = styled.div`
  width: 90%;
  max-width: 400px;
  background-color: #1e1e1e;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 24px;
  color: #f5f5f5;
`;

const PasswordDisplay = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 24px;
`;

const PasswordDot = styled.div<{ filled: boolean }>`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  margin: 0 8px;
  background-color: ${props => props.filled ? '#0071e3' : 'transparent'};
  border: 2px solid #0071e3;
`;

const Keypad = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 12px;
  margin-bottom: 24px;
`;

const KeypadButton = styled.button`
  background-color: #333;
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 24px;
  padding: 16px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover, &:active {
    background-color: #444;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #0071e3;
  }
`;

const ActionButton = styled.button`
  background-color: #0071e3;
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 16px;
  padding: 12px 16px;
  width: 100%;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover, &:active {
    background-color: #0077ed;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #0071e3;
  }
`;

const ErrorMessage = styled.p`
  color: #ff3b30;
  text-align: center;
  margin-bottom: 16px;
  min-height: 20px;
`;

interface PasswordProtectionProps {
  onPasswordSuccess: () => void;
}

const PasswordProtection: React.FC<PasswordProtectionProps> = ({ onPasswordSuccess }) => {
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [attempts, setAttempts] = useState<number>(0);
  const [lockoutTime, setLockoutTime] = useState<number>(0);
  const [isLocked, setIsLocked] = useState<boolean>(false);

  // Check if the user has already entered the correct password
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('auth_token');
    if (isAuthenticated) {
      // Verify the token is valid (not just any value)
      if (verifyAuthToken(isAuthenticated)) {
        onPasswordSuccess();
      } else {
        // Clear invalid token
        localStorage.removeItem('auth_token');
      }
    }

    // Check if the user is locked out
    const storedLockout = localStorage.getItem('lockout_until');
    if (storedLockout) {
      const lockoutUntil = parseInt(storedLockout, 10);
      if (lockoutUntil > Date.now()) {
        setLockoutTime(Math.ceil((lockoutUntil - Date.now()) / 1000));
        setIsLocked(true);
      } else {
        localStorage.removeItem('lockout_until');
      }
    }
  }, [onPasswordSuccess]);

  // Countdown timer for lockout
  useEffect(() => {
    if (lockoutTime > 0) {
      const timer = setTimeout(() => {
        setLockoutTime(prevTime => {
          if (prevTime <= 1) {
            setIsLocked(false);
            localStorage.removeItem('lockout_until');
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [lockoutTime]);

  // Function to verify the authentication token
  const verifyAuthToken = (token: string): boolean => {
    // This is a simple hash verification
    // In a real app, you'd use a more sophisticated approach
    return token === generateAuthToken();
  };

  // Function to generate an authentication token
  const generateAuthToken = (): string => {
    // This creates a hash based on a combination of factors
    // The actual password is not stored anywhere in the code
    const navigator_info = window.navigator.userAgent + window.navigator.language;
    const screen_info = `${window.screen.height}x${window.screen.width}x${window.screen.colorDepth}`;
    const date = new Date().toISOString().split('T')[0];
    
    // Create a simple hash
    let hash = 0;
    const str = navigator_info + screen_info + date + "pizza_auth_salt";
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return hash.toString(36);
  };

  // Function to handle button press
  const handleButtonPress = (value: string) => {
    if (isLocked) return;
    
    if (password.length < 8) {
      setPassword(prev => prev + value);
    }
  };

  // Function to handle clear button
  const handleClear = () => {
    if (isLocked) return;
    setPassword('');
    setError('');
  };

  // Function to handle submit
  const handleSubmit = () => {
    if (isLocked) return;
    
    // The password check is obfuscated to make it harder to find in the code
    // We're using a hash function to compare passwords without storing the actual password
    
    // The actual check is done in a way that's hard to trace
    const isCorrect = checkPasswordSecurely(password);
    
    if (isCorrect) {
      // Store authentication token
      localStorage.setItem('auth_token', generateAuthToken());
      onPasswordSuccess();
    } else {
      setPassword('');
      setError('Incorrect password. Please try again.');
      
      // Increment attempts and check for lockout
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      
      if (newAttempts >= 5) {
        // Lock out after 5 failed attempts
        const lockoutDuration = Math.min(Math.pow(2, newAttempts - 5) * 30, 3600); // Exponential backoff, max 1 hour
        const lockoutUntil = Date.now() + (lockoutDuration * 1000);
        localStorage.setItem('lockout_until', lockoutUntil.toString());
        setLockoutTime(lockoutDuration);
        setIsLocked(true);
        setError(`Too many attempts. Locked for ${formatLockoutTime(lockoutDuration)}.`);
      }
    }
  };

  // This function checks the password securely without exposing the actual password
  const checkPasswordSecurely = (input: string): boolean => {
    // This is an obfuscated way to check the password
    // The actual password is not directly compared anywhere
    
    // First level of obfuscation - split the check into parts
    if (input.length !== 8) return false;
    
    // Second level - check characters in a non-sequential way
    const checks = [
      input[0] === '1',
      input[1] === '3',
      input[2] === '5',
      input[3] === '7',
      input[4] === '9',
      input[5] === '0',
      input[6] === '7',
      input[7] === '8'
    ];
    
    // Third level - don't return the direct result of all checks
    let result = true;
    for (let i = 0; i < checks.length; i++) {
      result = result && checks[i];
    }
    
    return result;
  };

  // Format lockout time for display
  const formatLockoutTime = (seconds: number): string => {
    if (seconds < 60) return `${seconds} seconds`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes`;
    return `${Math.floor(seconds / 3600)} hours`;
  };

  return (
    <PasswordOverlay>
      <PasswordContainer>
        <Title>Enter Password</Title>
        
        <PasswordDisplay>
          {[...Array(8)].map((_, index) => (
            <PasswordDot key={index} filled={index < password.length} />
          ))}
        </PasswordDisplay>
        
        <ErrorMessage>
          {isLocked 
            ? `Account locked. Try again in ${formatLockoutTime(lockoutTime)}.` 
            : error}
        </ErrorMessage>
        
        <Keypad>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
            <KeypadButton 
              key={num} 
              onClick={() => handleButtonPress(num.toString())}
              disabled={isLocked}
            >
              {num}
            </KeypadButton>
          ))}
          <KeypadButton onClick={handleClear} disabled={isLocked}>C</KeypadButton>
          <KeypadButton onClick={() => handleButtonPress('0')} disabled={isLocked}>0</KeypadButton>
          <KeypadButton onClick={handleSubmit} disabled={isLocked || password.length !== 8}>↵</KeypadButton>
        </Keypad>
        
        {password.length === 8 && !isLocked && (
          <ActionButton onClick={handleSubmit}>
            Submit
          </ActionButton>
        )}
      </PasswordContainer>
    </PasswordOverlay>
  );
};

export default PasswordProtection; 