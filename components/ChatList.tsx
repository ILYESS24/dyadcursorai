'use client'

import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { useChats } from '@/hooks/useChats';
import { useAtomValue } from 'jotai';
import { selectedAppIdAtom } from '@/atoms/appAtoms';
import { MessageSquare, Plus } from 'lucide-react';
import Link from 'next/link';

export function ChatList() {
  const selectedAppId = useAtomValue(selectedAppIdAtom);
  const { data: chats, isLoading } = useChats(selectedAppId);

  if (isLoading) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <div className="flex items-center gap-2 px-2 py-2 text-sm text-muted-foreground">
            <MessageSquare className="h-4 w-4" />
            <span>Chargement...</span>
          </div>
        </SidebarMenuItem>
      </SidebarMenu>
    );
  }

  if (!chats || chats.length === 0) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <div className="flex items-center gap-2 px-2 py-2 text-sm text-muted-foreground">
            <MessageSquare className="h-4 w-4" />
            <span>Aucun chat</span>
          </div>
        </SidebarMenuItem>
      </SidebarMenu>
    );
  }

  return (
    <SidebarMenu>
      {chats.map((chat) => (
        <SidebarMenuItem key={chat.id}>
          <SidebarMenuButton asChild>
            <Link href={`/chat?id=${chat.id}`}>
              <MessageSquare className="h-4 w-4" />
              <span>{chat.title || 'Chat sans titre'}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
