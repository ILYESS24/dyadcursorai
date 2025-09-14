import { Suspense } from 'react';
import { AppSidebar } from '@/components/app-sidebar';
import { HubPage } from '@/components/pages/HubPage';
import { SidebarProvider } from '@/components/ui/sidebar';

export default function Hub() {
  return (
    <SidebarProvider>
      <div className="flex h-screen">
        <AppSidebar />
        <main className="flex-1 overflow-hidden">
          <Suspense fallback={<div className="flex items-center justify-center h-full">Loading...</div>}>
            <HubPage />
          </Suspense>
        </main>
      </div>
    </SidebarProvider>
  );
}
