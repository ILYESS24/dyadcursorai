'use client'

import { useState, useRef, useEffect } from 'react';
import {
  PanelGroup,
  Panel,
  PanelResizeHandle,
  type ImperativePanelHandle,
} from 'react-resizable-panels';
import { ChatPanel } from '../ChatPanel';
import { PreviewPanel } from '../preview_panel/PreviewPanel';
import { useNavigate, useSearch } from '@/hooks/useNavigate';
import { cn } from '@/lib/utils';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { isPreviewOpenAtom } from '../atoms/viewAtoms';
import { useChats } from '@/hooks/useChats';
import { selectedAppIdAtom } from '../atoms/appAtoms';

export default function ChatPage() {
  const { searchParams } = useSearch();
  const chatId = searchParams.get('id');
  const navigate = useNavigate();
  const [isPreviewOpen, setIsPreviewOpen] = useAtom(isPreviewOpenAtom);
  const [isResizing, setIsResizing] = useState(false);
  const selectedAppId = useAtomValue(selectedAppIdAtom);
  const setSelectedAppId = useSetAtom(selectedAppIdAtom);
  const { data: chats, isLoading: chatsLoading } = useChats(selectedAppId);

  useEffect(() => {
    if (!chatId && chats && chats.length && !chatsLoading) {
      // Not a real navigation, just a redirect, when the user navigates to /chat
      // without a chatId, we redirect to the first chat
      setSelectedAppId(chats[0].appId);
      navigate(`/chat?id=${chats[0].id}`, { replace: true });
    }
  }, [chatId, chats, chatsLoading, navigate, setSelectedAppId]);

  useEffect(() => {
    if (isPreviewOpen) {
      ref.current?.expand();
    } else {
      ref.current?.collapse();
    }
  }, [isPreviewOpen]);
  
  const ref = useRef<ImperativePanelHandle>(null);

  const handleTogglePreview = () => {
    setIsPreviewOpen(!isPreviewOpen);
  };

  if (chatsLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading chat...</p>
        </div>
      </div>
    );
  }

  if (!chatId) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <p className="text-muted-foreground">No chat selected</p>
        </div>
      </div>
    );
  }

  return (
    <PanelGroup autoSaveId="persistence" direction="horizontal">
      <Panel defaultSize={70} minSize={30}>
        <ChatPanel
          chatId={parseInt(chatId)}
          isPreviewOpen={isPreviewOpen}
          onTogglePreview={handleTogglePreview}
        />
      </Panel>
      {isPreviewOpen && (
        <>
          <PanelResizeHandle className="w-1 bg-border hover:bg-gray-400 transition-colors cursor-col-resize" />
          <Panel
            ref={ref}
            defaultSize={30}
            minSize={20}
            maxSize={50}
            onResize={() => setIsResizing(true)}
            onResizeEnd={() => {
              setIsResizing(false);
            }}
          >
            <div className={cn("h-full", isResizing && "pointer-events-none")}>
              <PreviewPanel />
            </div>
          </Panel>
        </>
      )}
    </PanelGroup>
  );
}
