'use client'

import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { useLoadApps } from '@/hooks/useApps';
import { Folder, Plus } from 'lucide-react';
import Link from 'next/link';

export function AppList() {
  const { data: apps, isLoading } = useLoadApps();

  if (isLoading) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <div className="flex items-center gap-2 px-2 py-2 text-sm text-muted-foreground">
            <Folder className="h-4 w-4" />
            <span>Chargement...</span>
          </div>
        </SidebarMenuItem>
      </SidebarMenu>
    );
  }

  if (!apps || apps.length === 0) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <div className="flex items-center gap-2 px-2 py-2 text-sm text-muted-foreground">
            <Folder className="h-4 w-4" />
            <span>Aucune app</span>
          </div>
        </SidebarMenuItem>
      </SidebarMenu>
    );
  }

  return (
    <SidebarMenu>
      {apps.slice(0, 5).map((app) => (
        <SidebarMenuItem key={app.id}>
          <SidebarMenuButton asChild>
            <Link href={`/apps/${app.id}`}>
              <Folder className="h-4 w-4" />
              <span>{app.name}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
