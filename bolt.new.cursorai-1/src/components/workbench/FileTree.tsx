import { useState } from 'react';
import { classNames } from '../../utils/classNames';
import type { FileMap } from '../../lib/stores/files';

interface FileTreeProps {
  files: FileMap;
  selectedFile?: string;
  onFileSelect: (filePath: string | undefined) => void;
}

interface FileTreeNodeProps {
  filePath: string;
  file: { type: 'file' | 'directory'; content?: string };
  selectedFile?: string;
  onFileSelect: (filePath: string | undefined) => void;
  level?: number;
}

function FileTreeNode({ filePath, file, selectedFile, onFileSelect, level = 0 }: FileTreeNodeProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const isSelected = selectedFile === filePath;
  const isDirectory = file.type === 'directory';

  const handleClick = () => {
    if (isDirectory) {
      setIsExpanded(!isExpanded);
    } else {
      onFileSelect(filePath);
    }
  };

  const icon = isDirectory 
    ? (isExpanded ? 'i-ph:folder-open' : 'i-ph:folder')
    : 'i-ph:file';

  return (
    <div>
      <div
        className={classNames(
          'flex items-center gap-2 px-2 py-1 cursor-pointer hover:bg-bolt-elements-item-backgroundAccent transition-theme',
          {
            'bg-bolt-elements-item-backgroundAccent text-bolt-elements-item-contentAccent': isSelected,
          }
        )}
        data-indent={level}
        onClick={handleClick}
      >
        <div className={icon} />
        <span className="text-sm truncate">{filePath.split('/').pop()}</span>
      </div>
      {isDirectory && isExpanded && null}
    </div>
  );
}

export default function FileTree({ files, selectedFile, onFileSelect }: FileTreeProps) {
  return (
    <div className="h-full overflow-y-auto">
      <div className="p-2">
        {Object.entries(files).map(([filePath, file]) => (
          <FileTreeNode
            key={filePath}
            filePath={filePath}
            file={file}
            selectedFile={selectedFile}
            onFileSelect={onFileSelect}
          />
        ))}
      </div>
    </div>
  );
}
