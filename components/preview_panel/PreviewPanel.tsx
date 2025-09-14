'use client'

import { useState } from 'react';
import { useAtom } from 'jotai';
import { previewModeAtom } from '@/atoms/viewAtoms';

export function PreviewPanel() {
  const [previewMode] = useAtom(previewModeAtom);

  return (
    <div className="h-full flex items-center justify-center bg-muted/50">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">Aperçu</h3>
        <p className="text-muted-foreground">
          L'aperçu de votre application apparaîtra ici
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          Mode: {previewMode}
        </p>
      </div>
    </div>
  );
}
