import { Suspense } from 'react';
import { AppSidebar } from '@/components/app-sidebar';
import { ChatPage } from '@/components/pages/ChatPage';
import { SidebarProvider } from '@/components/ui/sidebar';

export default function Chat() {
  return (
    <SidebarProvider>
      <div className="flex h-screen">
        <AppSidebar />
        <main className="flex-1 overflow-hidden">
          <Suspense fallback={<div className="flex items-center justify-center h-full">Loading...</div>}>
            <ChatPage />
          </Suspense>
        </main>
      </div>
    </SidebarProvider>
  );
}
