import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { keyframes } from '@emotion/react';

// Keep keyframes import for potential future use
void keyframes;

// Named export to fix fast refresh warning
export const StyledComponents = 'StyledComponents';

// Color palette with dark mode support
export const colors = {
  light: {
    background: '#FAF6F1',
    primary: '#C75B39',
    secondary: '#8C7B6B',
    text: '#3D2E1F',
    lightText: '#8C7B6B',
    border: '#E0D5C7',
    cardBackground: '#FFFFFF',
    success: '#6B7F4E',
    warning: '#D4903C',
    error: '#C44536',
    highlight: '#C75B39'
  },
  dark: {
    background: '#1A1714',
    primary: '#D4764E',
    secondary: '#9C8E80',
    text: '#F0E8DC',
    lightText: '#9C8E80',
    border: '#3D3530',
    cardBackground: '#2A2520',
    success: '#8FA66C',
    warning: '#E0A04C',
    error: '#D45545',
    highlight: '#D4764E'
  }
};

// Container for the entire app
export const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: var(--background);
  background-image:
    repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,
      rgba(60, 40, 20, 0.012) 2px,
      rgba(60, 40, 20, 0.012) 4px
    ),
    repeating-linear-gradient(
      90deg,
      transparent,
      transparent 2px,
      rgba(60, 40, 20, 0.008) 2px,
      rgba(60, 40, 20, 0.008) 4px
    );
  color: var(--text);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  padding: 2.5rem 2rem;
  transition: all 0.3s ease;
  position: relative;

  @media (max-width: 768px) {
    padding: 1.5rem 1rem;
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
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;

  @media (min-width: 992px) {
    flex-direction: row;
    align-items: flex-start;
  }
`;

// Card container with premium warmth
export const Card = styled(motion.div)`
  background-color: var(--cardBackground);
  border-radius: 16px;
  box-shadow: 0 1px 2px rgba(60, 40, 20, 0.06), 0 4px 16px rgba(60, 40, 20, 0.08);
  padding: 1.75rem;
  flex: 1;
  transition: box-shadow 0.2s ease, border-color 0.2s ease;
  border: 1px solid var(--border);
  position: relative;

  &:hover {
    box-shadow: 0 2px 4px rgba(60, 40, 20, 0.08), 0 8px 24px rgba(60, 40, 20, 0.12);
  }
`;

// Sticky Card for recipe display
export const StickyCard = styled(Card)`
  @media (min-width: 992px) {
    position: sticky;
    top: 2rem;
    max-height: calc(100vh - 4rem);
    overflow-y: auto;
    /* Hide scrollbar for Chrome, Safari and Opera */
    &::-webkit-scrollbar {
      display: none;
    }
    /* Hide scrollbar for IE, Edge and Firefox */
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }
`;

// Section title
export const SectionTitle = styled.h2`
  font-family: 'DM Serif Display', Georgia, serif;
  font-size: 1.6rem;
  font-weight: 400;
  color: var(--text);
  letter-spacing: 0.01em;
  margin-bottom: 1.25rem;
  transition: color 0.3s ease;
`;

// Form group
export const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

// Label
export const Label = styled.label`
  display: block;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
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
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
  background-color: var(--inputBackground, var(--cardBackground));
  color: var(--text);

  &:hover {
    border-color: var(--primary);
  }

  &:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(199, 91, 57, 0.12);
  }

  &:invalid {
    border-color: var(--error, #C44536);
    box-shadow: 0 0 0 1px rgba(196, 69, 54, 0.2);
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
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
  background-color: var(--inputBackground, var(--cardBackground));
  color: var(--text);

  &:hover {
    border-color: var(--primary);
  }

  &:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(199, 91, 57, 0.12);
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
  transition: all 0.15s ease;
  background-color: var(--primary);
  color: white;

  &:hover {
    filter: brightness(1.1);
    box-shadow: 0 4px 12px rgba(199, 91, 57, 0.25);
  }

  &:active {
    filter: brightness(0.95);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(199, 91, 57, 0.3);
  }

  &:disabled {
    background-color: var(--secondary);
    cursor: not-allowed;
    filter: none;
    box-shadow: none;
  }
`;

// Secondary button — outlined style
export const SecondaryButton = styled(Button)`
  background-color: transparent;
  color: var(--primary);
  border: 1.5px solid var(--primary);

  &:hover {
    filter: none;
    border-color: var(--text);
    box-shadow: none;
  }

  &:active {
    filter: none;
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
  height: 4px;
  border-radius: 2px;
  background: var(--border);
  outline: none;
  margin: 1rem 0;
  transition: background 0.2s ease;

  &:hover {
    background: var(--secondary);
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: var(--primary);
    cursor: pointer;
    transition: transform 0.15s ease, box-shadow 0.15s ease;
    box-shadow: 0 1px 4px rgba(60, 40, 20, 0.2);
    border: 2.5px solid white;
  }

  &::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: var(--primary);
    cursor: pointer;
    transition: transform 0.15s ease, box-shadow 0.15s ease;
    box-shadow: 0 1px 4px rgba(60, 40, 20, 0.2);
    border: 2.5px solid white;
  }

  &::-webkit-slider-thumb:hover {
    transform: scale(1.1);
    box-shadow: 0 2px 8px rgba(199, 91, 57, 0.3);
  }

  &::-moz-range-thumb:hover {
    transform: scale(1.1);
    box-shadow: 0 2px 8px rgba(199, 91, 57, 0.3);
  }

  &::-webkit-slider-thumb:active {
    transform: scale(1.15);
  }

  &::-moz-range-thumb:active {
    transform: scale(1.15);
  }
`;

// Slider value display
export const SliderValue = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  font-variant-numeric: tabular-nums;
  color: var(--lightText);
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
`;

// Table header
export const TableHeader = styled.th`
  text-align: left;
  padding: 0.625rem 0.75rem;
  border-bottom: 2px solid var(--border);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-weight: 600;
  color: var(--lightText);
`;

// Table cell
export const TableCell = styled.td`
  padding: 0.75rem;
  border-bottom: 1px solid var(--border);
  font-variant-numeric: tabular-nums;
`;

// Section container
export const Section = styled.div`
  margin-bottom: 2rem;
`;

// Tabs container
export const TabsContainer = styled.div`
  display: flex;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid var(--border);
`;

// Tab with clean design
export const Tab = styled.button<{ active: boolean }>`
  padding: 0.625rem 1.25rem;
  border: none;
  border-bottom: 2px solid ${props => (props.active ? 'var(--primary)' : 'transparent')};
  background-color: transparent;
  font-size: 1rem;
  font-weight: ${props => (props.active ? '600' : '400')};
  color: ${props => (props.active ? 'var(--primary)' : 'var(--lightText)')};
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    color: var(--text);
  }
`;

// Info box
export const InfoBox = styled.div`
  border-radius: 12px;
  border-left: 3px solid var(--primary);
  background: rgba(199, 91, 57, 0.05);
  padding: 1rem 1.25rem;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
  color: var(--text);
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
  padding: 0.875rem;
  border-radius: 12px;
  border: 1.5px solid var(--border);
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
  cursor: pointer;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: var(--cardBackground);

  h3 {
    margin-top: 0;
    margin-bottom: 0.5rem;
    font-size: 0.95rem;
    font-weight: 600;
    color: var(--text);
    transition: color 0.15s ease;
  }

  p {
    margin: 0;
    font-size: 0.78rem;
    color: var(--lightText);
    flex-grow: 1;
  }

  &:hover {
    border-color: var(--primary);
    box-shadow: 0 2px 12px rgba(60, 40, 20, 0.1);
  }

  &:active {
    opacity: 0.9;
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
  padding: 0.2rem 0.5rem;
  border-radius: 8px;
  font-size: 0.75rem;
  font-weight: 500;
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
