import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import CalculatorForm from './components/CalculatorForm';
import RecipeDisplay from './components/RecipeDisplay';
import HeaderControls from './components/HeaderControls';
import TemplateManager from './components/TemplateManager';
import { useDoughCalculator } from './hooks/useDoughCalculator';
import PasswordProtection from './components/PasswordProtection';
import {
  AppContainer,
  Header,
  ContentContainer,
  Footer,
  Button
} from './components/StyledComponents';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
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

  useEffect(() => {
    // Check if user is already authenticated
    const token = localStorage.getItem('auth_token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <ThemeProvider>
      {!isAuthenticated ? (
        <PasswordProtection onPasswordSuccess={() => setIsAuthenticated(true)} />
      ) : (
        <AppContainer>
          <Header>
            <h1>Ultimate Pizza Dough Calculator</h1>
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
              style={{ marginTop: '1rem' }}
            >
              Manage Templates
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
            <p>© {new Date().getFullYear()} Ultimate Pizza Dough Calculator</p>
          </Footer>
        </AppContainer>
      )}
    </ThemeProvider>
  );
};

export default App;
