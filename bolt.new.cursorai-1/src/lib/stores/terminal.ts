import { atom, type WritableAtom } from 'nanostores';
import type { ITerminal } from '../../types/terminal';

export class TerminalStore {
  showTerminal: WritableAtom<boolean> = atom(false);
  private terminal: ITerminal | null = null;

  constructor() {}

  toggleTerminal(value?: boolean) {
    if (value !== undefined) {
      this.showTerminal.set(value);
    } else {
      this.showTerminal.set(!this.showTerminal.get());
    }
  }

  attachTerminal(terminal: ITerminal) {
    this.terminal = terminal;
  }

  onTerminalResize(cols: number, rows: number) {
    if (this.terminal) {
      this.terminal.resize(cols, rows);
    }
  }
}
