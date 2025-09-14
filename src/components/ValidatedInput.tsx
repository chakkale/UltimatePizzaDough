import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';

const InputContainer = styled.div`
  position: relative;
  width: 100%;
`;

const StyledInput = styled.input<{ hasError?: boolean; isValid?: boolean }>`
  width: 100%;
  padding: 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid ${props => 
    props.hasError ? 'var(--error, #ff3b30)' : 
    props.isValid ? 'var(--success, #34c759)' : 
    'var(--border)'};
  font-size: 1rem;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  background-color: var(--cardBackground);
  color: var(--text);
  
  &:hover {
    border-color: ${props => 
      props.hasError ? 'var(--error, #ff3b30)' : 
      props.isValid ? 'var(--success, #34c759)' : 
      'var(--primary)'};
    box-shadow: 0 0 0 1px ${props => 
      props.hasError ? 'rgba(255, 59, 48, 0.1)' : 
      props.isValid ? 'rgba(52, 199, 89, 0.1)' : 
      'rgba(0, 113, 227, 0.1)'};
  }
  
  &:focus {
    outline: none;
    border-color: ${props => 
      props.hasError ? 'var(--error, #ff3b30)' : 
      props.isValid ? 'var(--success, #34c759)' : 
      'var(--primary)'};
    box-shadow: 0 0 0 3px ${props => 
      props.hasError ? 'rgba(255, 59, 48, 0.2)' : 
      props.isValid ? 'rgba(52, 199, 89, 0.2)' : 
      'rgba(0, 113, 227, 0.2)'};
    transform: translateY(-1px);
  }
`;

const ErrorMessage = styled(motion.div)`
  color: var(--error, #ff3b30);
  font-size: 0.8rem;
  margin-top: 0.25rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const SuccessMessage = styled(motion.div)`
  color: var(--success, #34c759);
  font-size: 0.8rem;
  margin-top: 0.25rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const ValidationIcon = styled.span`
  font-size: 0.75rem;
`;

interface ValidatedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  validation?: {
    required?: boolean;
    min?: number;
    max?: number;
    pattern?: RegExp;
    customValidator?: (value: string) => string | null;
  };
  showValidation?: boolean;
  onValidationChange?: (isValid: boolean) => void;
}

const ValidatedInput: React.FC<ValidatedInputProps> = ({
  label,
  validation,
  showValidation = true,
  onValidationChange,
  value,
  onChange,
  ...props
}) => {
  const [error, setError] = useState<string | null>(null);
  const [isValid, setIsValid] = useState<boolean>(false);
  const [touched, setTouched] = useState<boolean>(false);

  const validateValue = (val: string) => {
    if (!validation) return null;

    if (validation.required && (!val || val.trim() === '')) {
      return 'This field is required';
    }

    if (validation.min !== undefined && Number(val) < validation.min) {
      return `Value must be at least ${validation.min}`;
    }

    if (validation.max !== undefined && Number(val) > validation.max) {
      return `Value must not exceed ${validation.max}`;
    }

    if (validation.pattern && !validation.pattern.test(val)) {
      return 'Invalid format';
    }

    if (validation.customValidator) {
      const customError = validation.customValidator(val);
      if (customError) return customError;
    }

    return null;
  };

  useEffect(() => {
    if (touched && showValidation) {
      const validationError = validateValue(String(value || ''));
      setError(validationError);
      const valid = !validationError && String(value || '').trim() !== '';
      setIsValid(valid);
      onValidationChange?.(valid);
    }
  }, [value, validation, touched, showValidation, onValidationChange]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e);
    if (!touched) setTouched(true);
  };

  const handleBlur = () => {
    if (!touched) setTouched(true);
  };

  return (
    <InputContainer>
      <StyledInput
        {...props}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        hasError={touched && showValidation && !!error}
        isValid={touched && showValidation && isValid && !error}
      />
      <AnimatePresence>
        {touched && showValidation && error && (
          <ErrorMessage
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <ValidationIcon>⚠️</ValidationIcon>
            {error}
          </ErrorMessage>
        )}
        {touched && showValidation && isValid && !error && (
          <SuccessMessage
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <ValidationIcon>✅</ValidationIcon>
            Valid
          </SuccessMessage>
        )}
      </AnimatePresence>
    </InputContainer>
  );
};

export default ValidatedInput;
