'use client'

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HomeChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (options?: { attachments?: any[] }) => void;
  isLoading?: boolean;
  placeholder?: string;
}

export function HomeChatInput({
  value,
  onChange,
  onSubmit,
  isLoading = false,
  placeholder = "Décrivez l'application que vous voulez créer..."
}: HomeChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim() && !isLoading) {
      onSubmit();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="relative">
        <Textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={cn(
            "min-h-[120px] max-h-[300px] resize-none pr-12 py-4",
            "border-2 focus:border-primary/50 transition-colors",
            "text-base leading-relaxed"
          )}
          disabled={isLoading}
        />
        <Button
          type="submit"
          size="icon"
          className={cn(
            "absolute bottom-3 right-3 h-8 w-8",
            "bg-primary hover:bg-primary/90",
            "transition-all duration-200",
            isLoading && "opacity-50 cursor-not-allowed"
          )}
          disabled={!value.trim() || isLoading}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </Button>
      </div>
    </form>
  );
}
