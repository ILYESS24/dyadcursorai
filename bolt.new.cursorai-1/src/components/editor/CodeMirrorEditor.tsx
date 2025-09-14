import { useEffect, useRef } from 'react';
import { EditorView } from '@codemirror/view';
import { EditorState } from '@codemirror/state';
import { history, historyKeymap } from '@codemirror/commands';
import { defaultKeymap, indentWithTab } from '@codemirror/commands';
import { keymap } from '@codemirror/view';
import { javascript } from '@codemirror/lang-javascript';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { json } from '@codemirror/lang-json';
import { markdown } from '@codemirror/lang-markdown';
import { python } from '@codemirror/lang-python';
import { useStore } from '@nanostores/react';
import { themeStore } from '../../lib/stores/theme';

export interface EditorDocument {
  filePath: string;
  value: string;
  scrollPosition: ScrollPosition;
}

export interface ScrollPosition {
  top: number;
  left: number;
}

export type OnChangeCallback = (update: { content: string }) => void;
export type OnScrollCallback = (position: ScrollPosition) => void;

interface CodeMirrorEditorProps {
  document: EditorDocument;
  onChange: OnChangeCallback;
  onScroll: OnScrollCallback;
  isStreaming?: boolean;
}

const languageMap: Record<string, any> = {
  js: javascript(),
  jsx: javascript({ jsx: true }),
  ts: javascript(),
  tsx: javascript({ jsx: true }),
  html: html(),
  css: css(),
  json: json(),
  md: markdown(),
  py: python(),
};

export default function CodeMirrorEditor({ document, onChange, onScroll }: CodeMirrorEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const editorViewRef = useRef<EditorView | null>(null);
  const theme = useStore(themeStore);

  useEffect(() => {
    if (!editorRef.current) return;

    const fileExtension = document.filePath.split('.').pop() || '';
    const language = languageMap[fileExtension];

    const extensions = [
      history(),
      keymap.of([...defaultKeymap, ...historyKeymap, indentWithTab]),
      EditorView.theme({
        '&': {
          fontSize: '14px',
          fontFamily: 'JetBrains Mono, Fira Code, Monaco, Consolas, monospace',
        },
        '.cm-content': {
          padding: '16px',
        },
        '.cm-focused': {
          outline: 'none',
        },
        '.cm-editor': {
          backgroundColor: 'transparent',
        },
      }),
      EditorView.updateListener.of((update) => {
        if (update.docChanged) {
          onChange({ content: update.state.doc.toString() });
        }
        const scrollTop = update.view.scrollDOM.scrollTop;
        const scrollLeft = update.view.scrollDOM.scrollLeft;
        onScroll({ top: scrollTop, left: scrollLeft });
      }),
    ];

    if (language) {
      extensions.push(language);
    }

    // Optional theme could be added here

    const editorView = new EditorView({
      state: EditorState.create({
        doc: document.value,
        extensions,
      }),
      parent: editorRef.current,
    });

    editorViewRef.current = editorView;

    // Restore scroll position
    if (document.scrollPosition) {
      editorView.scrollDOM.scrollTop = document.scrollPosition.top;
      editorView.scrollDOM.scrollLeft = document.scrollPosition.left;
    }

    return () => {
      editorView.destroy();
    };
  }, [document.filePath, theme]);

  useEffect(() => {
    if (editorViewRef.current && document.value !== editorViewRef.current.state.doc.toString()) {
      editorViewRef.current.dispatch({
        changes: {
          from: 0,
          to: editorViewRef.current.state.doc.length,
          insert: document.value,
        },
      });
    }
  }, [document.value]);

  return (
    <div className="h-full bg-bolt-elements-background-depth-1">
      <div ref={editorRef} className="h-full" />
    </div>
  );
}
