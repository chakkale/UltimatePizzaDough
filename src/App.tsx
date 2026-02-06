import React, { useState } from 'react';
// Uncomment useEffect when re-enabling password protection
// import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
// import { useTheme } from './context/ThemeContext'; // Only needed for LanguageSelector
import { TranslationProvider, useTranslation } from './context/TranslationContext';
import CalculatorForm from './components/CalculatorForm';
import RecipeDisplay from './components/RecipeDisplay';
import HeaderControls from './components/HeaderControls';
import TemplateManager from './components/TemplateManager';
import ToastProvider from './components/ToastProvider';
import { useDoughCalculator } from './hooks/useDoughCalculator';
// Password protection temporarily disabled - uncomment to re-enable
// import PasswordProtection from './components/PasswordProtection';
import ThemeToggle from './components/ThemeToggle';
import LanguageToggle from './components/LanguageToggle';
import heroDough from './assets/hero-dough.png';
// Language selector temporarily removed - can re-enable if needed
// import LanguageSelector from './components/LanguageSelector';
import {
  AppContainer,
  Header,
  HeaderRow,
  ThemeToggleWrapper,
  ContentContainer,
  Footer,
  Button
} from './components/StyledComponents';

// Inner component that uses the theme context
const AppContent: React.FC = () => {
  const [showTemplateManager, setShowTemplateManager] = useState(false);
  const { t } = useTranslation();
  const {
    inputs,
    recipe,
    templates,
    handleInputChange,
    handlePizzaStyleChange,
    handlePrefermentTypeChange,
    handlePizzaDiameterChange,
    handleThicknessFactorChange,
    handlePanDimensionsChange,
    handleUseInchesChange,
    handlePrefermentPercentageChange,
    handlePrefermentHydrationChange,
    handleYeastTypeChange,
    handleShapeToggle,
    handleSaveTemplate,
    handleApplyTemplate,
    handleDeleteTemplate,
    resetToDefaults: onReset,
  } = useDoughCalculator();

  // Password protection temporarily disabled - uncomment to re-enable
  // useEffect(() => {
  //   // Check if user is already authenticated
  //   const token = localStorage.getItem('auth_token');
  //   if (token) {
  //     setIsAuthenticated(true);
  //   }
  // }, []);

  return (
    <ToastProvider>
      {/* Password protection temporarily disabled - uncomment to re-enable */}
      {/* {!isAuthenticated ? (
        <PasswordProtection onPasswordSuccess={() => setIsAuthenticated(true)} />
      ) : ( */}
        <AppContainer>
            <Header>
              <HeaderRow>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                  <img
                    src={heroDough}
                    alt={t('app.title')}
                    style={{
                      width: '100%',
                      maxWidth: '500px',
                      height: 'auto',
                      borderRadius: '12px',
                      objectFit: 'cover'
                    }}
                  />
                </div>
                <ThemeToggleWrapper>
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                    <LanguageToggle />
                    <ThemeToggle />
                  </div>
                </ThemeToggleWrapper>
              </HeaderRow>
              <HeaderControls />
            </Header>
            <ContentContainer>
              <CalculatorForm
                inputs={inputs}
                templates={templates}
                onInputChange={handleInputChange}
                onPizzaStyleChange={handlePizzaStyleChange}
                onPrefermentTypeChange={handlePrefermentTypeChange}
                onPizzaDiameterChange={handlePizzaDiameterChange}
                onThicknessFactorChange={handleThicknessFactorChange}
                onPanDimensionsChange={handlePanDimensionsChange}
                handleUseInchesChange={handleUseInchesChange}
                onPrefermentPercentageChange={handlePrefermentPercentageChange}
                onPrefermentHydrationChange={handlePrefermentHydrationChange}
                handleYeastTypeChange={handleYeastTypeChange}
                handleShapeToggle={handleShapeToggle}
                handleSaveTemplate={handleSaveTemplate}
                handleApplyTemplate={handleApplyTemplate}
                handleDeleteTemplate={handleDeleteTemplate}
                onReset={onReset}
              />
              
              {recipe && <RecipeDisplay recipe={recipe} pizzaStyle={inputs.pizzaStyle} />}
              
              <Button 
                onClick={() => setShowTemplateManager(true)}
                style={{ 
                  marginTop: '1rem',
                  background: 'linear-gradient(135deg, #34c759 0%, #30d158 100%)',
                  padding: '0.875rem 1.5rem',
                  fontWeight: '600',
                  boxShadow: '0 4px 12px rgba(52, 199, 89, 0.3)'
                }}
              >
                📋 {t('button.manageTemplates')}
              </Button>
              
              {showTemplateManager && (
                <TemplateManager
                  templates={templates}
                  onSaveTemplate={handleSaveTemplate}
                  onApplyTemplate={handleApplyTemplate}
                  onDeleteTemplate={handleDeleteTemplate}
                  isCustomStyle={inputs.pizzaStyle === 'custom'}
                  onClose={() => setShowTemplateManager(false)}
                />
              )}
            </ContentContainer>
            
            <Footer>
              <p style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: '0.5rem',
                margin: 0 
              }}>
                {t('app.footer')} © {new Date().getFullYear()} {t('app.title')}
              </p>
            </Footer>
          </AppContainer>
        {/* )} */}
      </ToastProvider>
  );
};

// Main App component with providers
const App: React.FC = () => {
  return (
    <ThemeProvider>
      <TranslationProvider>
        <AppContent />
      </TranslationProvider>
    </ThemeProvider>
  );
};

export default App;
