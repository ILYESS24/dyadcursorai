import { toast } from 'sonner';

export function showError(error: Error | string) {
  const message = error instanceof Error ? error.message : error;
  toast.error(message);
}

export function showSuccess(message: string) {
  toast.success(message);
}

export function showInfo(message: string) {
  toast.info(message);
}

export function showWarning(message: string) {
  toast.warning(message);
}
