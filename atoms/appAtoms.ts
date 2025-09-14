import { atom } from 'jotai';

export const selectedAppIdAtom = atom<number | null>(null);
export const runningAppIdAtom = atom<number | null>(null);
export const appsAtom = atom<any[]>([]);
