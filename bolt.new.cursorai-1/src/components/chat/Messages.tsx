import { useEffect, useRef } from 'react';
import type { Message } from 'ai';
import { motion } from 'framer-motion';
import UserMessage from './UserMessage';
import AssistantMessage from './AssistantMessage';

interface MessagesProps {
  messages: Message[];
  isStreaming: boolean;
}

export default function Messages({ messages, isStreaming }: MessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isStreaming]);

  return (
    <div className="flex flex-col gap-4">
      {messages.map((message, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {message.role === 'user' ? (
            <UserMessage message={message} />
          ) : (
            <AssistantMessage message={message} isStreaming={isStreaming && index === messages.length - 1} />
          )}
        </motion.div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}
