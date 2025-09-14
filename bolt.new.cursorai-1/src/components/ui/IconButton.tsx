import { classNames } from '../../utils/classNames';

interface IconButtonProps {
  icon: string;
  onClick?: () => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  disabled?: boolean;
  title?: string;
  children?: React.ReactNode;
}

export default function IconButton({
  icon,
  onClick,
  className,
  size = 'md',
  disabled = false,
  title,
  children,
}: IconButtonProps) {
  const sizeClasses = {
    sm: 'p-1.5 text-sm',
    md: 'p-2 text-base',
    lg: 'p-2.5 text-lg',
    xl: 'p-3 text-xl',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={classNames(
        'inline-flex items-center justify-center rounded-md transition-theme',
        'hover:bg-bolt-elements-item-backgroundAccent',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'focus:outline-none focus:ring-2 focus:ring-bolt-elements-item-contentAccent focus:ring-offset-2',
        sizeClasses[size],
        className,
      )}
    >
      <div className={icon} />
      {children}
    </button>
  );
}
