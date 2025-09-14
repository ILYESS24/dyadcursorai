import { useStore } from '@nanostores/react';
import { workbenchStore } from '../../lib/stores/workbench';

export default function Preview() {
  const previews = useStore(workbenchStore.previews);
  const activeId = useStore(workbenchStore.previewsActiveId);

  if (previews.length === 0) {
    return (
      <div className="h-full bg-bolt-elements-background-depth-1">
        <div className="flex items-center justify-center h-full text-bolt-elements-textSecondary">
          <div className="text-center">
            <div className="i-ph:monitor text-4xl mb-4" />
            <p>Preview will appear here</p>
            <p className="text-sm mt-2">Start a dev server to see your app</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-bolt-elements-background-depth-1">
      <div className="h-10 border-b border-bolt-elements-borderColor flex items-center px-3 gap-2 overflow-x-auto">
        {previews.map((p) => (
          <button
            key={p.id}
            onClick={() => workbenchStore.setActivePreview(p.id)}
            className={
              'text-sm px-2 py-1 rounded border ' +
              (activeId === p.id
                ? 'bg-bolt-elements-item-backgroundAccent border-bolt-elements-item-contentAccent text-bolt-elements-item-contentAccent'
                : 'bg-bolt-elements-background-depth-2 border-bolt-elements-borderColor')
            }
          >
            {p.title}
          </button>
        ))}
      </div>
      <div className="h-[calc(100%-2.5rem)]">
        {(() => {
          const active = previews.find((p) => p.id === activeId) || previews[0];
          return <iframe title={active.title} src={active.url} className="w-full h-full border-0 bg-white" />;
        })()}
      </div>
    </div>
  );
}
