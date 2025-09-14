import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';

export function useChats(appId?: number) {
  return useQuery({
    queryKey: ['chats', appId],
    queryFn: () => apiClient.listChats(appId),
    enabled: appId !== null && appId !== undefined,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useMessages(chatId: number) {
  return useQuery({
    queryKey: ['messages', chatId],
    queryFn: () => apiClient.listMessages(chatId),
    enabled: chatId !== null && chatId !== undefined,
    staleTime: 1 * 60 * 1000, // 1 minute
  });
}

export function useCreateChat() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { appId: number; title?: string; initialCommitHash?: string }) =>
      apiClient.createChat(data),
    onSuccess: (_, { appId }) => {
      queryClient.invalidateQueries({ queryKey: ['chats', appId] });
      queryClient.invalidateQueries({ queryKey: ['chats'] });
    },
    onError: (error) => {
      console.error('Error creating chat:', error);
    },
  });
}

export function useCreateMessage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ chatId, data }: { 
      chatId: number; 
      data: {
        role: 'user' | 'assistant';
        content: string;
        approvalState?: 'approved' | 'rejected';
        commitHash?: string;
      }
    }) => apiClient.createMessage(chatId, data),
    onSuccess: (_, { chatId }) => {
      queryClient.invalidateQueries({ queryKey: ['messages', chatId] });
    },
    onError: (error) => {
      console.error('Error creating message:', error);
    },
  });
}

export function useStreamChat() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ 
      chatId, 
      message, 
      onChunk 
    }: { 
      chatId: number; 
      message: string; 
      onChunk: (chunk: any) => void;
    }) => apiClient.streamChat(chatId, message, onChunk),
    onSuccess: (_, { chatId }) => {
      queryClient.invalidateQueries({ queryKey: ['messages', chatId] });
    },
    onError: (error) => {
      console.error('Error streaming chat:', error);
    },
  });
}
