import { Suspense } from 'react';
import { AppSidebar } from '@/components/app-sidebar';
import { LibraryPage } from '@/components/pages/LibraryPage';
import { SidebarProvider } from '@/components/ui/sidebar';

export default function Library() {
  return (
    <SidebarProvider>
      <div className="flex h-screen">
        <AppSidebar />
        <main className="flex-1 overflow-hidden">
          <Suspense fallback={<div className="flex items-center justify-center h-full">Loading...</div>}>
            <LibraryPage />
          </Suspense>
        </main>
      </div>
    </SidebarProvider>
  );
}
