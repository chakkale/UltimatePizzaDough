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
    resetToDefaults: onReset
  } = useDoughCalculator();

  return (
    <ThemeProvider>
      <AppContainer>
        <Header>
          <Title>Ultimate Pizza Dough Calculator</Title>
          <Subtitle>Create the perfect pizza dough with baker's percentages</Subtitle>
          <HeaderControls />
        </Header>

        <ContentContainer>
          <CalculatorForm
            inputs={inputs}
            onInputChange={onInputChange}
            onPizzaStyleChange={onPizzaStyleChange}
            onPrefermentTypeChange={onPrefermentTypeChange}
            onPizzaDiameterChange={onPizzaDiameterChange}
            onThicknessFactorChange={onThicknessFactorChange}
            onPanDimensionsChange={onPanDimensionsChange}
            onPrefermentPercentageChange={onPrefermentPercentageChange}
            onPrefermentHydrationChange={onPrefermentHydrationChange}
            handleUseInchesChange={handleUseInchesChange}
            handleYeastTypeChange={handleYeastTypeChange}
            onReset={onReset}
          />
          <RecipeDisplay recipe={recipe} />
        </ContentContainer>

        <Footer>
          <p>Created with ❤️ for pizza enthusiasts everywhere</p>
        </Footer>
      </AppContainer>
    </ThemeProvider>
  );
};

export default App;
