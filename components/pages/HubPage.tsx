'use client'

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, ExternalLink, Download } from 'lucide-react';

interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  isOfficial: boolean;
  stars: number;
  downloads: number;
  tags: string[];
}

export function HubPage() {
  const [templates] = useState<Template[]>([
    {
      id: 'nextjs-blog',
      name: 'Next.js Blog',
      description: 'A modern blog built with Next.js, featuring markdown support and responsive design.',
      category: 'Web Development',
      isOfficial: true,
      stars: 1250,
      downloads: 8500,
      tags: ['Next.js', 'React', 'Blog', 'Markdown'],
    },
    {
      id: 'react-dashboard',
      name: 'React Dashboard',
      description: 'A comprehensive admin dashboard with charts, tables, and user management.',
      category: 'Web Development',
      isOfficial: true,
      stars: 980,
      downloads: 6200,
      tags: ['React', 'Dashboard', 'Charts', 'Admin'],
    },
    {
      id: 'ecommerce-store',
      name: 'E-commerce Store',
      description: 'A full-featured online store with shopping cart, payments, and inventory management.',
      category: 'E-commerce',
      isOfficial: false,
      stars: 750,
      downloads: 4200,
      tags: ['E-commerce', 'Payments', 'Shopping Cart'],
    },
    {
      id: 'portfolio-site',
      name: 'Portfolio Website',
      description: 'A stunning portfolio website with animations and project showcases.',
      category: 'Portfolio',
      isOfficial: false,
      stars: 620,
      downloads: 3800,
      tags: ['Portfolio', 'Animation', 'Responsive'],
    },
    {
      id: 'task-manager',
      name: 'Task Manager',
      description: 'A collaborative task management app with real-time updates and team features.',
      category: 'Productivity',
      isOfficial: true,
      stars: 890,
      downloads: 5500,
      tags: ['Tasks', 'Collaboration', 'Real-time'],
    },
    {
      id: 'weather-app',
      name: 'Weather App',
      description: 'A beautiful weather application with forecasts and location-based data.',
      category: 'Utility',
      isOfficial: false,
      stars: 450,
      downloads: 2800,
      tags: ['Weather', 'API', 'Location'],
    },
  ]);

  const categories = ['All', 'Web Development', 'E-commerce', 'Portfolio', 'Productivity', 'Utility'];

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Hub de Templates</h1>
        <p className="text-muted-foreground">
          Découvrez et utilisez des templates prêts à l'emploi pour vos projets
        </p>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((category) => (
          <Button
            key={category}
            variant="outline"
            size="sm"
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <TemplateCard key={template.id} template={template} />
        ))}
      </div>
    </div>
  );
}

function TemplateCard({ template }: { template: Template }) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <CardTitle className="text-lg">{template.name}</CardTitle>
              {template.isOfficial && (
                <Badge variant="secondary">
                  <Star className="h-3 w-3 mr-1" />
                  Officiel
                </Badge>
              )}
            </div>
            <CardDescription className="text-sm">
              {template.description}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Stats */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4" />
              <span>{template.stars}</span>
            </div>
            <div className="flex items-center gap-1">
              <Download className="h-4 w-4" />
              <span>{template.downloads}</span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1">
            {template.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button className="flex-1">
              <Download className="h-4 w-4 mr-2" />
              Utiliser
            </Button>
            <Button variant="outline" size="icon">
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
