import type { Message } from 'ai';
import Markdown from './Markdown';
import LoadingDots from '../ui/LoadingDots';

interface AssistantMessageProps {
  message: Message;
  isStreaming: boolean;
}

export default function AssistantMessage({ message, isStreaming }: AssistantMessageProps) {
  return (
    <div className="flex justify-start">
      <div className="max-w-[80%] bg-bolt-elements-background-depth-2 text-bolt-elements-textPrimary p-3 rounded-lg border border-bolt-elements-borderColor">
        <Markdown content={message.content} />
        {isStreaming && (
          <div className="mt-2">
            <LoadingDots />
          </div>
        )}
      </div>
    </div>
  );
}
