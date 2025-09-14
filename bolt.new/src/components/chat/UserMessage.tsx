import type { Message } from 'ai';

interface UserMessageProps {
  message: Message;
}

export default function UserMessage({ message }: UserMessageProps) {
  return (
    <div className="flex justify-end">
      <div className="max-w-[80%] bg-bolt-elements-item-backgroundAccent text-bolt-elements-textPrimary p-3 rounded-lg">
        <div className="whitespace-pre-wrap">{message.content}</div>
      </div>
    </div>
  );
}
