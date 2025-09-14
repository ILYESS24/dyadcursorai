import { useStore } from '@nanostores/react';
// import type { Message } from 'ai';
import { useChat } from 'ai/react';
import { useAnimate } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { chatStore } from '../lib/stores/chat';
import { workbenchStore } from '../lib/stores/workbench';
import { fileModificationsToHTML } from '../utils/diff';
import { cubicEasingFn } from '../utils/easings';
// import BaseChat from './BaseChat';
import Menu from './sidebar/Menu';
import Workbench from './workbench/Workbench';

const EXAMPLE_PROMPTS = [
  { text: 'Build a todo app in React using Tailwind' },
  { text: 'Build a simple blog using Astro' },
  { text: 'Create a cookie consent form using Material UI' },
  { text: 'Make a space invaders game' },
  { text: 'How do I center a div?' },
];

export default function Chat() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [chatStarted, setChatStarted] = useState(false);
  const [animationScope, animate] = useAnimate();

  const { showChat } = useStore(chatStore);

  const { messages, isLoading, input, handleInputChange, setInput, stop, append } = useChat({
    api: '/api/chat',
    onError: (error) => {
      console.error('Request failed:', error);
      toast.error('There was an error processing your request');
    },
    onFinish: () => {
      console.log('Finished streaming');
    },
  });

  const TEXTAREA_MAX_HEIGHT = chatStarted ? 400 : 200;

  useEffect(() => {
    chatStore.setKey('started', messages.length > 0);
  }, [messages.length]);

  // const scrollTextArea = () => {
  //   const textarea = textareaRef.current;
  //   if (textarea) {
  //     textarea.scrollTop = textarea.scrollHeight;
  //   }
  // };

  const abort = () => {
    stop();
    chatStore.setKey('aborted', true);
    workbenchStore.abortAllActions();
  };

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      const scrollHeight = textarea.scrollHeight;
      textarea.style.height = `${Math.min(scrollHeight, TEXTAREA_MAX_HEIGHT)}px`;
      textarea.style.overflowY = scrollHeight > TEXTAREA_MAX_HEIGHT ? 'auto' : 'hidden';
    }
  }, [input, textareaRef]);

  const runAnimation = async () => {
    if (chatStarted) {
      return;
    }

    try {
      await Promise.all([
        (animate as any)('#examples', { opacity: 0, display: 'none' }, { duration: 0.1 }),
        (animate as any)('#intro', { opacity: 0 }, { duration: 0.2, ease: cubicEasingFn }),
      ]);
    } catch {}

    chatStore.setKey('started', true);
    setChatStarted(true);
  };

  const sendMessage = async (_event: React.UIEvent, messageInput?: string) => {
    const _input = messageInput || input;

    if (_input.length === 0 || isLoading) {
      return;
    }

    await workbenchStore.saveAllFiles();
    const fileModifications = workbenchStore.getFileModifcations();
    chatStore.setKey('aborted', false);

    runAnimation();

    if (fileModifications !== undefined) {
      const diff = fileModificationsToHTML(fileModifications);
      append({ role: 'user', content: `${diff}\n\n${_input}` });
      workbenchStore.resetAllFileModifications();
    } else {
      append({ role: 'user', content: _input });
    }

    setInput('');
    textareaRef.current?.blur();
  };

  useEffect(() => {
    // After each assistant message, attempt to parse and run plan
    if (messages.length === 0) return;
    const last = messages[messages.length - 1];
    if (last.role !== 'assistant') return;
    // messageId: use index-based id for now
    const messageId = String(messages.length - 1);
    workbenchStore.tryRunAssistantPlan(messageId, last.content).catch((err) => {
      console.warn('No runnable plan or failed to run plan', err);
    });
  }, [messages]);

  return (
    <div
      ref={animationScope}
      className="relative flex h-full w-full overflow-hidden bg-bolt-elements-background-depth-1"
      data-chat-visible={showChat}
    >
      <Menu />
      <div className="flex overflow-y-auto w-full h-full">
        <div className="flex flex-col flex-grow min-w-[var(--chat-min-width)] h-full">
          {!chatStarted && (
            <div id="intro" className="mt-[26vh] max-w-chat mx-auto">
              <h1 className="text-5xl text-center font-bold text-bolt-elements-textPrimary mb-2">
                Where ideas begin
              </h1>
              <p className="mb-4 text-center text-bolt-elements-textSecondary">
                Bring ideas to life in seconds or get help on existing projects.
              </p>
            </div>
          )}
          <div className={chatStarted ? 'pt-6 px-6 h-full flex flex-col' : 'pt-6 px-6'}>
            {chatStarted && (
              <div className="flex flex-col w-full flex-1 max-w-chat px-4 pb-6 mx-auto z-1">
                <Messages messages={messages} isStreaming={isLoading} />
              </div>
            )}
            <div className={chatStarted ? 'relative w-full max-w-chat mx-auto z-prompt sticky bottom-0' : 'relative w-full max-w-chat mx-auto z-prompt'}>
              <div className="shadow-sm border border-bolt-elements-borderColor bg-bolt-elements-prompt-background backdrop-filter backdrop-blur-[8px] rounded-lg overflow-hidden">
                <textarea
                  ref={textareaRef}
                  className="w-full pl-4 pt-4 pr-16 focus:outline-none resize-none text-md text-bolt-elements-textPrimary placeholder-bolt-elements-textTertiary bg-transparent"
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      if (event.shiftKey) {
                        return;
                      }
                      event.preventDefault();
                      sendMessage(event);
                    }
                  }}
                  value={input}
                  onChange={handleInputChange}
                  data-textarea
                  placeholder="How can Bolt help you today?"
                  translate="no"
                />
                <SendButton
                  show={input.length > 0 || isLoading}
                  isStreaming={isLoading}
                  onClick={(event) => {
                    if (isLoading) {
                      abort();
                      return;
                    }
                    sendMessage(event);
                  }}
                />
                <div className="flex justify-between text-sm p-4 pt-2">
                  <div className="flex gap-1 items-center">
                    <IconButton
                      icon="i-bolt:stars"
                      title="Enhance prompt"
                      disabled={input.length === 0}
                      className="text-bolt-elements-item-contentAccent! pr-1.5 enabled:hover:bg-bolt-elements-item-backgroundAccent!"
                    >
                      <div className="i-bolt:stars text-xl"></div>
                    </IconButton>
                  </div>
                  {input.length > 3 ? (
                    <div className="text-xs text-bolt-elements-textTertiary">
                      Use <kbd className="kdb">Shift</kbd> + <kbd className="kdb">Return</kbd> for a new line
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="bg-bolt-elements-background-depth-1 pb-6">{/* Ghost Element */}</div>
            </div>
          </div>
          {!chatStarted && (
            <div id="examples" className="relative w-full max-w-xl mx-auto mt-8 flex justify-center">
              <div className="flex flex-col space-y-2 [mask-image:linear-gradient(to_bottom,black_0%,transparent_180%)] hover:[mask-image:none]">
                {EXAMPLE_PROMPTS.map((examplePrompt, index) => {
                  return (
                    <button
                      key={index}
                      onClick={(event) => {
                        sendMessage(event, examplePrompt.text);
                      }}
                      className="group flex items-center w-full gap-2 justify-center bg-transparent text-bolt-elements-textTertiary hover:text-bolt-elements-textPrimary transition-theme"
                    >
                      {examplePrompt.text}
                      <div className="i-ph:arrow-bend-down-left" />
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
        <Workbench chatStarted={chatStarted} isStreaming={isLoading} />
      </div>
    </div>
  );
}

// Import the components we need
import Messages from './chat/Messages';
import SendButton from './chat/SendButton';
import IconButton from './ui/IconButton';
