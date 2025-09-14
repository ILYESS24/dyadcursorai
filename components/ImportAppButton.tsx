'use client'

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, FolderOpen } from 'lucide-react';
import { useCreateApp } from '@/hooks/useApps';
import { showError, showSuccess } from '@/lib/toast';

export function ImportAppButton() {
  const [open, setOpen] = useState(false);
  const [appName, setAppName] = useState('');
  const [appPath, setAppPath] = useState('');
  const { mutate: createApp, isPending } = useCreateApp();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!appName.trim() || !appPath.trim()) {
      showError('Le nom et le chemin sont requis');
      return;
    }

    createApp(
      {
        name: appName.trim(),
        path: appPath.trim(),
      },
      {
        onSuccess: () => {
          showSuccess('Application importée avec succès');
          setOpen(false);
          setAppName('');
          setAppPath('');
        },
        onError: (error) => {
          showError(error.message);
        },
      }
    );
  };

  const handleFolderSelect = () => {
    // Dans une vraie application, vous utiliseriez une API pour sélectionner un dossier
    // Pour l'instant, on simule avec un input
    const input = document.createElement('input');
    input.type = 'file';
    input.webkitdirectory = true;
    input.onchange = (e) => {
      const files = (e.target as HTMLInputElement).files;
      if (files && files.length > 0) {
        const folderName = files[0].webkitRelativePath.split('/')[0];
        setAppPath(`/${folderName}`);
        setAppName(folderName);
      }
    };
    input.click();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Upload className="h-4 w-4 mr-2" />
          Importer une app
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Importer une application</DialogTitle>
          <DialogDescription>
            Importez une application existante pour commencer à travailler dessus.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="appName">Nom de l'application</Label>
            <Input
              id="appName"
              value={appName}
              onChange={(e) => setAppName(e.target.value)}
              placeholder="Mon super app"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="appPath">Chemin vers l'application</Label>
            <div className="flex gap-2">
              <Input
                id="appPath"
                value={appPath}
                onChange={(e) => setAppPath(e.target.value)}
                placeholder="/chemin/vers/mon/app"
                required
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={handleFolderSelect}
                title="Sélectionner un dossier"
              >
                <FolderOpen className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isPending}
            >
              Annuler
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? 'Importation...' : 'Importer'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
