import { classNames } from '../../utils/classNames';

interface PanelHeaderButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

export default function PanelHeaderButton({ children, onClick, className, disabled }: PanelHeaderButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={classNames(
        'flex items-center gap-2 px-3 py-1.5 text-sm rounded-md transition-theme',
        'hover:bg-bolt-elements-item-backgroundAccent',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'focus:outline-none focus:ring-2 focus:ring-bolt-elements-item-contentAccent focus:ring-offset-2',
        className
      )}
    >
      {children}
    </button>
  );
}
