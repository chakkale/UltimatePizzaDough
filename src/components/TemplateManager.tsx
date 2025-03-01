import React, { useState } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import { CustomPizzaTemplate } from '../types';
import { Button, FormGroup, Label, Input, InfoBox } from './StyledComponents';

const TemplateContainer = styled.div`
  margin-top: 1rem;
`;

const TemplateList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 1rem;
  max-height: 200px;
  overflow-y: auto;
`;

const TemplateItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem;
  border-radius: 8px;
  background-color: var(--cardBackground);
  border: 1px solid var(--border);
  transition: all 0.2s ease;
  
  &:hover {
    border-color: var(--primary);
    background-color: var(--hoverBackground);
  }
`;

const TemplateName = styled.div`
  font-weight: 500;
`;

const TemplateInfo = styled.div`
  font-size: 0.8rem;
  color: var(--lightText);
  margin-top: 0.25rem;
`;

const TemplateActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: var(--primary);
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: var(--primaryLight);
  }
  
  &.delete {
    color: var(--error);
    
    &:hover {
      background-color: rgba(255, 59, 48, 0.1);
    }
  }
`;

const SaveTemplateForm = styled(motion.div)`
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 8px;
  background-color: var(--cardBackground);
  border: 1px solid var(--border);
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const CloseButton = styled(Button)`
  background-color: var(--secondaryButton);
  &:hover {
    background-color: var(--secondaryButtonHover);
  }
`;

interface TemplateManagerProps {
  templates: CustomPizzaTemplate[];
  onSaveTemplate: (name: string) => void;
  onApplyTemplate: (id: string) => void;
  onDeleteTemplate: (id: string) => void;
  isCustomStyle: boolean;
  onClose?: () => void;
}

const TemplateManager: React.FC<TemplateManagerProps> = ({
  templates,
  onSaveTemplate,
  onApplyTemplate,
  onDeleteTemplate,
  isCustomStyle,
  onClose
}) => {
  const [showSaveForm, setShowSaveForm] = useState(false);
  const [templateName, setTemplateName] = useState('');
  const [error, setError] = useState('');

  const handleSave = () => {
    if (!templateName.trim()) {
      setError('Please enter a template name');
      return;
    }
    
    // Check if name already exists
    if (templates.some(t => t.name.toLowerCase() === templateName.trim().toLowerCase())) {
      setError('A template with this name already exists');
      return;
    }
    
    onSaveTemplate(templateName.trim());
    setTemplateName('');
    setShowSaveForm(false);
    setError('');
  };

  const handleCancel = () => {
    setShowSaveForm(false);
    setTemplateName('');
    setError('');
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString();
  };

  return (
    <TemplateContainer>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3>Template Manager</h3>
        {onClose && (
          <CloseButton onClick={onClose}>
            Close
          </CloseButton>
        )}
      </div>
      
      {templates.length === 0 ? (
        <InfoBox>
          No saved templates yet. Create custom pizza settings and save them as templates.
        </InfoBox>
      ) : (
        <TemplateList>
          {templates.map(template => (
            <TemplateItem key={template.id}>
              <div>
                <TemplateName>{template.name}</TemplateName>
                <TemplateInfo>
                  {template.hydration}% hydration • 
                  {template.isRectangular ? ' Rectangular' : ' Round'} • 
                  Created: {formatDate(template.createdAt)}
                </TemplateInfo>
              </div>
              <TemplateActions>
                <ActionButton onClick={() => onApplyTemplate(template.id)}>
                  Apply
                </ActionButton>
                <ActionButton 
                  className="delete"
                  onClick={() => onDeleteTemplate(template.id)}
                >
                  Delete
                </ActionButton>
              </TemplateActions>
            </TemplateItem>
          ))}
        </TemplateList>
      )}
      
      {isCustomStyle && (
        <>
          {!showSaveForm ? (
            <Button 
              style={{ marginTop: '1rem' }}
              onClick={() => setShowSaveForm(true)}
            >
              Save Current Settings as Template
            </Button>
          ) : (
            <AnimatePresence>
              <SaveTemplateForm
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <FormGroup>
                  <Label htmlFor="templateName">Template Name</Label>
                  <Input
                    id="templateName"
                    type="text"
                    value={templateName}
                    onChange={(e) => setTemplateName(e.target.value)}
                    placeholder="E.g., My Favorite NY Style"
                  />
                  {error && (
                    <p style={{ color: 'var(--error)', fontSize: '0.8rem', marginTop: '0.5rem' }}>
                      {error}
                    </p>
                  )}
                </FormGroup>
                <ButtonGroup>
                  <Button onClick={handleSave}>Save Template</Button>
                  <Button 
                    onClick={handleCancel}
                    style={{ 
                      backgroundColor: 'transparent', 
                      color: 'var(--text)',
                      border: '1px solid var(--border)'
                    }}
                  >
                    Cancel
                  </Button>
                </ButtonGroup>
              </SaveTemplateForm>
            </AnimatePresence>
          )}
        </>
      )}
    </TemplateContainer>
  );
};

export default TemplateManager; 