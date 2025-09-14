import { atom } from 'jotai';

export const isPreviewOpenAtom = atom<boolean>(false);
export const previewModeAtom = atom<'preview' | 'code' | 'configure' | 'publish' | 'problems'>('preview');
export const isConsoleOpenAtom = atom<boolean>(false);
export const sidebarCollapsedAtom = atom<boolean>(false);
