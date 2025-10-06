import React, { useState } from 'react';
// Uncomment useEffect when re-enabling password protection
// import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import CalculatorForm from './components/CalculatorForm';
import RecipeDisplay from './components/RecipeDisplay';
import HeaderControls from './components/HeaderControls';
import TemplateManager from './components/TemplateManager';
import ToastProvider from './components/ToastProvider';
import { useDoughCalculator } from './hooks/useDoughCalculator';
// Password protection temporarily disabled - uncomment to re-enable
// import PasswordProtection from './components/PasswordProtection';
import {
  AppContainer,
  Header,
  ContentContainer,
  Footer,
  Button
} from './components/StyledComponents';

const App: React.FC = () => {
  // Password protection temporarily disabled - uncomment to re-enable
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showTemplateManager, setShowTemplateManager] = useState(false);
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
    <ThemeProvider>
      <ToastProvider>
        {/* Password protection temporarily disabled - uncomment to re-enable */}
        {/* {!isAuthenticated ? (
          <PasswordProtection onPasswordSuccess={() => setIsAuthenticated(true)} />
        ) : ( */}
          <AppContainer>
            <Header>
              <h1 style={{ 
                background: 'linear-gradient(135deg, #0071e3 0%, #5e5ce6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
                textAlign: 'center',
                margin: '0 0 0.5rem 0',
                fontWeight: '700',
                letterSpacing: '-0.02em'
              }}>
                🍕 Ultimate Pizza Dough Calculator
              </h1>
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
              
              {recipe && <RecipeDisplay recipe={recipe} />}
              
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
                📋 Manage Templates
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
                Made with ❤️ © {new Date().getFullYear()} Ultimate Pizza Dough Calculator
              </p>
            </Footer>
          </AppContainer>
        {/* )} */}
      </ToastProvider>
    </ThemeProvider>
  );
};

export default App;
