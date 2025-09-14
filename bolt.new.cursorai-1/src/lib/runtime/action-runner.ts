// import { webcontainer } from '../webcontainer';
import type { ParsedAction, ParsedArtifactPlan, RunCommandAction, WriteFileAction, DeleteFileAction, OpenPreviewAction, ClosePreviewAction } from './message-parser';
import { PreviewsStore } from '../stores/previews';
import { FilesStore } from '../stores/files';

export class ActionRunner {
  #previews: PreviewsStore;
  #files: FilesStore;
  #backups: Map<string, string> = new Map();

  constructor(private _webcontainer: Promise<any>) {
    this.#previews = new PreviewsStore();
    this.#files = new FilesStore(_webcontainer);
  }

  async runPlan(plan: ParsedArtifactPlan) {
    for (const action of plan.actions) {
      await this.#run(action);
    }
  }

  async #run(action: ParsedAction) {
    switch (action.type) {
      case 'write_file':
        return this.#writeFile(action as WriteFileAction);
      case 'delete_file':
        return this.#deleteFile(action as DeleteFileAction);
      case 'run_command':
        return this.#runCommand(action as RunCommandAction);
      case 'open_preview':
        return this.#openPreview(action as OpenPreviewAction);
      case 'close_preview':
        return this.#closePreview(action as ClosePreviewAction);
      case 'sleep':
        return new Promise((r) => setTimeout(r, (action as any).ms));
    }
  }

  async #writeFile(action: WriteFileAction) {
    const container = await this._webcontainer;
    try {
      // backup existing content for rollback
      let prev = '';
      try {
        prev = await container.fs.readFile(action.path, 'utf-8');
      } catch {}
      this.#backups.set(action.path, prev);

      await container.fs.writeFile(action.path, action.content);
      // reflect in files store
      await this.#files.saveFile(action.path, action.content);
    } catch (e) {
      throw new Error(`write_file failed for ${action.path}: ${String(e)}`);
    }
  }

  async #deleteFile(action: DeleteFileAction) {
    const container = await this._webcontainer;
    try {
      // backup existing content
      try {
        const prev = await container.fs.readFile(action.path, 'utf-8');
        this.#backups.set(action.path, prev);
      } catch {}
      await container.fs.rm(action.path);
    } catch (e) {
      throw new Error(`delete_file failed for ${action.path}: ${String(e)}`);
    }
  }

  async #runCommand(action: RunCommandAction) {
    const container = await this._webcontainer;
    const proc = await container.spawn('bash', {
      argv: ['-lc', action.command],
      cwd: action.cwd,
      env: action.env,
    });
    const reader = proc.output.getReader();
    const decoder = new TextDecoder();
    // drain output in background
    (async () => {
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        console.log(decoder.decode(value));
      }
    })();
    const exitCode = await proc.exit;
    if (exitCode !== 0) {
      throw new Error(`Command failed (${exitCode}): ${action.command}`);
    }
  }

  async #openPreview(action: OpenPreviewAction) {
    this.#previews.addOrUpdate({
      id: String(action.port),
      url: `http://localhost:${action.port}`,
      title: action.title || `Preview :${action.port}`,
    });
  }

  async #closePreview(action: ClosePreviewAction) {
    this.#previews.remove(String(action.port));
  }

  async rollback() {
    const container = await this._webcontainer;
    for (const [path, content] of this.#backups.entries()) {
      await container.fs.writeFile(path, content);
      await this.#files.saveFile(path, content);
    }
    this.#backups.clear();
  }
}
