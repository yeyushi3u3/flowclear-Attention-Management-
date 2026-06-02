import type { Message, PriorityColor } from '../../types';
import MessageCard from './MessageCard';
import { AnimatePresence } from 'framer-motion';

interface Props {
  messages: Message[];
  onDelete: (id: string) => void;
}

const quadrants: { color: PriorityColor; label: string; subtitle: string }[] = [
  { color: 'red', label: '重要紧急', subtitle: '即时通知' },
  { color: 'blue', label: '重要不紧急', subtitle: '安排时间处理' },
  { color: 'yellow', label: '紧急不重要', subtitle: '可委托或快速处理' },
  { color: 'gray', label: '不重要不紧急', subtitle: '静默沉淀' },
];

const lightBg: Record<PriorityColor, string> = {
  red: 'bg-[var(--color-zen-red-bg)]',
  blue: 'bg-[var(--color-zen-blue-bg)]',
  yellow: 'bg-[var(--color-zen-yellow-bg)]',
  gray: 'bg-[var(--color-zen-gray-bg)]',
};

const darkBg: Record<PriorityColor, string> = {
  red: 'dark:bg-[var(--color-dark-zen-red-bg)]',
  blue: 'dark:bg-[var(--color-dark-zen-blue-bg)]',
  yellow: 'dark:bg-[var(--color-dark-zen-yellow-bg)]',
  gray: 'dark:bg-[var(--color-dark-zen-gray-bg)]',
};

const lightAccent: Record<PriorityColor, string> = {
  red: 'text-[var(--color-zen-red)]',
  blue: 'text-[var(--color-zen-blue)]',
  yellow: 'text-[var(--color-zen-yellow)]',
  gray: 'text-[var(--color-zen-gray)]',
};

const darkAccent: Record<PriorityColor, string> = {
  red: 'dark:text-[var(--color-dark-zen-red)]',
  blue: 'dark:text-[var(--color-dark-zen-blue)]',
  yellow: 'dark:text-[var(--color-dark-zen-yellow)]',
  gray: 'dark:text-[var(--color-dark-zen-gray)]',
};

export default function KanbanView({ messages, onDelete }: Props) {
  const borderClass = 'border-[var(--color-zen-border)] dark:border-[var(--color-dark-zen-border)]';
  const textMuted = 'text-[var(--color-zen-text-muted)] dark:text-[var(--color-dark-zen-text-muted)]';

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 min-h-[70vh]">
      {quadrants.map((q) => {
        const filtered = messages.filter((m) => m.priority === q.color);
        return (
          <div
            key={q.color}
            className={`flex flex-col rounded-[var(--radius-lg)] ${lightBg[q.color]} ${darkBg[q.color]}
                        border ${borderClass} overflow-hidden transition-colors duration-200`}
          >
            {/* Quadrant header */}
            <div className={`px-4 py-3 border-b ${borderClass}/50`}>
              <div className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: `var(--color-zen-${q.color})` }}
                />
                <h3 className={`font-semibold text-sm ${lightAccent[q.color]} ${darkAccent[q.color]}`}>
                  {q.label}
                </h3>
                <span className={`text-xs ${textMuted} ml-auto`}>
                  {filtered.length} 条
                </span>
              </div>
              <p className={`text-xs ${textMuted} mt-0.5 ml-5`}>
                {q.subtitle}
              </p>
            </div>

            {/* Quadrant content */}
            <div className="flex-1 p-3 overflow-y-auto max-h-[55vh]">
              {filtered.length === 0 ? (
                <div className={`flex items-center justify-center h-24 text-xs ${textMuted}`}>
                  暂无消息
                </div>
              ) : (
                <AnimatePresence mode="popLayout">
                  {filtered
                    .sort((a, b) => b.timestamp - a.timestamp)
                    .map((msg) => (
                      <MessageCard key={msg.id} message={msg} variant="kanban" onDelete={onDelete} />
                    ))}
                </AnimatePresence>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
