import React from 'react';
import { useDoughCalculator } from './hooks/useDoughCalculator';
import CalculatorForm from './components/CalculatorForm';
import RecipeDisplay from './components/RecipeDisplay';
import HeaderControls from './components/HeaderControls';
import { ThemeProvider } from './context/ThemeContext';
import {
  AppContainer,
  Header,
  Title,
  Subtitle,
  ContentContainer,
  Footer
} from './components/StyledComponents';

const App: React.FC = () => {
  const {
    inputs,
    recipe,
    templates,
    handleInputChange: onInputChange,
    handlePizzaStyleChange: onPizzaStyleChange,
    handlePrefermentTypeChange: onPrefermentTypeChange,
    handlePizzaDiameterChange: onPizzaDiameterChange,
    handleThicknessFactorChange: onThicknessFactorChange,
    handlePanDimensionsChange: onPanDimensionsChange,
    handleUseInchesChange,
    handlePrefermentPercentageChange: onPrefermentPercentageChange,
    handlePrefermentHydrationChange: onPrefermentHydrationChange,
    handleYeastTypeChange,
    handleShapeToggle,
    handleSaveTemplate,
    handleApplyTemplate,
    handleDeleteTemplate,
    resetToDefaults: onReset
  } = useDoughCalculator();

  return (
    <ThemeProvider>
      <AppContainer>
        <Header>
          <Title>Ultimate Pizza Dough Calculator</Title>
          <Subtitle>Create the perfect pizza dough for any style</Subtitle>
          <HeaderControls />
        </Header>
        
        <ContentContainer>
          <CalculatorForm
            inputs={inputs}
            templates={templates}
            onInputChange={onInputChange}
            onPizzaStyleChange={onPizzaStyleChange}
            onPrefermentTypeChange={onPrefermentTypeChange}
            onPizzaDiameterChange={onPizzaDiameterChange}
            onThicknessFactorChange={onThicknessFactorChange}
            onPanDimensionsChange={onPanDimensionsChange}
            handleUseInchesChange={handleUseInchesChange}
            onPrefermentPercentageChange={onPrefermentPercentageChange}
            onPrefermentHydrationChange={onPrefermentHydrationChange}
            handleYeastTypeChange={handleYeastTypeChange}
            handleShapeToggle={handleShapeToggle}
            handleSaveTemplate={handleSaveTemplate}
            handleApplyTemplate={handleApplyTemplate}
            handleDeleteTemplate={handleDeleteTemplate}
            onReset={onReset}
          />
          
          {recipe && <RecipeDisplay recipe={recipe} />}
        </ContentContainer>
        
        <Footer>
          <p>Created with ❤️ for pizza enthusiasts everywhere</p>
          <p>© {new Date().getFullYear()} Ultimate Pizza Dough Calculator</p>
        </Footer>
      </AppContainer>
    </ThemeProvider>
  );
};

export default App;
