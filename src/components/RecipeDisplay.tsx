import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { DoughRecipe } from '../types';
import { roundToOneDecimal, roundToTwoDecimals, gramsToOunces, cmToInches } from '../utils/doughCalculator';
import { trackTabChange } from '../utils/analytics';
import LoadingSpinner from './LoadingSpinner';
import EmptyState from './EmptyState';
import { useTranslation } from '../context/TranslationContext';
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
  const { t } = useTranslation();

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
          title={t('empty.title')}
          message={t('empty.message')}
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
        <LoadingSpinner fullScreen text={t('loading.recipe')} />
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

  // Helper function to translate ingredient names
  const translateIngredient = (name: string): string => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes('flour')) return t('ingredient.flour');
    if (lowerName.includes('water')) return t('ingredient.water');
    if (lowerName.includes('salt')) return t('ingredient.salt');
    if (lowerName.includes('yeast')) return t('ingredient.yeast');
    if (lowerName.includes('oil')) return t('ingredient.oil');
    if (lowerName.includes('sugar')) return t('ingredient.sugar');
    if (lowerName.includes('preferment')) return t('ingredient.preferment');
    if (lowerName.includes('diastatic malt')) return t('ingredient.diastaticMalt');
    if (lowerName.includes('dough enhancer')) return t('ingredient.doughEnhancer');
    return name; // Return original name if no translation found
  };

  return (
    <StickyCard
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <SectionTitle>{t('recipe.title')}</SectionTitle>

      {recipe.pizzaInfo && (
        <InfoBox>
          {recipe.pizzaInfo.panWidth && recipe.pizzaInfo.panLength ? (
            <>
              <strong>{t('recipe.info')}:</strong> {recipe.pizzaInfo.panWidth}cm × {recipe.pizzaInfo.panLength}cm ({safeCmToInches(recipe.pizzaInfo.panWidth)}″ × {safeCmToInches(recipe.pizzaInfo.panLength)}″) {t('form.rectangular').toLowerCase()} {t('form.thicknessFactor').toLowerCase()} {recipe.pizzaInfo.thicknessFactor.toFixed(2)} oz/in².
            </>
          ) : (
            <>
              <strong>{t('recipe.info')}:</strong> {recipe.pizzaInfo.diameter}cm ({recipe.pizzaInfo.diameter ? safeCmToInches(recipe.pizzaInfo.diameter) : "0.0"}″) {t('recipe.diameter')} {t('form.thicknessFactor').toLowerCase()} {recipe.pizzaInfo.thicknessFactor.toFixed(2)} oz/in².
            </>
          )}
        </InfoBox>
      )}

      <TabsContainer>
        <Tab
          active={activeTab === 'ingredients'}
          onClick={() => setActiveTab('ingredients')}
        >
          {t('recipe.ingredients')}
        </Tab>
        <Tab
          active={activeTab === 'method'}
          onClick={() => setActiveTab('method')}
        >
          {t('method.title')}
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
                  <TableHeader>{t('recipe.ingredient')}</TableHeader>
                  <TableHeader>{t('recipe.weight')}</TableHeader>
                  <TableHeader>{t('recipe.percentage')}</TableHeader>
                </tr>
              </thead>
              <tbody>
                {recipe.ingredients.map((ingredient, index) => (
                  <tr key={index}>
                    <TableCell>{translateIngredient(ingredient.name)}</TableCell>
                    <TableCell>{isYeast(ingredient.name) ? roundToTwoDecimals(ingredient.weight) : roundToOneDecimal(ingredient.weight)}g</TableCell>
                    <TableCell>{ingredient.percentage}%</TableCell>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Section>

          {recipe.preferment && recipe.mainDough && (
            <Section>
              <SectionTitle>{t('preferment.title')}</SectionTitle>
              <InfoBox>
                {t('preferment.info')}
              </InfoBox>

              <h3 style={{ marginBottom: '1rem' }}>{t('recipe.preferment')}</h3>
              <Table>
                <thead>
                  <tr>
                    <TableHeader>{t('recipe.ingredient')}</TableHeader>
                    <TableHeader>{t('recipe.weight')}</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <TableCell>{t('ingredient.flour')}</TableCell>
                    <TableCell>{roundToOneDecimal(recipe.preferment.flour)}g</TableCell>
                  </tr>
                  <tr>
                    <TableCell>{t('ingredient.water')}</TableCell>
                    <TableCell>{roundToOneDecimal(recipe.preferment.water)}g</TableCell>
                  </tr>
                  {recipe.preferment.yeast !== undefined && (
                    <tr>
                      <TableCell>{t('ingredient.yeast')}</TableCell>
                      <TableCell>{roundToTwoDecimals(recipe.preferment.yeast)}g</TableCell>
                    </tr>
                  )}
                </tbody>
              </Table>

              <h3 style={{ margin: '1.5rem 0 1rem' }}>{t('recipe.mainDough')}</h3>
              <Table>
                <thead>
                  <tr>
                    <TableHeader>{t('recipe.ingredient')}</TableHeader>
                    <TableHeader>{t('recipe.weight')}</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <TableCell>{t('ingredient.flour')}</TableCell>
                    <TableCell>{roundToOneDecimal(recipe.mainDough.flour)}g</TableCell>
                  </tr>
                  <tr>
                    <TableCell>{t('ingredient.water')}</TableCell>
                    <TableCell>{roundToOneDecimal(recipe.mainDough.water)}g</TableCell>
                  </tr>
                  <tr>
                    <TableCell>{t('ingredient.salt')}</TableCell>
                    <TableCell>{roundToOneDecimal(recipe.mainDough.salt)}g</TableCell>
                  </tr>
                  {recipe.mainDough.yeast > 0 && (
                    <tr>
                      <TableCell>{t('ingredient.yeast')}</TableCell>
                      <TableCell>{roundToTwoDecimals(recipe.mainDough.yeast)}g</TableCell>
                    </tr>
                  )}
                  {recipe.mainDough.oil !== undefined && (
                    <tr>
                      <TableCell>{t('ingredient.oil')}</TableCell>
                      <TableCell>{roundToOneDecimal(recipe.mainDough.oil)}g</TableCell>
                    </tr>
                  )}
                  {recipe.mainDough.sugar !== undefined && (
                    <tr>
                      <TableCell>{t('ingredient.sugar')}</TableCell>
                      <TableCell>{roundToOneDecimal(recipe.mainDough.sugar)}g</TableCell>
                    </tr>
                  )}
                  {recipe.mainDough.diastaticMalt !== undefined && (
                    <tr>
                      <TableCell>{t('ingredient.diastaticMalt')}</TableCell>
                      <TableCell>{roundToOneDecimal(recipe.mainDough.diastaticMalt)}g</TableCell>
                    </tr>
                  )}
                  {recipe.mainDough.doughEnhancer !== undefined && (
                    <tr>
                      <TableCell>{t('ingredient.doughEnhancer')}</TableCell>
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
                <h3>{t('preferment.instructions')}</h3>
                <ol style={{ paddingLeft: '1.5rem', lineHeight: '1.6' }}>
                  <li>
                    {t('preferment.step1')
                      .replace('{flour}', roundToOneDecimal(recipe.preferment.flour).toString())
                      .replace('{flourOz}', safeGramsToOunces(recipe.preferment.flour))
                      .replace('{water}', roundToOneDecimal(recipe.preferment.water).toString())
                      .replace('{waterOz}', safeGramsToOunces(recipe.preferment.water))
                      .replace('{yeast}', recipe.preferment.yeast !== undefined 
                        ? t('preferment.step1.yeast')
                            .replace('{yeast}', roundToTwoDecimals(recipe.preferment.yeast).toString())
                            .replace('{yeastOz}', safeGramsToOunces(recipe.preferment.yeast))
                        : ''
                      )}
                  </li>
                  <li>
                    {recipe.prefermentType === 'sponge' ? t('preferment.step2.sponge') : t('preferment.step2.poolish')}
                  </li>
                  <li>
                    {recipe.prefermentType === 'sponge' ? t('preferment.step3.sponge') : t('preferment.step3.poolish')}
                  </li>
                </ol>
              </Section>

              <Section>
                <h3>{t('mainDough.instructions')}</h3>
                <ol style={{ paddingLeft: '1.5rem', lineHeight: '1.6' }}>
                  <li>
                    {t('mainDough.step1')
                      .replace('{water}', roundToOneDecimal(recipe.mainDough.water).toString())
                      .replace('{waterOz}', safeGramsToOunces(recipe.mainDough.water))}
                  </li>
                  <li>
                    {t('mainDough.step2')
                      .replace('{flour}', roundToOneDecimal(recipe.mainDough.flour).toString())
                      .replace('{flourOz}', safeGramsToOunces(recipe.mainDough.flour))}
                  </li>
                  <li>
                    {t('mainDough.step3.start')
                      .replace('{salt}', roundToOneDecimal(recipe.mainDough.salt).toString())
                      .replace('{saltOz}', safeGramsToOunces(recipe.mainDough.salt))}
                    {recipe.mainDough.yeast > 0 
                      ? t('mainDough.step3.yeast')
                          .replace('{yeast}', roundToTwoDecimals(recipe.mainDough.yeast).toString())
                          .replace('{yeastOz}', safeGramsToOunces(recipe.mainDough.yeast))
                      : ''}
                    {recipe.mainDough.oil 
                      ? t('mainDough.step3.oil')
                          .replace('{oil}', roundToOneDecimal(recipe.mainDough.oil).toString())
                          .replace('{oilOz}', safeGramsToOunces(recipe.mainDough.oil))
                      : ''}
                    {recipe.mainDough.sugar 
                      ? t('mainDough.step3.sugar')
                          .replace('{sugar}', roundToOneDecimal(recipe.mainDough.sugar).toString())
                          .replace('{sugarOz}', safeGramsToOunces(recipe.mainDough.sugar))
                      : ''}
                    {recipe.mainDough.diastaticMalt 
                      ? t('mainDough.step3.malt')
                          .replace('{malt}', roundToOneDecimal(recipe.mainDough.diastaticMalt).toString())
                          .replace('{maltOz}', safeGramsToOunces(recipe.mainDough.diastaticMalt))
                      : ''}
                    {recipe.mainDough.doughEnhancer 
                      ? t('mainDough.step3.enhancer')
                          .replace('{enhancer}', roundToOneDecimal(recipe.mainDough.doughEnhancer).toString())
                          .replace('{enhancerOz}', safeGramsToOunces(recipe.mainDough.doughEnhancer))
                      : ''}
                    {t('mainDough.step3.end')}
                  </li>
                  <li>{t('mainDough.step4')}</li>
                  <li>{t('mainDough.step5')}</li>
                  <li>{t('mainDough.step6')}</li>
                  <li>{t('mainDough.step7')}</li>
                  <li>{t('mainDough.step8')}</li>
                </ol>
              </Section>
            </>
          ) : (
            <Section>
              <h3>{t('dough.instructions')}</h3>
              <ol style={{ paddingLeft: '1.5rem', lineHeight: '1.6' }}>
                <li>
                  {t('dough.step1')
                    .replace('{water}', roundToOneDecimal(getIngredientWeight('Water')).toString())
                    .replace('{waterOz}', safeGramsToOunces(getIngredientWeight('Water')))
                    .replace('{salt}', roundToOneDecimal(getIngredientWeight('Salt')).toString())
                    .replace('{saltOz}', safeGramsToOunces(getIngredientWeight('Salt')))}
                </li>
                <li>
                  {t('dough.step2')
                    .replace('{flour}', roundToOneDecimal(getIngredientWeight('Flour')).toString())
                    .replace('{flourOz}', safeGramsToOunces(getIngredientWeight('Flour')))}
                </li>
                {recipe.ingredients.some(i => isYeast(i.name)) && (
                  <li>
                    {t('dough.step3.yeast')
                      .replace('{yeast}', roundToTwoDecimals(recipe.ingredients.find(i => isYeast(i.name))?.weight || 0).toString())
                      .replace('{yeastOz}', safeGramsToOunces(recipe.ingredients.find(i => isYeast(i.name))?.weight || 0))
                      .replace('{yeastName}', translateIngredient(recipe.ingredients.find(i => isYeast(i.name))?.name || 'Yeast'))}
                  </li>
                )}
                {getIngredientWeight('Oil') > 0 && (
                  <li>
                    {t('dough.step3.oil')
                      .replace('{oil}', roundToOneDecimal(getIngredientWeight('Oil')).toString())
                      .replace('{oilOz}', safeGramsToOunces(getIngredientWeight('Oil')))}
                  </li>
                )}
                {getIngredientWeight('Sugar') > 0 && (
                  <li>
                    {t('dough.step3.sugar')
                      .replace('{sugar}', roundToOneDecimal(getIngredientWeight('Sugar')).toString())
                      .replace('{sugarOz}', safeGramsToOunces(getIngredientWeight('Sugar')))}
                  </li>
                )}
                {getIngredientWeight('Diastatic Malt') > 0 && (
                  <li>
                    {t('dough.step3.malt')
                      .replace('{malt}', roundToOneDecimal(getIngredientWeight('Diastatic Malt')).toString())
                      .replace('{maltOz}', safeGramsToOunces(getIngredientWeight('Diastatic Malt')))}
                  </li>
                )}
                {getIngredientWeight('Dough Enhancer') > 0 && (
                  <li>
                    {t('dough.step3.enhancer')
                      .replace('{enhancer}', roundToOneDecimal(getIngredientWeight('Dough Enhancer')).toString())
                      .replace('{enhancerOz}', safeGramsToOunces(getIngredientWeight('Dough Enhancer')))}
                  </li>
                )}
                <li>{t('dough.step4')}</li>
                <li>{t('mainDough.step4')}</li>
                <li>{t('mainDough.step5')}</li>
                <li>{t('mainDough.step6')}</li>
                <li>{t('mainDough.step7')}</li>
                <li>{t('mainDough.step8')}</li>
              </ol>
            </Section>
          )}

          <Section>
            <h3>{t('baking.instructions')}</h3>
            <ol style={{ paddingLeft: '1.5rem', lineHeight: '1.6' }}>
              <li>{t('baking.step1')}</li>
              <li>{t('baking.step2')}</li>
              <li>{t('baking.step3')}</li>
              <li>{t('baking.step4')}</li>
            </ol>
          </Section>
        </motion.div>
      )}
    </StickyCard>
  );
};

export default RecipeDisplay; 