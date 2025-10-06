import React, { useState } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import { CustomPizzaTemplate } from '../types';
import { Button, FormGroup, Label, Input } from './StyledComponents';
import { useToast } from './ToastProvider';
import EmptyState from './EmptyState';
import { useTranslation } from '../context/TranslationContext';

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
  const { showToast } = useToast();
  const { t } = useTranslation();

  const handleSave = () => {
    if (!templateName.trim()) {
      setError(t('template.errorName'));
      return;
    }
    
    // Check if name already exists
    if (templates.some(t => t.name.toLowerCase() === templateName.trim().toLowerCase())) {
      setError(t('template.errorExists'));
      return;
    }
    
    onSaveTemplate(templateName.trim());
    setTemplateName('');
    setShowSaveForm(false);
    setError('');
    showToast(t('template.saved').replace('{name}', templateName.trim()), 'success');
  };

  const handleApply = (template: CustomPizzaTemplate) => {
    onApplyTemplate(template.id);
    showToast(t('template.applied').replace('{name}', template.name), 'info');
  };

  const handleDelete = (template: CustomPizzaTemplate) => {
    onDeleteTemplate(template.id);
    showToast(t('template.deleted').replace('{name}', template.name), 'warning');
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
        <h3>{t('template.manager')}</h3>
        {onClose && (
          <CloseButton onClick={onClose}>
            {t('template.close')}
          </CloseButton>
        )}
      </div>
      
      {templates.length === 0 ? (
        <EmptyState
          icon="📋"
          title={t('template.noTemplates')}
          message={t('template.noTemplatesMessage')}
          actionText={isCustomStyle ? t('template.saveCurrentSettings') : undefined}
          onAction={isCustomStyle ? () => setShowSaveForm(true) : undefined}
        />
      ) : (
        <TemplateList>
          {templates.map(template => (
            <TemplateItem key={template.id}>
              <div>
                <TemplateName>{template.name}</TemplateName>
                <TemplateInfo>
                  {template.hydration}% {t('template.hydration')} • 
                  {template.isRectangular ? ` ${t('template.rectangular')}` : ` ${t('template.round')}`} • 
                  {t('template.created')}: {formatDate(template.createdAt)}
                </TemplateInfo>
              </div>
              <TemplateActions>
                <ActionButton onClick={() => handleApply(template)}>
                  {t('template.apply')}
                </ActionButton>
                <ActionButton 
                  className="delete"
                  onClick={() => handleDelete(template)}
                >
                  {t('template.delete')}
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
              {t('template.saveAsTemplate')}
            </Button>
          ) : (
            <AnimatePresence>
              <SaveTemplateForm
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <FormGroup>
                  <Label htmlFor="templateName">{t('template.name')}</Label>
                  <Input
                    id="templateName"
                    type="text"
                    value={templateName}
                    onChange={(e) => setTemplateName(e.target.value)}
                    placeholder={t('template.placeholder')}
                  />
                  {error && (
                    <p style={{ color: 'var(--error)', fontSize: '0.8rem', marginTop: '0.5rem' }}>
                      {error}
                    </p>
                  )}
                </FormGroup>
                <ButtonGroup>
                  <Button onClick={handleSave}>{t('template.save')}</Button>
                  <Button 
                    onClick={handleCancel}
                    style={{ 
                      backgroundColor: 'transparent', 
                      color: 'var(--text)',
                      border: '1px solid var(--border)'
                    }}
                  >
                    {t('template.cancel')}
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