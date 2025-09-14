'use client'

import { useState } from 'react';
import { SidebarMenuButton } from '@/components/ui/sidebar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { HelpCircle } from 'lucide-react';

export function HelpDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <SidebarMenuButton>
          <HelpCircle className="h-4 w-4" />
          <span>Aide</span>
        </SidebarMenuButton>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Aide</DialogTitle>
          <DialogDescription>
            Comment utiliser Dyad pour créer vos applications.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold">Créer une application</h3>
            <p className="text-sm text-muted-foreground">
              Décrivez simplement ce que vous voulez créer dans la zone de texte principale.
            </p>
          </div>
          <div>
            <h3 className="font-semibold">Gérer vos applications</h3>
            <p className="text-sm text-muted-foreground">
              Utilisez la barre latérale pour naviguer entre vos applications et chats.
            </p>
          </div>
          <div>
            <h3 className="font-semibold">Personnaliser</h3>
            <p className="text-sm text-muted-foreground">
              Accédez aux paramètres pour configurer vos clés API et préférences.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
