import { useEffect, useRef } from 'react';
import { Terminal as XTerminal } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';
import { WebLinksAddon } from '@xterm/addon-web-links';
import { webcontainer } from '../../../lib/webcontainer';
import './theme.css';

export default function Terminal() {
  const terminalRef = useRef<HTMLDivElement>(null);
  const terminalInstanceRef = useRef<XTerminal | null>(null);

  useEffect(() => {
    if (!terminalRef.current) return;

    const terminal = new XTerminal({
      theme: {
        background: 'var(--bolt-elements-background-depth-2)',
        foreground: 'var(--bolt-elements-textPrimary)',
        cursor: 'var(--bolt-elements-textPrimary)'
      },
      fontSize: 14,
      fontFamily: 'JetBrains Mono, Fira Code, Monaco, Consolas, monospace',
    });

    const fitAddon = new FitAddon();
    const webLinksAddon = new WebLinksAddon();

    terminal.loadAddon(fitAddon);
    terminal.loadAddon(webLinksAddon);

    terminal.open(terminalRef.current);
    fitAddon.fit();

    terminalInstanceRef.current = terminal;

    // Connect to WebContainer shell
    webcontainer.then(async (container) => {
      const shell = await container.spawn('jsh');

      const writer = shell.input.getWriter();
      terminal.onData((data) => {
        writer.write(data);
      });

      const reader = shell.output.getReader();
      const read = async () => {
        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          terminal.write(typeof value === 'string' ? value : new TextDecoder().decode(value));
        }
      };
      read();
    });

    // Handle resize
    const handleResize = () => {
      fitAddon.fit();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      terminal.dispose();
    };
  }, []);

  return (
    <div className="h-full bg-bolt-elements-background-depth-2">
      <div ref={terminalRef} className="h-full" />
    </div>
  );
}
