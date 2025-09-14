// Client API pour remplacer le système IPC Electron
class ApiClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.NODE_ENV === 'development' 
      ? 'http://localhost:3000/api' 
      : '/api';
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(error.error || `HTTP ${response.status}`);
    }

    return response.json();
  }

  // Apps
  async listApps() {
    return this.request('/apps');
  }

  async getApp(id: number) {
    return this.request(`/apps/${id}`);
  }

  async createApp(data: any) {
    return this.request('/apps', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateApp(id: number, data: any) {
    return this.request(`/apps/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteApp(id: number) {
    return this.request(`/apps/${id}`, {
      method: 'DELETE',
    });
  }

  // Chats
  async listChats(appId?: number) {
    const params = appId ? `?appId=${appId}` : '';
    return this.request(`/chat${params}`);
  }

  async createChat(data: { appId: number; title?: string; initialCommitHash?: string }) {
    return this.request('/chat', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Messages
  async listMessages(chatId: number) {
    return this.request(`/chat/${chatId}/messages`);
  }

  async createMessage(chatId: number, data: {
    role: 'user' | 'assistant';
    content: string;
    approvalState?: 'approved' | 'rejected';
    commitHash?: string;
  }) {
    return this.request(`/chat/${chatId}/messages`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Settings
  async getSettings() {
    return this.request('/settings');
  }

  async updateSettings(data: any) {
    return this.request('/settings', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // Chat streaming (simulation pour l'instant)
  async streamChat(chatId: number, message: string, onChunk: (chunk: any) => void) {
    // Pour l'instant, simuler le streaming
    // Dans une vraie implémentation, vous utiliseriez Server-Sent Events
    try {
      const response = await this.createMessage(chatId, {
        role: 'user',
        content: message,
      });

      // Simuler une réponse de l'IA
      setTimeout(() => {
        onChunk({
          type: 'message',
          content: 'Réponse simulée de l\'IA',
          role: 'assistant',
        });
      }, 1000);

      return response;
    } catch (error) {
      throw error;
    }
  }

  // App execution (simulation pour l'instant)
  async executeApp(appId: number, command: string) {
    // Dans une vraie application, cela appellerait un service externe
    // ou utiliserait des WebContainers pour exécuter le code
    return {
      success: true,
      message: `App ${appId} executed with command: ${command}`,
      output: 'Simulated output',
    };
  }

  async stopApp(appId: number) {
    return {
      success: true,
      message: `App ${appId} stopped`,
    };
  }
}

// Instance singleton
export const apiClient = new ApiClient();
