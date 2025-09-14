'use client'

import { SidebarMenuButton } from '@/components/ui/sidebar';
import { Settings } from 'lucide-react';
import Link from 'next/link';

export function SettingsList() {
  return (
    <SidebarMenuButton asChild>
      <Link href="/settings">
        <Settings className="h-4 w-4" />
        <span>Paramètres</span>
      </Link>
    </SidebarMenuButton>
  );
}
