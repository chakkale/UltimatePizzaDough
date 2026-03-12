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
                <div style={{
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  width: '100%'
                }}>
                  <div style={{
                    position: 'relative',
                    width: '100%',
                    maxWidth: '640px',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.15), 0 2px 8px rgba(0,0,0,0.1)'
                  }}>
                    <img
                      src={heroDough}
                      alt={t('app.title')}
                      style={{
                        width: '100%',
                        height: 'auto',
                        objectFit: 'cover',
                        display: 'block'
                      }}
                    />
                    <div style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      padding: '3rem 1.5rem 1.25rem',
                      background: 'linear-gradient(transparent, rgba(15,14,13,0.85))',
                      textAlign: 'center'
                    }}>
                      <h1 style={{
                        margin: 0,
                        fontSize: 'clamp(1.8rem, 5vw, 2.75rem)',
                        fontWeight: 600,
                        color: '#fff',
                        textShadow: '0 2px 12px rgba(0,0,0,0.6)',
                        fontFamily: '"Playfair Display", Georgia, serif',
                        letterSpacing: '-0.01em'
                      }}>
                        {t('app.title')}
                      </h1>
                      <p style={{
                        margin: '0.35rem 0 0',
                        fontSize: 'clamp(0.7rem, 1.8vw, 0.85rem)',
                        color: 'rgba(255,255,255,0.6)',
                        fontWeight: 500,
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase'
                      }}>
                        Pizza Dough Calculator
                      </p>
                    </div>
                  </div>
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
                  background: 'none',
                  border: '1.5px solid var(--primary)',
                  color: 'var(--primary)',
                  padding: '0.8rem 1.5rem',
                  fontWeight: '600',
                  boxShadow: 'none'
                }}
              >
                {t('button.manageTemplates')}
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
                gap: '0.3rem',
                margin: 0,
                flexWrap: 'wrap'
              }}>
                {t('app.footer')} by{' '}
                <a
                  href="https://dogukanatlihan.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'var(--primary)', textDecoration: 'none' }}
                >
                  Dogukan Atlihan
                </a>
                {' '}· {t('app.title')}
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
