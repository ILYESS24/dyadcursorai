'use client'

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useSettings, useUpdateSettings } from '@/hooks/useSettings';
import { showSuccess } from '@/lib/toast';

export function SettingsPage() {
  const { data: settings, isLoading } = useSettings();
  const { mutate: updateSettings, isPending } = useUpdateSettings();
  const [formData, setFormData] = useState(settings || {});

  const handleSave = () => {
    updateSettings(formData, {
      onSuccess: () => {
        showSuccess('Paramètres sauvegardés avec succès');
      },
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Chargement des paramètres...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Paramètres</h1>

      <div className="space-y-6">
        {/* General Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Paramètres généraux</CardTitle>
            <CardDescription>
              Configurez les paramètres généraux de l'application
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="telemetry">Télémétrie</Label>
                <p className="text-sm text-muted-foreground">
                  Autoriser l'envoi de données d'utilisation anonymes
                </p>
              </div>
              <Switch
                id="telemetry"
                checked={formData.enableTelemetry || false}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, enableTelemetry: checked })
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* AI Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Paramètres IA</CardTitle>
            <CardDescription>
              Configurez vos clés API pour les modèles d'IA
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="openai-key">OpenAI API Key</Label>
              <Input
                id="openai-key"
                type="password"
                value={formData.openaiApiKey || ''}
                onChange={(e) =>
                  setFormData({ ...formData, openaiApiKey: e.target.value })
                }
                placeholder="sk-..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="anthropic-key">Anthropic API Key</Label>
              <Input
                id="anthropic-key"
                type="password"
                value={formData.anthropicApiKey || ''}
                onChange={(e) =>
                  setFormData({ ...formData, anthropicApiKey: e.target.value })
                }
                placeholder="sk-ant-..."
              />
            </div>
          </CardContent>
        </Card>

        {/* External Services */}
        <Card>
          <CardHeader>
            <CardTitle>Services externes</CardTitle>
            <CardDescription>
              Configurez l'intégration avec les services externes
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="github-token">GitHub Access Token</Label>
              <Input
                id="github-token"
                type="password"
                value={formData.githubAccessToken || ''}
                onChange={(e) =>
                  setFormData({ ...formData, githubAccessToken: e.target.value })
                }
                placeholder="ghp_..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vercel-token">Vercel Access Token</Label>
              <Input
                id="vercel-token"
                type="password"
                value={formData.vercelAccessToken || ''}
                onChange={(e) =>
                  setFormData({ ...formData, vercelAccessToken: e.target.value })
                }
                placeholder="vercel_..."
              />
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={isPending}>
            {isPending ? 'Sauvegarde...' : 'Sauvegarder'}
          </Button>
        </div>
      </div>
    </div>
  );
}
