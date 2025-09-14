'use client'

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Check, X } from 'lucide-react';

interface PrivacyBannerProps {
  onAccept: () => void;
}

export function PrivacyBanner({ onAccept }: PrivacyBannerProps) {
  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 max-w-md mx-auto">
      <Card className="border-2 border-primary/20 shadow-lg">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <CardTitle className="text-sm">Respect de la vie privée</CardTitle>
          </div>
          <CardDescription className="text-xs">
            Dyad collecte des données anonymes pour améliorer l'expérience utilisateur.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={onAccept}
              className="flex-1"
            >
              <Check className="h-4 w-4 mr-1" />
              Accepter
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={onAccept}
              className="flex-1"
            >
              <X className="h-4 w-4 mr-1" />
              Refuser
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
