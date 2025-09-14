'use client'

import { useNavigate } from '@/hooks/useNavigate';
import { useAtom, useSetAtom } from 'jotai';
import { homeChatInputValueAtom } from '../atoms/chatAtoms';
import { selectedAppIdAtom } from '../atoms/appAtoms';
import { generateCuteAppName } from '@/lib/utils';
import { useLoadApps } from '@/hooks/useApps';
import { useSettings } from '@/hooks/useSettings';
import { isPreviewOpenAtom } from '../atoms/viewAtoms';
import { useState, useEffect, useCallback } from 'react';
import { useStreamChat } from '@/hooks/useChats';
import { HomeChatInput } from '@/components/chat/HomeChatInput';
import { usePostHog } from 'posthog-js/react';
import { PrivacyBanner } from '@/components/TelemetryBanner';
import { INSPIRATION_PROMPTS } from '@/prompts/inspiration_prompts';
import { useAppVersion } from '@/hooks/useAppVersion';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import { ImportAppButton } from '@/components/ImportAppButton';
import { showError } from '@/lib/toast';
import { invalidateAppQuery } from '@/hooks/useApps';
import { useQueryClient } from '@tanstack/react-query';

import type { FileAttachment } from '@/lib/types';
import { NEON_TEMPLATE_IDS } from '@/shared/templates';
import { neonTemplateHook } from '@/client_logic/template_hook';

// Adding an export for attachments
export interface HomeSubmitOptions {
  attachments?: FileAttachment[];
}

export default function HomePage() {
  const [inputValue, setInputValue] = useAtom(homeChatInputValueAtom);
  const navigate = useNavigate();
  const selectedAppId = useAtomValue(selectedAppIdAtom);
  const setSelectedAppId = useSetAtom(selectedAppIdAtom);
  const { data: apps, isLoading: appsLoading } = useLoadApps();
  const { settings } = useSettings();
  const [isPreviewOpen, setIsPreviewOpen] = useAtom(isPreviewOpenAtom);
  const [showPrivacyBanner, setShowPrivacyBanner] = useState(false);
  const { mutate: streamChat, isPending: isStreaming } = useStreamChat();
  const posthog = usePostHog();
  const { data: version } = useAppVersion();
  const [showVersionDialog, setShowVersionDialog] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const queryClient = useQueryClient();

  // Check if privacy banner should be shown
  useEffect(() => {
    const hasSeenBanner = localStorage.getItem('privacy-banner-seen');
    if (!hasSeenBanner) {
      setShowPrivacyBanner(true);
    }
  }, []);

  const handleSubmit = useCallback(
    async (options: HomeSubmitOptions = {}) => {
      if (!inputValue.trim()) return;

      const prompt = inputValue.trim();
      setInputValue('');

      try {
        // Create a new app with a cute name
        const appName = generateCuteAppName();
        
        // For now, we'll simulate app creation
        // In a real implementation, you'd call the API to create the app
        const newApp = {
          id: Date.now(), // Temporary ID
          name: appName,
          path: `/tmp/${appName}`,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        // Set as selected app
        setSelectedAppId(newApp.id);

        // Create a new chat
        const newChat = {
          id: Date.now(), // Temporary ID
          appId: newApp.id,
          title: 'New Chat',
          createdAt: new Date(),
        };

        // Navigate to chat page
        navigate(`/chat?id=${newChat.id}`);

        // Start streaming the chat
        streamChat({
          chatId: newChat.id,
          message: prompt,
          onChunk: (chunk) => {
            // Handle streaming chunks
            console.log('Received chunk:', chunk);
          },
        });

        // Track the event
        posthog?.capture('app_created', {
          app_name: appName,
          prompt_length: prompt.length,
        });
      } catch (error) {
        console.error('Error creating app:', error);
        showError(error as Error);
      }
    },
    [
      inputValue,
      setInputValue,
      setSelectedAppId,
      navigate,
      streamChat,
      posthog,
    ]
  );

  const handleInspirationClick = (prompt: string) => {
    setInputValue(prompt);
  };

  if (appsLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 flex">
            <h1 className="text-lg font-semibold">Dyad</h1>
          </div>
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <div className="w-full flex-1 md:w-auto md:flex-none">
              <ImportAppButton />
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowVersionDialog(true)}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              About
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-2xl space-y-8">
          {/* Welcome Section */}
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold tracking-tight">
              Build apps with AI
            </h2>
            <p className="text-muted-foreground text-lg">
              Describe what you want to build, and Dyad will create it for you.
            </p>
          </div>

          {/* Chat Input */}
          <div className="space-y-4">
            <HomeChatInput
              value={inputValue}
              onChange={setInputValue}
              onSubmit={handleSubmit}
              isLoading={isStreaming}
              placeholder="Describe the app you want to build..."
            />
          </div>

          {/* Inspiration Prompts */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground text-center">
              Or try one of these examples:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {INSPIRATION_PROMPTS.slice(0, 4).map((prompt, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="h-auto p-4 text-left justify-start"
                  onClick={() => handleInspirationClick(prompt)}
                >
                  <span className="text-sm">{prompt}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Privacy Banner */}
      {showPrivacyBanner && (
        <PrivacyBanner
          onAccept={() => {
            setShowPrivacyBanner(false);
            localStorage.setItem('privacy-banner-seen', 'true');
          }}
        />
      )}

      {/* Version Dialog */}
      <Dialog open={showVersionDialog} onOpenChange={setShowVersionDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>About Dyad</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Dyad is a free, open-source AI app builder that helps you create applications
              by describing what you want to build.
            </p>
            {version && (
              <p className="text-sm">
                <strong>Version:</strong> {version}
              </p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
