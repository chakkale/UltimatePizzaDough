import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { keyframes } from '@emotion/react';

// Subtle shimmer for loading states
const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

// Named export to fix fast refresh warning
export const StyledComponents = 'StyledComponents';

// Color palette with dark mode support (kept for backward compat)
export const colors = {
  light: {
    background: '#FBF8F4',
    primary: '#C2582D',
    secondary: '#7A6E63',
    text: '#2C1810',
    lightText: '#8E8078',
    border: '#E8E0D6',
    cardBackground: '#FFFFFF',
    success: '#5B7A3A',
    warning: '#C48A2C',
    error: '#B83C2B',
    highlight: '#C2582D'
  },
  dark: {
    background: '#0F0E0D',
    primary: '#E0885A',
    secondary: '#8A7E73',
    text: '#EDE6DC',
    lightText: '#8A7E73',
    border: '#262320',
    cardBackground: '#181614',
    success: '#8FB365',
    warning: '#D4A24C',
    error: '#D45545',
    highlight: '#E0885A'
  }
};

// Container for the entire app
export const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: var(--background);
  color: var(--text);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  padding: 2.5rem 2rem;
  transition: background-color 0.4s ease, color 0.3s ease;
  position: relative;

  @media (max-width: 768px) {
    padding: 1.25rem 0.875rem;
  }
`;

// Header component
export const Header = styled.header`
  text-align: center;
  margin-bottom: 2.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  & > *:last-child {
    margin-top: 1rem;
  }
`;

// Header row for title and theme toggle
export const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  width: 100%;
  position: relative;
  flex-wrap: wrap;

  @media (min-width: 768px) {
    flex-wrap: nowrap;
  }
`;

// Theme toggle wrapper positioned in corner on larger screens
export const ThemeToggleWrapper = styled.div`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);

  @media (max-width: 767px) {
    position: static;
    transform: none;
  }
`;

// Main title
export const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--text);

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

// Subtitle
export const Subtitle = styled.p`
  font-size: 1.2rem;
  color: var(--lightText);
  margin-bottom: 2rem;
`;

// Main content container
export const ContentContainer = styled.main`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;

  @media (min-width: 992px) {
    flex-direction: row;
    align-items: flex-start;
    gap: 2rem;
  }
`;

// Card container with premium depth
export const Card = styled(motion.div)`
  background-color: var(--cardBackground);
  border-radius: 20px;
  box-shadow: var(--cardShadow);
  padding: 2rem;
  flex: 1;
  transition: box-shadow 0.3s ease, border-color 0.3s ease, transform 0.3s ease;
  border: 1px solid var(--cardBorder);
  position: relative;
  overflow: hidden;

  /* Subtle inner glow at top */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      var(--border-strong),
      transparent
    );
    opacity: 0.5;
  }

  &:hover {
    box-shadow: var(--cardShadowHover);
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
    border-radius: 16px;
  }
`;

// Sticky Card for recipe display
export const StickyCard = styled(Card)`
  @media (min-width: 992px) {
    position: sticky;
    top: 2rem;
    max-height: calc(100vh - 4rem);
    overflow-y: auto;
    &::-webkit-scrollbar {
      width: 4px;
    }
    &::-webkit-scrollbar-track {
      background: transparent;
    }
    &::-webkit-scrollbar-thumb {
      background: var(--border-strong);
      border-radius: 2px;
    }
    &::-webkit-scrollbar-thumb:hover {
      background: var(--lightText);
    }
  }
`;

// Section title
export const SectionTitle = styled.h2`
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text);
  letter-spacing: -0.01em;
  margin-bottom: 1.25rem;
  transition: color 0.3s ease;
  position: relative;
  padding-bottom: 0.75rem;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 2.5rem;
    height: 2px;
    background: var(--primary);
    border-radius: 1px;
  }
`;

// Form group
export const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

// Label
export const Label = styled.label`
  display: block;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 0.5rem;
  color: var(--lightText);
  transition: color 0.3s ease;
`;

// Input with refined styling
export const Input = styled.input`
  width: 100%;
  padding: 0.875rem 1rem;
  border-radius: 12px;
  border: 1.5px solid var(--border);
  font-size: 0.95rem;
  transition: border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
  background-color: var(--inputBackground);
  color: var(--text);

  &:hover {
    border-color: var(--border-strong);
  }

  &:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 3px var(--primary-soft);
    background-color: var(--cardBackground);
  }

  &:invalid {
    border-color: var(--error, #B83C2B);
  }

  &:disabled {
    background-color: var(--border);
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

// Select matching Input styling
export const Select = styled.select`
  width: 100%;
  padding: 0.875rem 1rem;
  border-radius: 12px;
  border: 1.5px solid var(--border);
  font-size: 0.95rem;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  background-color: var(--inputBackground);
  color: var(--text);
  cursor: pointer;

  &:hover {
    border-color: var(--border-strong);
  }

  &:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 3px var(--primary-soft);
  }
`;

// Button with premium feel
export const Button = styled.button`
  padding: 0.8rem 1.5rem;
  border-radius: 12px;
  border: none;
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: var(--primary);
  color: white;
  position: relative;
  overflow: hidden;

  &:hover {
    background-color: var(--primary-hover);
    box-shadow: 0 4px 16px var(--primary-glow);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 8px var(--primary-glow);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px var(--primary-soft);
  }

  &:disabled {
    background-color: var(--secondary);
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
    opacity: 0.7;
  }
`;

// Secondary button — outlined style
export const SecondaryButton = styled(Button)`
  background-color: transparent;
  color: var(--primary);
  border: 1.5px solid var(--primary);

  &:hover {
    background-color: var(--primary-soft);
    border-color: var(--primary-hover);
    box-shadow: none;
    transform: none;
  }

  &:active {
    transform: none;
    opacity: 0.85;
  }
`;

// Slider container
export const SliderContainer = styled.div`
  margin-bottom: 1rem;
`;

// Slider with refined styling
export const Slider = styled.input`
  width: 100%;
  -webkit-appearance: none;
  height: 6px;
  border-radius: 3px;
  background: linear-gradient(
    to right,
    var(--border) 0%,
    var(--border-strong) 100%
  );
  outline: none;
  margin: 0.75rem 0;
  transition: background 0.2s ease;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: var(--primary);
    cursor: pointer;
    transition: transform 0.15s ease, box-shadow 0.15s ease;
    box-shadow: 0 2px 6px var(--primary-glow), 0 0 0 3px var(--cardBackground);
    border: none;
  }

  &::-moz-range-thumb {
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: var(--primary);
    cursor: pointer;
    transition: transform 0.15s ease, box-shadow 0.15s ease;
    box-shadow: 0 2px 6px var(--primary-glow), 0 0 0 3px var(--cardBackground);
    border: none;
  }

  &::-webkit-slider-thumb:hover {
    transform: scale(1.15);
    box-shadow: 0 3px 12px var(--primary-glow), 0 0 0 3px var(--cardBackground);
  }

  &::-moz-range-thumb:hover {
    transform: scale(1.15);
    box-shadow: 0 3px 12px var(--primary-glow), 0 0 0 3px var(--cardBackground);
  }

  &::-webkit-slider-thumb:active {
    transform: scale(1.2);
  }

  &::-moz-range-thumb:active {
    transform: scale(1.2);
  }
`;

// Slider value display
export const SliderValue = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.78rem;
  font-variant-numeric: tabular-nums;
  color: var(--lightText);

  span:nth-of-type(2) {
    font-weight: 600;
    color: var(--primary);
    font-size: 0.85rem;
  }
`;

// Recipe container
export const RecipeContainer = styled.div`
  margin-top: 1.5rem;
`;

// Recipe table
export const Table = styled.table`
  width: 100%;
  border-spacing: 0;
  margin-bottom: 1.5rem;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid var(--border);
`;

// Table header
export const TableHeader = styled.th`
  text-align: left;
  padding: 0.75rem 1rem;
  border-bottom: 2px solid var(--border);
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-weight: 700;
  color: var(--lightText);
  background: var(--inputBackground);
`;

// Table cell
export const TableCell = styled.td`
  padding: 0.75rem 1rem;
  border-bottom: 1px solid var(--border);
  font-variant-numeric: tabular-nums;
  font-size: 0.9rem;

  tr:last-child & {
    border-bottom: none;
  }
`;

// Section container
export const Section = styled.div`
  margin-bottom: 2rem;
`;

// Tabs container
export const TabsContainer = styled.div`
  display: flex;
  margin-bottom: 1.5rem;
  background: var(--inputBackground);
  border-radius: 12px;
  padding: 4px;
  gap: 4px;
`;

// Tab with pill design
export const Tab = styled.button<{ active: boolean }>`
  padding: 0.625rem 1.25rem;
  border: none;
  border-radius: 10px;
  background-color: ${props => (props.active ? 'var(--cardBackground)' : 'transparent')};
  box-shadow: ${props => (props.active ? '0 1px 3px rgba(0,0,0,0.08)' : 'none')};
  font-size: 0.9rem;
  font-weight: ${props => (props.active ? '600' : '500')};
  color: ${props => (props.active ? 'var(--primary)' : 'var(--lightText)')};
  cursor: pointer;
  transition: all 0.2s ease;
  flex: 1;
  text-align: center;

  &:hover {
    color: ${props => (props.active ? 'var(--primary)' : 'var(--text)')};
    background-color: ${props => (props.active ? 'var(--cardBackground)' : 'var(--primary-soft)')};
  }
`;

// Info box
export const InfoBox = styled.div`
  border-radius: 12px;
  border-left: 3px solid var(--primary);
  background: var(--primary-soft);
  padding: 1rem 1.25rem;
  margin-bottom: 1.5rem;
  font-size: 0.88rem;
  color: var(--text);
  line-height: 1.6;
`;

// Grid layout
export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

// Grid item with clean interactions
export const GridItem = styled.div`
  padding: 0;
  border-radius: 14px;
  border: 1.5px solid var(--border);
  transition: all 0.25s ease;
  cursor: pointer;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: var(--cardBackground);
  overflow: hidden;
  position: relative;

  h3 {
    margin-top: 0;
    margin-bottom: 0.25rem;
    font-size: 0.88rem;
    font-weight: 600;
    color: var(--text);
    transition: color 0.2s ease;
    padding: 0.75rem 0.75rem 0;
  }

  p {
    margin: 0;
    font-size: 0.75rem;
    color: var(--lightText);
    flex-grow: 1;
    line-height: 1.4;
    padding: 0 0.75rem 0.75rem;
  }

  &:hover {
    border-color: var(--primary);
    box-shadow: 0 4px 16px var(--primary-glow);
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

// Flex container
export const Flex = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

// Spacer
export const Spacer = styled.div`
  flex: 1;
`;

// Badge
export const Badge = styled.span`
  display: inline-block;
  padding: 0.2rem 0.6rem;
  border-radius: 6px;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  background-color: var(--primary);
  color: white;
`;

// Footer
export const Footer = styled.footer`
  text-align: center;
  margin-top: 3rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border);
  color: var(--lightText);
  font-size: 0.82rem;
  transition: color 0.3s ease;
`;

// Keep shimmer available
void shimmer;
