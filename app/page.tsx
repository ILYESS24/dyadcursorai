import { Suspense } from 'react';
import { AppSidebar } from '@/components/app-sidebar';
import { HomePage } from '@/components/pages/HomePage';
import { SidebarProvider } from '@/components/ui/sidebar';

export default function Home() {
  return (
    <SidebarProvider>
      <div className="flex h-screen">
        <AppSidebar />
        <main className="flex-1 overflow-hidden">
          <Suspense fallback={<div className="flex items-center justify-center h-full">Loading...</div>}>
            <HomePage />
          </Suspense>
        </main>
      </div>
    </SidebarProvider>
  );
}
