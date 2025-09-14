import { atom, map, type MapStore, type ReadableAtom, type WritableAtom } from 'nanostores';
import type { EditorDocument, ScrollPosition } from '../../components/editor/CodeMirrorEditor';
import type { FilesStore } from './files';

export class EditorStore {
  constructor(_filesStore: FilesStore) {}
  documents: MapStore<Record<string, EditorDocument>> = map({});
  selectedFile: WritableAtom<string | undefined> = atom(undefined);

  get currentDocument(): ReadableAtom<EditorDocument | undefined> {
    const selected = this.selectedFile;
    const docs = this.documents;
    return atom(() => {
      const selectedFile = selected.get();
      if (!selectedFile) return undefined;
      const documents = docs.get();
      return documents[selectedFile];
    });
  }

  setDocuments(files: Record<string, any>) {
    const newDocuments: Record<string, EditorDocument> = {};
    
    for (const [filePath, file] of Object.entries(files)) {
      if (file?.type === 'file') {
        newDocuments[filePath] = {
          filePath,
          value: file.content || '',
          scrollPosition: { top: 0, left: 0 },
        };
      }
    }
    
    this.documents.set(newDocuments);
  }

  updateFile(filePath: string, content: string) {
    const documents = this.documents.get();
    const document = documents[filePath];
    
    if (document) {
      this.documents.setKey(filePath, {
        ...document,
        value: content,
      });
    }
  }

  updateScrollPosition(filePath: string, position: ScrollPosition) {
    const documents = this.documents.get();
    const document = documents[filePath];
    
    if (document) {
      this.documents.setKey(filePath, {
        ...document,
        scrollPosition: position,
      });
    }
  }

  setSelectedFile(filePath: string | undefined) {
    this.selectedFile.set(filePath);
  }
}
