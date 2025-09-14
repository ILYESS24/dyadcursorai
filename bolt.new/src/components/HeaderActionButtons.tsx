import { useStore } from '@nanostores/react';
import { themeStore } from '../lib/stores/theme';
import { workbenchStore } from '../lib/stores/workbench';
import IconButton from './ui/IconButton';

export default function HeaderActionButtons() {
  const theme = useStore(themeStore);
  const showWorkbench = useStore(workbenchStore.showWorkbench);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    themeStore.set(newTheme);
    localStorage.setItem('bolt_theme', newTheme);
  };

  const toggleWorkbench = () => {
    workbenchStore.setShowWorkbench(!showWorkbench);
  };

  return (
    <div className="flex items-center gap-2">
      <IconButton
        icon={theme === 'light' ? 'i-ph:sun' : 'i-ph:moon'}
        onClick={toggleTheme}
        title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
      />
      <IconButton
        icon="i-ph:code"
        onClick={toggleWorkbench}
        title="Toggle Workbench"
      />
    </div>
  );
}
