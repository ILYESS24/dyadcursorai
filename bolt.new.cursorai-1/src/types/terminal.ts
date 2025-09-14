export interface ITerminal {
  write(data: string): void;
  resize(cols: number, rows: number): void;
  focus(): void;
  blur(): void;
  dispose(): void;
}
