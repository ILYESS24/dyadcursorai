import { map, type MapStore } from 'nanostores';

export interface FileMap {
  [filePath: string]: {
    type: 'file' | 'directory';
    content?: string;
  };
}

export class FilesStore {
  files: MapStore<FileMap> = map({});
  fileModifications: MapStore<Record<string, string>> = map({});
  backups: MapStore<Record<string, string>> = map({});
  conflicts: MapStore<Record<string, { base?: string; current: string; incoming: string }>> = map({});

  constructor(private webcontainer: Promise<any>) {}

  get filesCount(): number {
    return Object.keys(this.files.get()).length;
  }

  getFile(filePath: string) {
    return this.files.get()[filePath];
  }

  async saveFile(filePath: string, content: string) {
    try {
      const container = await this.webcontainer;
      // backup before write
      try {
        const prev = await container.fs.readFile(filePath, 'utf-8');
        this.backups.setKey(filePath, prev);
        const files = this.files.get();
        const existing = files[filePath]?.content ?? prev;
        if (existing !== prev && existing !== content) {
          // Conflict: current store content differs from disk and new content
          const current = existing;
          this.conflicts.setKey(filePath, { base: prev, current, incoming: content });
        }
      } catch {}
      await container.fs.writeFile(filePath, content);
      
      // Update the files store
      const files = this.files.get();
      if (files[filePath]) {
        this.files.setKey(filePath, {
          ...files[filePath],
          content,
        });
      }
      const modifications = this.fileModifications.get();
      this.fileModifications.set({ ...modifications, [filePath]: content });
    } catch (error) {
      console.error('Failed to save file:', error);
      throw error;
    }
  }

  getFileModifications() {
    const modifications = this.fileModifications.get();
    return Object.keys(modifications).length > 0 ? modifications : undefined;
  }

  resetFileModifications() {
    this.fileModifications.set({});
  }

  async rollback() {
    const container = await this.webcontainer;
    const backups = this.backups.get();
    for (const [path, content] of Object.entries(backups)) {
      await container.fs.writeFile(path, content);
      const files = this.files.get();
      if (files[path]) {
        this.files.setKey(path, { ...files[path], content });
      }
    }
    this.backups.set({});
    this.fileModifications.set({});
    this.conflicts.set({});
  }
}
