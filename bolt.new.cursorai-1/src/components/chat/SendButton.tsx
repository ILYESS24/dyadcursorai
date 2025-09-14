import { motion } from 'framer-motion';
import IconButton from '../ui/IconButton';

interface SendButtonProps {
  show: boolean;
  isStreaming: boolean;
  onClick: (event: React.MouseEvent) => void;
}

export default function SendButton({ show, isStreaming, onClick }: SendButtonProps) {
  if (!show) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="absolute right-2 top-2"
    >
      <IconButton
        icon={isStreaming ? 'i-ph:stop' : 'i-ph:paper-plane-tilt'}
        onClick={() => onClick as any}
        className="bg-bolt-elements-item-contentAccent text-white hover:bg-bolt-elements-item-contentAccent/90"
        size="sm"
      />
    </motion.div>
  );
}
