import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { DoughRecipe } from '../types';
import { roundToOneDecimal, roundToTwoDecimals, gramsToOunces, cmToInches } from '../utils/doughCalculator';
import { trackTabChange } from '../utils/analytics';
import LoadingSpinner from './LoadingSpinner';
import EmptyState from './EmptyState';
import {
  StickyCard,
  SectionTitle,
  Table,
  TableHeader,
  TableCell,
  InfoBox,
  Section,
  TabsContainer,
  Tab
} from './StyledComponents';

interface RecipeDisplayProps {
  recipe: DoughRecipe | null;
}

const RecipeDisplay: React.FC<RecipeDisplayProps> = ({ recipe }) => {
  const [activeTab, setActiveTab] = useState<'ingredients' | 'method'>('ingredients');
  const [isLoading, setIsLoading] = useState(false);

  // Track tab changes
  useEffect(() => {
    if (recipe) {
      trackTabChange(activeTab);
    }
  }, [activeTab, recipe]);

  // Simulate loading when recipe changes
  useEffect(() => {
    if (recipe) {
      setIsLoading(true);
      const timer = setTimeout(() => setIsLoading(false), 300);
      return () => clearTimeout(timer);
    }
  }, [recipe]);

  if (!recipe) {
    return (
      <StickyCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <EmptyState
          icon="🍕"
          title="No Recipe Yet"
          message="Adjust your pizza settings to generate a customized dough recipe with precise measurements and step-by-step instructions."
        />
      </StickyCard>
    );
  }

  if (isLoading) {
    return (
      <StickyCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <LoadingSpinner fullScreen text="Calculating your perfect recipe..." />
      </StickyCard>
    );
  }

  // Find ingredients by name for method instructions
  const getIngredientWeight = (name: string): number => {
    const ingredient = recipe.ingredients.find(i => i.name === name);
    return ingredient ? ingredient.weight : 0;
  };

  // Helper function to safely convert values
  const safeGramsToOunces = (g: number | undefined): string => {
    if (g === undefined) return '0.0';
    return gramsToOunces(g).toFixed(1);
  };

  // Helper function to safely convert values
  const safeCmToInches = (cm: number | undefined): string => {
    if (cm === undefined) return '0.0';
    return cmToInches(cm).toFixed(1);
  };

  // Helper function to determine if an ingredient is yeast
  const isYeast = (name: string): boolean => {
    return name.toLowerCase().includes('yeast');
  };

  return (
    <StickyCard
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <SectionTitle>Your Pizza Dough Recipe</SectionTitle>

      {recipe.pizzaInfo && (
        <InfoBox>
          {recipe.pizzaInfo.panWidth && recipe.pizzaInfo.panLength ? (
            <>
              <strong>Pizza Info:</strong> {recipe.pizzaInfo.panWidth}cm × {recipe.pizzaInfo.panLength}cm ({safeCmToInches(recipe.pizzaInfo.panWidth)}″ × {safeCmToInches(recipe.pizzaInfo.panLength)}″) rectangular pan with a thickness factor of {recipe.pizzaInfo.thicknessFactor.toFixed(2)} oz/in².
            </>
          ) : (
            <>
              <strong>Pizza Info:</strong> {recipe.pizzaInfo.diameter}cm ({recipe.pizzaInfo.diameter ? safeCmToInches(recipe.pizzaInfo.diameter) : "0.0"}″) diameter with a thickness factor of {recipe.pizzaInfo.thicknessFactor.toFixed(2)} oz/in².
            </>
          )}
        </InfoBox>
      )}

      <TabsContainer>
        <Tab
          active={activeTab === 'ingredients'}
          onClick={() => setActiveTab('ingredients')}
        >
          Ingredients
        </Tab>
        <Tab
          active={activeTab === 'method'}
          onClick={() => setActiveTab('method')}
        >
          Method
        </Tab>
      </TabsContainer>

      {activeTab === 'ingredients' && (
        <motion.div
          key="ingredients"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.3 }}
        >
          <Section>
            <Table>
              <thead>
                <tr>
                  <TableHeader>Ingredient</TableHeader>
                  <TableHeader>Weight</TableHeader>
                  <TableHeader>Baker's %</TableHeader>
                </tr>
              </thead>
              <tbody>
                {recipe.ingredients.map((ingredient, index) => (
                  <tr key={index}>
                    <TableCell>{ingredient.name}</TableCell>
                    <TableCell>{isYeast(ingredient.name) ? roundToTwoDecimals(ingredient.weight) : roundToOneDecimal(ingredient.weight)}g</TableCell>
                    <TableCell>{ingredient.percentage}%</TableCell>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Section>

          {recipe.preferment && recipe.mainDough && (
            <Section>
              <SectionTitle>Preferment & Main Dough</SectionTitle>
              <InfoBox>
                Prepare the preferment first and let it ferment before mixing with the main dough ingredients.
              </InfoBox>

              <h3 style={{ marginBottom: '1rem' }}>Preferment</h3>
              <Table>
                <thead>
                  <tr>
                    <TableHeader>Ingredient</TableHeader>
                    <TableHeader>Weight</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <TableCell>Flour</TableCell>
                    <TableCell>{roundToOneDecimal(recipe.preferment.flour)}g</TableCell>
                  </tr>
                  <tr>
                    <TableCell>Water</TableCell>
                    <TableCell>{roundToOneDecimal(recipe.preferment.water)}g</TableCell>
                  </tr>
                  {recipe.preferment.yeast !== undefined && (
                    <tr>
                      <TableCell>Yeast</TableCell>
                      <TableCell>{roundToTwoDecimals(recipe.preferment.yeast)}g</TableCell>
                    </tr>
                  )}
                </tbody>
              </Table>

              <h3 style={{ margin: '1.5rem 0 1rem' }}>Main Dough</h3>
              <Table>
                <thead>
                  <tr>
                    <TableHeader>Ingredient</TableHeader>
                    <TableHeader>Weight</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <TableCell>Flour</TableCell>
                    <TableCell>{roundToOneDecimal(recipe.mainDough.flour)}g</TableCell>
                  </tr>
                  <tr>
                    <TableCell>Water</TableCell>
                    <TableCell>{roundToOneDecimal(recipe.mainDough.water)}g</TableCell>
                  </tr>
                  <tr>
                    <TableCell>Salt</TableCell>
                    <TableCell>{roundToOneDecimal(recipe.mainDough.salt)}g</TableCell>
                  </tr>
                  {recipe.mainDough.yeast > 0 && (
                    <tr>
                      <TableCell>Yeast</TableCell>
                      <TableCell>{roundToTwoDecimals(recipe.mainDough.yeast)}g</TableCell>
                    </tr>
                  )}
                  {recipe.mainDough.oil !== undefined && (
                    <tr>
                      <TableCell>Oil</TableCell>
                      <TableCell>{roundToOneDecimal(recipe.mainDough.oil)}g</TableCell>
                    </tr>
                  )}
                  {recipe.mainDough.sugar !== undefined && (
                    <tr>
                      <TableCell>Sugar</TableCell>
                      <TableCell>{roundToOneDecimal(recipe.mainDough.sugar)}g</TableCell>
                    </tr>
                  )}
                  {recipe.mainDough.diastaticMalt !== undefined && (
                    <tr>
                      <TableCell>Diastatic Malt</TableCell>
                      <TableCell>{roundToOneDecimal(recipe.mainDough.diastaticMalt)}g</TableCell>
                    </tr>
                  )}
                  {recipe.mainDough.doughEnhancer !== undefined && (
                    <tr>
                      <TableCell>Dough Enhancer</TableCell>
                      <TableCell>{roundToOneDecimal(recipe.mainDough.doughEnhancer)}g</TableCell>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Section>
          )}
        </motion.div>
      )}

      {activeTab === 'method' && (
        <motion.div
          key="method"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {recipe.preferment && recipe.mainDough ? (
            <>
              <Section>
                <h3>Preferment Instructions</h3>
                <ol style={{ paddingLeft: '1.5rem', lineHeight: '1.6' }}>
                  <li>Mix {roundToOneDecimal(recipe.preferment.flour)}g ({safeGramsToOunces(recipe.preferment.flour)}oz) flour with {roundToOneDecimal(recipe.preferment.water)}g ({safeGramsToOunces(recipe.preferment.water)}oz) water{recipe.preferment.yeast !== undefined ? ` and ${roundToTwoDecimals(recipe.preferment.yeast)}g (${safeGramsToOunces(recipe.preferment.yeast)}oz) yeast` : ''} until no dry flour remains.</li>
                  <li>Cover and let ferment at room temperature (68-72°F/20-22°C) for {recipe.prefermentType === 'sponge' ? '3-5 hours' : '12-16 hours'}.</li>
                  <li>The preferment is ready when it has {recipe.prefermentType === 'sponge' ? 'a domed surface with many small bubbles' : 'doubled in size and has a domed or slightly collapsed surface with bubbles'}.</li>
                </ol>
              </Section>

              <Section>
                <h3>Main Dough Instructions</h3>
                <ol style={{ paddingLeft: '1.5rem', lineHeight: '1.6' }}>
                  <li>In a large bowl, combine the preferment with {roundToOneDecimal(recipe.mainDough.water)}g ({safeGramsToOunces(recipe.mainDough.water)}oz) water and mix until the preferment is dissolved.</li>
                  <li>Add {roundToOneDecimal(recipe.mainDough.flour)}g ({safeGramsToOunces(recipe.mainDough.flour)}oz) flour and mix until no dry flour remains. Cover and let rest for 30 minutes (autolyse).</li>
                  <li>Add {roundToOneDecimal(recipe.mainDough.salt)}g ({safeGramsToOunces(recipe.mainDough.salt)}oz) salt{recipe.mainDough.yeast > 0 ? `, ${roundToTwoDecimals(recipe.mainDough.yeast)}g (${safeGramsToOunces(recipe.mainDough.yeast)}oz) yeast` : ''}{recipe.mainDough.oil ? `, ${roundToOneDecimal(recipe.mainDough.oil)}g (${safeGramsToOunces(recipe.mainDough.oil)}oz) oil` : ''}{recipe.mainDough.sugar ? ` and ${roundToOneDecimal(recipe.mainDough.sugar)}g (${safeGramsToOunces(recipe.mainDough.sugar)}oz) sugar` : ''}{recipe.mainDough.diastaticMalt ? ` and ${roundToOneDecimal(recipe.mainDough.diastaticMalt)}g (${safeGramsToOunces(recipe.mainDough.diastaticMalt)}oz) diastatic malt` : ''}{recipe.mainDough.doughEnhancer ? ` and ${roundToOneDecimal(recipe.mainDough.doughEnhancer)}g (${safeGramsToOunces(recipe.mainDough.doughEnhancer)}oz) dough enhancer` : ''} and mix thoroughly.</li>
                  <li>Perform 3-4 sets of stretch and folds at 30-minute intervals.</li>
                  <li>After the final fold, let the dough bulk ferment until it has increased in volume by about 50% (2-4 hours depending on temperature).</li>
                  <li>Divide the dough into individual balls and shape them.</li>
                  <li>Place the dough balls in containers and refrigerate for 24-72 hours for cold fermentation.</li>
                  <li>Remove from the refrigerator 1-2 hours before baking to allow the dough to warm up.</li>
                </ol>
              </Section>
            </>
          ) : (
            <Section>
              <h3>Dough Instructions</h3>
              <ol style={{ paddingLeft: '1.5rem', lineHeight: '1.6' }}>
                <li>In a large bowl, combine {roundToOneDecimal(getIngredientWeight('Water'))}g ({safeGramsToOunces(getIngredientWeight('Water'))}oz) water with {roundToOneDecimal(getIngredientWeight('Salt'))}g ({safeGramsToOunces(getIngredientWeight('Salt'))}oz) salt until dissolved.</li>
                <li>Add {roundToOneDecimal(getIngredientWeight('Flour'))}g ({safeGramsToOunces(getIngredientWeight('Flour'))}oz) flour and mix until no dry flour remains.</li>
                {recipe.ingredients.some(i => isYeast(i.name)) && (
                  <li>Add {roundToTwoDecimals(recipe.ingredients.find(i => isYeast(i.name))?.weight || 0)}g ({safeGramsToOunces(recipe.ingredients.find(i => isYeast(i.name))?.weight || 0)}oz) {recipe.ingredients.find(i => isYeast(i.name))?.name} and mix thoroughly.</li>
                )}
                {getIngredientWeight('Oil') > 0 && (
                  <li>Add {roundToOneDecimal(getIngredientWeight('Oil'))}g ({safeGramsToOunces(getIngredientWeight('Oil'))}oz) oil and mix thoroughly.</li>
                )}
                {getIngredientWeight('Sugar') > 0 && (
                  <li>Add {roundToOneDecimal(getIngredientWeight('Sugar'))}g ({safeGramsToOunces(getIngredientWeight('Sugar'))}oz) sugar and mix thoroughly.</li>
                )}
                {getIngredientWeight('Diastatic Malt') > 0 && (
                  <li>Add {roundToOneDecimal(getIngredientWeight('Diastatic Malt'))}g ({safeGramsToOunces(getIngredientWeight('Diastatic Malt'))}oz) diastatic malt and mix thoroughly.</li>
                )}
                {getIngredientWeight('Dough Enhancer') > 0 && (
                  <li>Add {roundToOneDecimal(getIngredientWeight('Dough Enhancer'))}g ({safeGramsToOunces(getIngredientWeight('Dough Enhancer'))}oz) dough enhancer and mix thoroughly.</li>
                )}
                <li>Cover and let rest for 30 minutes (autolyse).</li>
                <li>Perform 3-4 sets of stretch and folds at 30-minute intervals.</li>
                <li>After the final fold, let the dough bulk ferment until it has increased in volume by about 50% (2-4 hours depending on temperature).</li>
                <li>Divide the dough into individual balls and shape them.</li>
                <li>Place the dough balls in containers and refrigerate for 24-72 hours for cold fermentation.</li>
                <li>Remove from the refrigerator 1-2 hours before baking to allow the dough to warm up.</li>
              </ol>
            </Section>
          )}

          <Section>
            <h3>Baking Instructions</h3>
            <ol style={{ paddingLeft: '1.5rem', lineHeight: '1.6' }}>
              <li>Preheat your oven to the highest temperature (ideally 500-550°F/260-290°C) with a pizza stone or steel for at least 1 hour.</li>
              <li>Gently stretch the dough to your desired size without deflating it too much.</li>
              <li>Add your toppings and transfer to the hot stone/steel.</li>
              <li>Bake until the crust is golden and the cheese is bubbly (typically 5-8 minutes).</li>
            </ol>
          </Section>
        </motion.div>
      )}
    </StickyCard>
  );
};

export default RecipeDisplay; 