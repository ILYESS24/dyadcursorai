import { classNames } from '../../utils/classNames';

export interface SliderOption<T> {
  value: T;
  text: string;
}

export interface SliderOptions<T> {
  left: SliderOption<T>;
  right: SliderOption<T>;
}

interface SliderProps<T> {
  selected: T;
  options: SliderOptions<T>;
  setSelected: (value: T) => void;
}

export default function Slider<T>({ selected, options, setSelected }: SliderProps<T>) {
  const isLeftSelected = selected === options.left.value;

  return (
    <div className="flex bg-bolt-elements-background-depth-1 border border-bolt-elements-borderColor rounded-md p-1">
      <button
        className={classNames(
          'px-3 py-1 text-sm rounded transition-theme',
          {
            'bg-bolt-elements-item-backgroundAccent text-bolt-elements-item-contentAccent': isLeftSelected,
            'text-bolt-elements-textSecondary hover:text-bolt-elements-textPrimary': !isLeftSelected,
          }
        )}
        onClick={() => setSelected(options.left.value)}
      >
        {options.left.text}
      </button>
      <button
        className={classNames(
          'px-3 py-1 text-sm rounded transition-theme',
          {
            'bg-bolt-elements-item-backgroundAccent text-bolt-elements-item-contentAccent': !isLeftSelected,
            'text-bolt-elements-textSecondary hover:text-bolt-elements-textPrimary': isLeftSelected,
          }
        )}
        onClick={() => setSelected(options.right.value)}
      >
        {options.right.text}
      </button>
    </div>
  );
}
