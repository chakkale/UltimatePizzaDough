import React from 'react';
import { motion } from 'framer-motion';
import { DoughCalculatorInputs, PrefermentType, YeastType, CustomPizzaTemplate } from '../types';
import { PIZZA_STYLES, inchesToCm, cmToInches } from '../utils/doughCalculator';
import TemplateManager from './TemplateManager';
import { useTranslation } from '../context/TranslationContext';
import {
  Card,
  SectionTitle,
  FormGroup,
  Label,
  Input,
  Select,
  Slider,
  SliderValue,
  Button,
  Grid,
  GridItem,
  InfoBox,
  Section
} from './StyledComponents';

interface CalculatorFormProps {
  inputs: DoughCalculatorInputs;
  templates: CustomPizzaTemplate[];
  onInputChange: (name: string, value: string | number) => void;
  onPizzaStyleChange: (style: string) => void;
  onPizzaDiameterChange: (diameter: number) => void;
  onPanDimensionsChange: (width: number, length: number) => void;
  onThicknessFactorChange: (factor: number) => void;
  onPrefermentTypeChange: (type: PrefermentType) => void;
  onPrefermentPercentageChange: (percentage: number) => void;
  onPrefermentHydrationChange: (hydration: number) => void;
  handleYeastTypeChange?: (type: YeastType) => void;
  onReset: () => void;
  handleUseInchesChange?: (useInches: boolean) => void;
  handleShapeToggle?: (isRectangular: boolean) => void;
  handleSaveTemplate?: (name: string) => void;
  handleApplyTemplate?: (id: string) => void;
  handleDeleteTemplate?: (id: string) => void;
}

const CalculatorForm: React.FC<CalculatorFormProps> = ({
  inputs,
  templates,
  onInputChange,
  onPizzaStyleChange,
  onPizzaDiameterChange,
  onPanDimensionsChange,
  onThicknessFactorChange,
  onPrefermentTypeChange,
  onPrefermentPercentageChange,
  onPrefermentHydrationChange,
  handleYeastTypeChange,
  onReset,
  handleUseInchesChange,
  handleShapeToggle,
  handleSaveTemplate,
  handleApplyTemplate,
  handleDeleteTemplate
}) => {
  const { t } = useTranslation();
  
  // Handle number input changes
  const handleNumberInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    onInputChange(id, parseFloat(value));
  };

  // Handle slider changes
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>, name: keyof DoughCalculatorInputs) => {
    const value = parseFloat(e.target.value);
    onInputChange(name, value);
  };

  // Handle pizza diameter change
  const handlePizzaDiameterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      onPizzaDiameterChange(value);
    }
  };

  // Handle pan width change
  const handlePanWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const width = parseFloat(e.target.value);
    if (!isNaN(width)) {
      onPanDimensionsChange(width, inputs.panLength || 35);
    }
  };

  // Handle pan length change
  const handlePanLengthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const length = parseFloat(e.target.value);
    if (!isNaN(length)) {
      onPanDimensionsChange(inputs.panWidth || 25, length);
    }
  };

  // Handle thickness factor change
  const handleThicknessFactorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    onThicknessFactorChange(value);
  };

  // Handle preferment slider changes
  const handlePrefermentPercentageSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    onPrefermentPercentageChange(value);
  };

  const handlePrefermentHydrationSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    onPrefermentHydrationChange(value);
  };

  // Check if the selected pizza style is rectangular
  const selectedStyle = PIZZA_STYLES.find(style => style.id === inputs.pizzaStyle);
  const isRectangular = 
    selectedStyle?.isRectangular === true || 
    (selectedStyle?.isRectangular === 'both' && inputs.panWidth && inputs.panLength) ||
    (inputs.pizzaStyle === 'custom' && inputs.isRectangular);
  
  // For Focaccia, we need to add a shape selection
  const isFocaccia = selectedStyle?.id === 'focaccia';
  
  // Function to display measurements with both units
  const displayMeasurement = (value: number, unit: string): string => {
    if (unit === 'diameter' || unit === 'width' || unit === 'length') {
      if (inputs.useInches) {
        // If using inches, show inches and cm
        const cmValue = inchesToCm(value);
        return `${value.toFixed(1)} in (${cmValue.toFixed(1)} cm)`;
      } else {
        // If using cm, show cm and inches
        const inchValue = cmToInches(value);
        return `${value.toFixed(1)} cm (${inchValue.toFixed(1)} in)`;
      }
    }
    return `${value}`;
  };

  return (
    <Card
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <SectionTitle>{t('recipe.title')}</SectionTitle>
      
      <Section>
        {/* Unit Toggle */}
        <FormGroup>
          <Label>{t('units.title')}</Label>
          <div style={{ display: 'flex', gap: '8px' }}>
            <Button 
              onClick={() => handleUseInchesChange && handleUseInchesChange(false)}
              style={{
                backgroundColor: !inputs.useInches ? '#0071e3' : '#f5f5f7',
                color: !inputs.useInches ? 'white' : '#1d1d1f',
                flex: 1,
                padding: '8px 4px',
                fontSize: 'clamp(0.75rem, 3vw, 1rem)',
                whiteSpace: 'nowrap',
                transform: !inputs.useInches ? 'translateY(-1px)' : 'translateY(0)',
                boxShadow: !inputs.useInches ? '0 4px 12px rgba(0, 113, 227, 0.3)' : 'none'
              }}
            >
              📏 {t('units.centimeters')}
            </Button>
            <Button 
              onClick={() => handleUseInchesChange && handleUseInchesChange(true)}
              style={{
                backgroundColor: inputs.useInches ? '#0071e3' : '#f5f5f7',
                color: inputs.useInches ? 'white' : '#1d1d1f',
                flex: 1,
                padding: '8px 4px',
                fontSize: 'clamp(0.75rem, 3vw, 1rem)',
                whiteSpace: 'nowrap',
                transform: inputs.useInches ? 'translateY(-1px)' : 'translateY(0)',
                boxShadow: inputs.useInches ? '0 4px 12px rgba(0, 113, 227, 0.3)' : 'none'
              }}
            >
              📐 {t('units.inches')}
            </Button>
          </div>
        </FormGroup>

        <Label>{t('style.title')}</Label>
        <Grid>
          {PIZZA_STYLES.map((style) => (
            <GridItem
              key={style.id}
              onClick={() => onPizzaStyleChange(style.id)}
              style={{
                borderColor: inputs.pizzaStyle === style.id ? 'var(--primary)' : 'var(--border)',
                backgroundColor: inputs.pizzaStyle === style.id ? 'rgba(0, 113, 227, 0.1)' : 'transparent'
              }}
            >
              <h3 style={{ 
                color: inputs.pizzaStyle === style.id ? 'var(--primary)' : 'var(--text)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                {inputs.pizzaStyle === style.id && <span>✅</span>}
                {t(`style.${style.id}`)}
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--lightText)' }}>{t(`style.${style.id}.desc`)}</p>
            </GridItem>
          ))}
        </Grid>

        {/* Template Manager for Custom Style */}
        {inputs.pizzaStyle === 'custom' && handleSaveTemplate && handleApplyTemplate && handleDeleteTemplate && (
          <TemplateManager
            templates={templates}
            onSaveTemplate={handleSaveTemplate}
            onApplyTemplate={handleApplyTemplate}
            onDeleteTemplate={handleDeleteTemplate}
            isCustomStyle={inputs.pizzaStyle === 'custom'}
          />
        )}

        {/* Shape selection for Custom Style */}
        {inputs.pizzaStyle === 'custom' && handleShapeToggle && (
          <FormGroup>
            <Label>{t('form.shape')}</Label>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
              <Button 
                onClick={() => handleShapeToggle(false)}
                style={{
                  backgroundColor: !inputs.isRectangular ? '#0071e3' : '#f5f5f7',
                  color: !inputs.isRectangular ? 'white' : '#1d1d1f',
                  flex: 1,
                  transform: !inputs.isRectangular ? 'translateY(-1px)' : 'translateY(0)',
                  boxShadow: !inputs.isRectangular ? '0 4px 12px rgba(0, 113, 227, 0.3)' : 'none'
                }}
              >
                🔵 {t('form.round')}
              </Button>
              <Button 
                onClick={() => handleShapeToggle(true)}
                style={{
                  backgroundColor: inputs.isRectangular ? '#0071e3' : '#f5f5f7',
                  color: inputs.isRectangular ? 'white' : '#1d1d1f',
                  flex: 1,
                  transform: inputs.isRectangular ? 'translateY(-1px)' : 'translateY(0)',
                  boxShadow: inputs.isRectangular ? '0 4px 12px rgba(0, 113, 227, 0.3)' : 'none'
                }}
              >
                🔲 {t('form.rectangular')}
              </Button>
            </div>
          </FormGroup>
        )}
      </Section>

      <Section>
        <FormGroup>
          <Label htmlFor="numberOfPizzas">{t('form.numberOfPizzas')}</Label>
          <Input
            id="numberOfPizzas"
            type="number"
            min="1"
            value={inputs.numberOfPizzas}
            onChange={handleNumberInputChange}
          />
        </FormGroup>

        {/* Shape selection for Focaccia */}
        {isFocaccia && (
          <FormGroup>
            <Label>{t('form.shape')}</Label>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
              <Button 
                onClick={() => {
                  // Set to round shape by clearing pan dimensions
                  onPanDimensionsChange(0, 0);
                  // Reset diameter if it was zeroed out
                  if (!inputs.pizzaDiameter) {
                    onPizzaDiameterChange(30);
                  }
                }}
                style={{
                  backgroundColor: !isRectangular ? '#0071e3' : '#f5f5f7',
                  color: !isRectangular ? 'white' : '#1d1d1f',
                  flex: 1,
                  transform: !isRectangular ? 'translateY(-1px)' : 'translateY(0)',
                  boxShadow: !isRectangular ? '0 4px 12px rgba(0, 113, 227, 0.3)' : 'none'
                }}
              >
                🔵 {t('form.round')}
              </Button>
              <Button 
                onClick={() => {
                  // Set to rectangular shape by setting default pan dimensions
                  onPanDimensionsChange(25, 35);
                }}
                style={{
                  backgroundColor: isRectangular ? '#0071e3' : '#f5f5f7',
                  color: isRectangular ? 'white' : '#1d1d1f',
                  flex: 1,
                  transform: isRectangular ? 'translateY(-1px)' : 'translateY(0)',
                  boxShadow: isRectangular ? '0 4px 12px rgba(0, 113, 227, 0.3)' : 'none'
                }}
              >
                🔲 {t('form.rectangular')}
              </Button>
            </div>
          </FormGroup>
        )}

        {isRectangular ? (
          <>
            <FormGroup>
              <Label htmlFor="panWidth">{t('form.width')}</Label>
              <Input
                id="panWidth"
                type="number"
                min="10"
                max="50"
                value={inputs.panWidth}
                onChange={handlePanWidthChange}
              />
              <p style={{ fontSize: '0.8rem', color: '#86868b', marginTop: '0.5rem' }}>
                {displayMeasurement(inputs.panWidth || 0, 'width')}
              </p>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="panLength">{t('form.length')}</Label>
              <Input
                id="panLength"
                type="number"
                min="10"
                max="50"
                value={inputs.panLength}
                onChange={handlePanLengthChange}
              />
              <p style={{ fontSize: '0.8rem', color: '#86868b', marginTop: '0.5rem' }}>
                {displayMeasurement(inputs.panLength || 0, 'length')}
              </p>
            </FormGroup>
          </>
        ) : (
          <FormGroup>
            <Label htmlFor="pizzaDiameter">{t('form.pizzaDiameter')}</Label>
            <Input
              id="pizzaDiameter"
              type="number"
              min="15"
              max="50"
              value={inputs.pizzaDiameter}
              onChange={handlePizzaDiameterChange}
            />
            <p style={{ fontSize: '0.8rem', color: '#86868b', marginTop: '0.5rem' }}>
              {displayMeasurement(inputs.pizzaDiameter, 'diameter')}
            </p>
          </FormGroup>
        )}

        <FormGroup>
          <Label htmlFor="thicknessFactor">{t('form.thicknessFactor')}</Label>
          <SliderValue>
            <span>0.03 ({t('form.thin')})</span>
            <span>{inputs.thicknessFactor.toFixed(2)}</span>
            <span>0.15 ({t('form.thick')})</span>
          </SliderValue>
          <Slider
            id="thicknessFactor"
            type="range"
            min="0.03"
            max="0.15"
            step="0.01"
            value={inputs.thicknessFactor}
            onChange={handleThicknessFactorChange}
          />
          <p style={{ fontSize: '0.8rem', color: '#86868b', marginTop: '0.5rem' }}>
            Thickness factor in ounces of dough per square inch of pizza.
          </p>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="ballWeight">{t('form.doughBallWeight')}</Label>
          <Input
            id="ballWeight"
            type="number"
            min="100"
            value={inputs.ballWeight}
            onChange={handleNumberInputChange}
          />
          <p style={{ fontSize: '0.8rem', color: '#86868b', marginTop: '0.5rem' }}>
            {inputs.ballWeight} g ({(inputs.ballWeight * 0.03527396).toFixed(1)} oz) - Calculated based on {isRectangular ? 'pan dimensions' : 'diameter'} and thickness factor.
          </p>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="hydration">{t('form.hydration')} (%)</Label>
          <SliderValue>
            <span>50%</span>
            <span>{inputs.hydration}%</span>
            <span>85%</span>
          </SliderValue>
          <Slider
            id="hydration"
            type="range"
            min="50"
            max="85"
            step="1"
            value={inputs.hydration}
            onChange={(e) => handleSliderChange(e, 'hydration')}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="salt">{t('form.salt')} (%)</Label>
          <SliderValue>
            <span>1%</span>
            <span>{inputs.salt}%</span>
            <span>4%</span>
          </SliderValue>
          <Slider
            id="salt"
            type="range"
            min="1"
            max="4"
            step="0.1"
            value={inputs.salt}
            onChange={(e) => handleSliderChange(e, 'salt')}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="yeast">{t('form.yeast')} (%)</Label>
          <SliderValue>
            <span>0%</span>
            <span>{inputs.yeast.toFixed(2)}%</span>
            <span>2%</span>
          </SliderValue>
          <Slider
            id="yeast"
            type="range"
            min="0"
            max="2"
            step="0.01"
            value={inputs.yeast}
            onChange={(e) => handleSliderChange(e, 'yeast')}
          />
          <div style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }}>
            <Label htmlFor="yeastType">{t('form.yeastType')}</Label>
            <Select
              id="yeastType"
              value={inputs.yeastType}
              onChange={(e) => handleYeastTypeChange && handleYeastTypeChange(e.target.value as YeastType)}
            >
              <option value="active_dry">{t('form.active')}</option>
              <option value="instant">{t('form.instant')}</option>
              <option value="fresh">{t('form.fresh')}</option>
            </Select>
          </div>
          <p style={{ fontSize: '0.8rem', color: '#86868b', marginTop: '0.5rem' }}>
            {inputs.preferment.type === 'sourdough' ? 'No commercial yeast needed for sourdough.' : 
             inputs.yeastType === 'active_dry' ? 'Active dry yeast requires blooming in warm water before use.' :
             inputs.yeastType === 'instant' ? 'Instant yeast can be mixed directly with dry ingredients.' :
             'Fresh yeast should be crumbled and dissolved in water before use.'}
          </p>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="oil">{t('form.oil')} (%)</Label>
          <SliderValue>
            <span>0%</span>
            <span>{inputs.oil}%</span>
            <span>10%</span>
          </SliderValue>
          <Slider
            id="oil"
            type="range"
            min="0"
            max="10"
            step="0.5"
            value={inputs.oil}
            onChange={(e) => handleSliderChange(e, 'oil')}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="sugar">{t('form.sugar')} (%)</Label>
          <SliderValue>
            <span>0%</span>
            <span>{inputs.sugar}%</span>
            <span>5%</span>
          </SliderValue>
          <Slider
            id="sugar"
            type="range"
            min="0"
            max="5"
            step="0.5"
            value={inputs.sugar}
            onChange={(e) => handleSliderChange(e, 'sugar')}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="diastaticMalt">{t('form.diastaticMalt')} (%)</Label>
          <SliderValue>
            <span>0%</span>
            <span>{inputs.diastaticMalt}%</span>
            <span>2%</span>
          </SliderValue>
          <Slider
            id="diastaticMalt"
            type="range"
            min="0"
            max="2"
            step="0.1"
            value={inputs.diastaticMalt}
            onChange={(e) => handleSliderChange(e, 'diastaticMalt')}
          />
          <p style={{ fontSize: '0.8rem', color: '#86868b', marginTop: '0.5rem' }}>
            Diastatic malt helps with browning and fermentation.
          </p>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="doughEnhancer">Dough Enhancer (%)</Label>
          <SliderValue>
            <span>0%</span>
            <span>{inputs.doughEnhancer}%</span>
            <span>2%</span>
          </SliderValue>
          <Slider
            id="doughEnhancer"
            type="range"
            min="0"
            max="2"
            step="0.1"
            value={inputs.doughEnhancer}
            onChange={(e) => handleSliderChange(e, 'doughEnhancer')}
          />
          <p style={{ fontSize: '0.8rem', color: '#86868b', marginTop: '0.5rem' }}>
            Dough enhancer improves texture and rise.
          </p>
        </FormGroup>
      </Section>

      <Section>
        <SectionTitle>Preferment</SectionTitle>
        <InfoBox>
          Preferments improve flavor, texture, and shelf life. They require preparation ahead of time.
        </InfoBox>

        <FormGroup>
          <Label htmlFor="prefermentType">{t('form.preferment')}</Label>
          <Select
            id="prefermentType"
            value={inputs.preferment.type}
            onChange={(e) => onPrefermentTypeChange(e.target.value as PrefermentType)}
          >
            <option value="none">{t('form.none')}</option>
            <option value="poolish">{t('form.poolish')}</option>
            <option value="biga">{t('form.biga')}</option>
            <option value="sponge">Sponge</option>
            <option value="sourdough">Sourdough</option>
          </Select>
        </FormGroup>

        {inputs.preferment.type !== 'none' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
          >
            <FormGroup>
              <Label htmlFor="prefermentPercentage">{t('form.prefermentPercentage')} (%)</Label>
              <SliderValue>
                <span>10%</span>
                <span>{inputs.preferment.percentage}%</span>
                <span>100%</span>
              </SliderValue>
              <Slider
                id="prefermentPercentage"
                type="range"
                min="10"
                max="100"
                step="5"
                value={inputs.preferment.percentage}
                onChange={handlePrefermentPercentageSlider}
              />
              <p style={{ fontSize: '0.8rem', color: '#86868b', marginTop: '0.5rem' }}>
                Percentage of total flour that goes into the preferment.
              </p>
            </FormGroup>

            <FormGroup>
              <Label htmlFor="prefermentHydration">{t('form.prefermentHydration')} (%)</Label>
              <SliderValue>
                <span>50%</span>
                <span>{inputs.preferment.hydration}%</span>
                <span>125%</span>
              </SliderValue>
              <Slider
                id="prefermentHydration"
                type="range"
                min="50"
                max="125"
                step="5"
                value={inputs.preferment.hydration}
                onChange={handlePrefermentHydrationSlider}
              />
              <p style={{ fontSize: '0.8rem', color: '#86868b', marginTop: '0.5rem' }}>
                Poolish is typically 100%, Biga is 50-60%, Sponge is 65-80%, and Sourdough varies (100% is common).
              </p>
            </FormGroup>
          </motion.div>
        )}
      </Section>

      <Button 
        onClick={onReset}
        style={{
          backgroundColor: '#ff6b35',
          background: 'linear-gradient(135deg, #ff6b35 0%, #ff8c42 100%)',
          color: 'white',
          fontWeight: '600',
          padding: '0.875rem 2rem',
          fontSize: '1rem',
          boxShadow: '0 4px 12px rgba(255, 107, 53, 0.3)',
          border: 'none'
        }}
      >
        🔄 {t('button.reset')}
      </Button>
    </Card>
  );
};

export default CalculatorForm; 