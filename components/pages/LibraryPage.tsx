'use client'

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Edit, Trash2 } from 'lucide-react';

interface Prompt {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
}

export function LibraryPage() {
  const [prompts, setPrompts] = useState<Prompt[]>([
    {
      id: 1,
      title: 'Todo App',
      content: 'Create a modern todo application with drag and drop functionality',
      createdAt: new Date(),
    },
    {
      id: 2,
      title: 'Weather Dashboard',
      content: 'Build a weather dashboard with charts and forecasts',
      createdAt: new Date(),
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingPrompt, setEditingPrompt] = useState<Prompt | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingPrompt) {
      setPrompts(prompts.map(p => 
        p.id === editingPrompt.id 
          ? { ...p, ...formData }
          : p
      ));
    } else {
      const newPrompt: Prompt = {
        id: Date.now(),
        title: formData.title,
        content: formData.content,
        createdAt: new Date(),
      };
      setPrompts([...prompts, newPrompt]);
    }

    setFormData({ title: '', content: '' });
    setShowForm(false);
    setEditingPrompt(null);
  };

  const handleEdit = (prompt: Prompt) => {
    setEditingPrompt(prompt);
    setFormData({
      title: prompt.title,
      content: prompt.content,
    });
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    setPrompts(prompts.filter(p => p.id !== id));
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Bibliothèque</h1>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Nouveau prompt
        </Button>
      </div>

      {/* Form */}
      {showForm && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>
              {editingPrompt ? 'Modifier le prompt' : 'Nouveau prompt'}
            </CardTitle>
            <CardDescription>
              Créez un nouveau prompt réutilisable pour vos applications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Titre</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Nom du prompt"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">Contenu</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Description de ce que vous voulez créer..."
                  rows={4}
                  required
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit">
                  {editingPrompt ? 'Modifier' : 'Créer'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowForm(false);
                    setEditingPrompt(null);
                    setFormData({ title: '', content: '' });
                  }}
                >
                  Annuler
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Prompts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {prompts.map((prompt) => (
          <PromptCard
            key={prompt.id}
            prompt={prompt}
            onUpdate={() => handleEdit(prompt)}
            onDelete={() => handleDelete(prompt.id)}
          />
        ))}
      </div>

      {prompts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">Aucun prompt dans votre bibliothèque</p>
          <Button onClick={() => setShowForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Créer votre premier prompt
          </Button>
        </div>
      )}
    </div>
  );
}

function PromptCard({
  prompt,
  onUpdate,
  onDelete,
}: {
  prompt: Prompt;
  onUpdate: () => void;
  onDelete: () => void;
}) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg">{prompt.title}</CardTitle>
            <CardDescription className="mt-2">
              {prompt.content}
            </CardDescription>
          </div>
          <div className="flex gap-1 ml-2">
            <Button size="sm" variant="ghost" onClick={onUpdate}>
              <Edit className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="ghost" onClick={onDelete}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center text-sm text-muted-foreground">
          <span>Créé le {prompt.createdAt.toLocaleDateString('fr-FR')}</span>
          <Button size="sm" variant="outline">
            Utiliser
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
