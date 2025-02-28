import styled from '@emotion/styled';
import { motion } from 'framer-motion';

// Named export to fix fast refresh warning
export const StyledComponents = 'StyledComponents';

// Color palette with dark mode support
export const colors = {
  light: {
    background: '#f5f5f7',
    primary: '#0071e3',
    secondary: '#86868b',
    text: '#1d1d1f',
    lightText: '#86868b',
    border: '#d2d2d7',
    cardBackground: '#ffffff',
    success: '#34c759',
    warning: '#ff9500',
    error: '#ff3b30',
    highlight: '#5e5ce6'
  },
  dark: {
    background: '#1d1d1f',
    primary: '#0a84ff',
    secondary: '#86868b',
    text: '#f5f5f7',
    lightText: '#a1a1a6',
    border: '#38383c',
    cardBackground: '#2c2c2e',
    success: '#30d158',
    warning: '#ff9f0a',
    error: '#ff453a',
    highlight: '#5e5ce6'
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
  padding: 2rem;
  transition: all 0.3s ease;
  position: relative;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

// Header component
export const Header = styled.header`
  text-align: center;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  & > *:last-child {
    margin-top: 1rem;
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
    align-items: flex-start; /* Ensures items align at the top */
  }
`;

// Card container
export const Card = styled(motion.div)`
  background-color: var(--cardBackground);
  border-radius: 1rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  flex: 1;
  transition: all 0.3s ease;
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
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--border);
  color: var(--text);
  transition: all 0.3s ease;
`;

// Form group
export const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

// Label
export const Label = styled.label`
  display: block;
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: var(--lightText);
  transition: all 0.3s ease;
`;

// Input
export const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid var(--border);
  font-size: 1rem;
  transition: all 0.2s ease;
  background-color: var(--cardBackground);
  color: var(--text);
  
  &:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 2px rgba(0, 113, 227, 0.2);
  }
`;

// Select
export const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid var(--border);
  font-size: 1rem;
  transition: all 0.2s ease;
  background-color: var(--cardBackground);
  color: var(--text);
  
  &:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 2px rgba(0, 113, 227, 0.2);
  }
`;

// Button
export const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  border: none;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: var(--primary);
  color: white;
  
  &:hover {
    background-color: #0062c3;
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 113, 227, 0.2);
  }
  
  &:disabled {
    background-color: var(--secondary);
    cursor: not-allowed;
  }
`;

// Secondary button
export const SecondaryButton = styled(Button)`
  background-color: transparent;
  color: var(--primary);
  border: 1px solid var(--primary);
  
  &:hover {
    background-color: rgba(0, 113, 227, 0.1);
  }
`;

// Slider container
export const SliderContainer = styled.div`
  margin-bottom: 1rem;
`;

// Slider
export const Slider = styled.input`
  width: 100%;
  -webkit-appearance: none;
  height: 4px;
  border-radius: 2px;
  background: var(--border);
  outline: none;
  margin: 1rem 0;
  
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: var(--primary);
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  &::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: var(--primary);
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  &::-webkit-slider-thumb:hover {
    transform: scale(1.1);
  }
  
  &::-moz-range-thumb:hover {
    transform: scale(1.1);
  }
`;

// Slider value display
export const SliderValue = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  color: var(--lightText);
`;

// Recipe container
export const RecipeContainer = styled.div`
  margin-top: 1.5rem;
`;

// Recipe table
export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1.5rem;
`;

// Table header
export const TableHeader = styled.th`
  text-align: left;
  padding: 0.75rem;
  border-bottom: 1px solid var(--border);
  font-weight: 500;
  color: var(--lightText);
  font-size: 0.9rem;
`;

// Table cell
export const TableCell = styled.td`
  padding: 0.75rem;
  border-bottom: 1px solid var(--border);
  font-size: 1rem;
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

// Tab
export const Tab = styled.button<{ active: boolean }>`
  padding: 0.75rem 1.5rem;
  border: none;
  background-color: transparent;
  font-size: 1rem;
  font-weight: ${props => (props.active ? '600' : '400')};
  color: ${props => (props.active ? 'var(--primary)' : 'var(--text)')};
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: ${props => (props.active ? 'var(--primary)' : 'transparent')};
    transition: all 0.2s ease;
  }
  
  &:hover {
    color: var(--primary);
  }
`;

// Info box
export const InfoBox = styled.div`
  background-color: rgba(0, 113, 227, 0.1);
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
  color: var(--text);
  border-left: 4px solid var(--primary);
`;

// Grid layout
export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

// Grid item
export const GridItem = styled.div`
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid var(--border);
  transition: all 0.2s ease;
  cursor: pointer;
  height: 100%;
  display: flex;
  flex-direction: column;
  
  h3 {
    margin-top: 0;
    margin-bottom: 0.5rem;
  }
  
  p {
    margin: 0;
  }
  
  &:hover {
    border-color: var(--primary);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
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
  padding: 0.25rem 0.5rem;
  border-radius: 1rem;
  font-size: 0.8rem;
  font-weight: 500;
  background-color: var(--primary);
  color: white;
`;

// Footer
export const Footer = styled.footer`
  text-align: center;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid var(--border);
  color: var(--lightText);
  font-size: 0.9rem;
  transition: all 0.3s ease;
`; 
