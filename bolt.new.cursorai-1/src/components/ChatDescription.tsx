import { useStore } from '@nanostores/react';
import { chatStore } from '../lib/stores/chat';

export default function ChatDescription() {
  const chat = useStore(chatStore);

  if (!chat.started) {
    return <span>Where ideas begin</span>;
  }

  return <span>Chat with Bolt</span>;
}
