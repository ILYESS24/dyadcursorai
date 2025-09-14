import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { useStore } from '@nanostores/react';
import { themeStore } from './lib/stores/theme';
import Header from './components/Header';
import Chat from './components/Chat';

function App() {
  const theme = useStore(themeStore);

  useEffect(() => {
    // Set initial theme
    const savedTheme = localStorage.getItem('bolt_theme');
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const initialTheme = savedTheme || systemTheme;
    
    themeStore.set(initialTheme as any);
    document.querySelector('html')?.setAttribute('data-theme', initialTheme);
  }, []);

  useEffect(() => {
    document.querySelector('html')?.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div className="flex flex-col h-full w-full">
      <Header />
      <Chat />
      <ToastContainer
        position="bottom-right"
        pauseOnFocusLoss
        closeButton={({ closeToast }) => (
          <button
            className="Toastify__close-button"
            onClick={closeToast}
            title="Close notification"
            aria-label="Close notification"
          >
            <div className="i-ph:x text-lg" />
          </button>
        )}
        icon={({ type }) => {
          switch (type) {
            case 'success':
              return <div className="i-ph:check-bold text-bolt-elements-icon-success text-2xl" />;
            case 'error':
              return <div className="i-ph:warning-circle-bold text-bolt-elements-icon-error text-2xl" />;
            default:
              return undefined;
          }
        }}
      />
    </div>
  );
}

export default App;
