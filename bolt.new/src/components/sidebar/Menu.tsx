import { useStore } from '@nanostores/react';
import { chatStore } from '../../lib/stores/chat';
import { workbenchStore } from '../../lib/stores/workbench';
import IconButton from '../ui/IconButton';

export default function Menu() {
  const chat = useStore(chatStore);
  const showWorkbench = useStore(workbenchStore.showWorkbench);

  const toggleWorkbench = () => {
    workbenchStore.setShowWorkbench(!showWorkbench);
  };

  if (!chat.started) {
    return null;
  }

  return (
    <div className="w-16 bg-bolt-elements-background-depth-2 border-r border-bolt-elements-borderColor flex flex-col items-center py-4 gap-2">
      <IconButton
        icon="i-ph:code"
        onClick={toggleWorkbench}
        title="Toggle Workbench"
        className={showWorkbench ? 'bg-bolt-elements-item-backgroundAccent text-bolt-elements-item-contentAccent' : ''}
      />
    </div>
  );
}
