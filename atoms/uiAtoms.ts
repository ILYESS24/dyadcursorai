import { atom } from 'jotai';

export const dropdownOpenAtom = atom<boolean>(false);
export const themeAtom = atom<'light' | 'dark' | 'system'>('system');
export const isLoadingAtom = atom<boolean>(false);
export const errorAtom = atom<string | null>(null);
