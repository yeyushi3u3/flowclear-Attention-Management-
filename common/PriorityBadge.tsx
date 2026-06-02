import type { PriorityColor } from '../../types';

const labels: Record<PriorityColor, string> = {
  red: '重要紧急',
  blue: '重要不紧急',
  yellow: '紧急不重要',
  gray: '不重要不紧急',
};

const lightColors: Record<PriorityColor, string> = {
  red: 'bg-[var(--color-zen-red-light)] text-[var(--color-zen-red)]',
  blue: 'bg-[var(--color-zen-blue-light)] text-[var(--color-zen-blue)]',
  yellow: 'bg-[var(--color-zen-yellow-light)] text-[var(--color-zen-yellow)]',
  gray: 'bg-[var(--color-zen-gray-light)] text-[var(--color-zen-gray)]',
};

const darkColors: Record<PriorityColor, string> = {
  red: 'dark:bg-[var(--color-dark-zen-red-light)] dark:text-[var(--color-dark-zen-red)]',
  blue: 'dark:bg-[var(--color-dark-zen-blue-light)] dark:text-[var(--color-dark-zen-blue)]',
  yellow: 'dark:bg-[var(--color-dark-zen-yellow-light)] dark:text-[var(--color-dark-zen-yellow)]',
  gray: 'dark:bg-[var(--color-dark-zen-gray-light)] dark:text-[var(--color-dark-zen-gray)]',
};

interface Props {
  priority: PriorityColor;
  showLabel?: boolean;
  size?: 'sm' | 'md';
}

export default function PriorityBadge({ priority, showLabel = false, size = 'sm' }: Props) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-medium
        ${lightColors[priority]} ${darkColors[priority]}
        ${size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm'}
      `}
    >
      <span
        className={`rounded-full ${size === 'sm' ? 'w-1.5 h-1.5' : 'w-2 h-2'}`}
        style={{ backgroundColor: `var(--color-zen-${priority})` }}
        aria-hidden="true"
      />
      {showLabel && labels[priority]}
    </span>
  );
}
