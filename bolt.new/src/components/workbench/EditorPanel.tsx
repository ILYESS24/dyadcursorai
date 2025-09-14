import { useStore } from '@nanostores/react';
import { workbenchStore } from '../../lib/stores/workbench';
// import { classNames } from '../../utils/classNames';
import FileTree from './FileTree';
import CodeMirrorEditor from '../editor/CodeMirrorEditor';
import Terminal from './terminal/Terminal';
import type { EditorDocument } from '../editor/CodeMirrorEditor';
import type { OnChangeCallback, OnScrollCallback } from '../editor/CodeMirrorEditor';
import type { FileMap } from '../../lib/stores/files';

interface EditorPanelProps {
  editorDocument?: EditorDocument;
  isStreaming?: boolean;
  selectedFile?: string;
  files: FileMap;
  unsavedFiles: Set<string>;
  onFileSelect: (filePath: string | undefined) => void;
  onEditorScroll: OnScrollCallback;
  onEditorChange: OnChangeCallback;
  onFileSave: () => void;
  onFileReset: () => void;
}

export default function EditorPanel({
  editorDocument,
  isStreaming,
  selectedFile,
  files,
  // unsavedFiles,
  onFileSelect,
  onEditorScroll,
  onEditorChange,
  // onFileSave,
  // onFileReset,
}: EditorPanelProps) {
  const showTerminal = useStore(workbenchStore.showTerminal);

  return (
    <div className="flex h-full">
      <div className="w-64 border-r border-bolt-elements-borderColor bg-bolt-elements-background-depth-1">
        <FileTree files={files} selectedFile={selectedFile} onFileSelect={onFileSelect} />
      </div>
      <div className="flex-1 flex flex-col">
        <div className="flex-1">
          {editorDocument ? (
            <CodeMirrorEditor
              document={editorDocument}
              onChange={onEditorChange}
              onScroll={onEditorScroll}
              isStreaming={isStreaming}
            />
          ) : (
            <div className="flex items-center justify-center h-full text-bolt-elements-textSecondary">
              Select a file to start editing
            </div>
          )}
        </div>
        {showTerminal && (
          <div className="h-64 border-t border-bolt-elements-borderColor">
            <Terminal />
          </div>
        )}
      </div>
    </div>
  );
}
