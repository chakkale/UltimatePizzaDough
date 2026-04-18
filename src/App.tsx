import { ThemeProvider } from './context/ThemeContext';
import { TranslationProvider } from './context/TranslationContext';
import ToastProvider from './components/ToastProvider';
import { Workshop } from './design/Workshop';

export default function App() {
  return (
    <ThemeProvider>
      <TranslationProvider>
        <ToastProvider>
          <Workshop />
        </ToastProvider>
      </TranslationProvider>
    </ThemeProvider>
  );
}
