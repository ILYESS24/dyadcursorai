import { Suspense } from 'react';
import { AppSidebar } from '@/components/app-sidebar';
import { SettingsPage } from '@/components/pages/SettingsPage';
import { SidebarProvider } from '@/components/ui/sidebar';

export default function Settings() {
  return (
    <SidebarProvider>
      <div className="flex h-screen">
        <AppSidebar />
        <main className="flex-1 overflow-hidden">
          <Suspense fallback={<div className="flex items-center justify-center h-full">Loading...</div>}>
            <SettingsPage />
          </Suspense>
        </main>
      </div>
    </SidebarProvider>
  );
}
