import { atom } from 'jotai';

export const homeChatInputValueAtom = atom<string>('');
export const selectedChatIdAtom = atom<number | null>(null);
export const chatMessagesAtom = atom<any[]>([]);
export const isStreamingAtom = atom<boolean>(false);
