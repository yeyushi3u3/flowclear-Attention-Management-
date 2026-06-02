import type { Message } from '../../types';
import { getTimeBucket } from '../../utils/dateFormat';
import MessageCard from './MessageCard';
import { AlertTriangle } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

interface Props {
  messages: Message[];
  onDelete: (id: string) => void;
}

export default function TimelineView({ messages, onDelete }: Props) {
  const sorted = [...messages].sort((a, b) => b.timestamp - a.timestamp);

  // Group messages: red messages as "today focus", others by time bucket
  const redMessages = sorted.filter((m) => m.priority === 'red');
  const otherMessages = sorted.filter((m) => m.priority !== 'red');

  // Group others by time bucket
  const buckets = new Map<string, Message[]>();
  for (const msg of otherMessages) {
    const bucket = getTimeBucket(msg.timestamp);
    if (!buckets.has(bucket)) buckets.set(bucket, []);
    buckets.get(bucket)!.push(msg);
  }

  const textMuted = 'text-[var(--color-zen-text-muted)] dark:text-[var(--color-dark-zen-text-muted)]';
  const borderClass = 'border-[var(--color-zen-border)] dark:border-[var(--color-dark-zen-border)]';

  return (
    <div className="max-w-2xl mx-auto">
      {/* Today's Focus — red messages */}
      {redMessages.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle size={18} className="text-[var(--color-zen-red)] dark:text-[var(--color-dark-zen-red)]" />
            <h3 className="font-semibold text-[var(--color-zen-red)] dark:text-[var(--color-dark-zen-red)]">
              今日焦点 · 需要立即处理
            </h3>
            <span className={`text-xs ${textMuted}`}>
              {redMessages.length} 条
            </span>
          </div>

          <div className="relative pl-8 border-l-2 border-[var(--color-zen-red)]/30 dark:border-[var(--color-dark-zen-red)]/30">
            <AnimatePresence mode="popLayout">
              {redMessages.map((msg) => (
                <MessageCard key={msg.id} message={msg} variant="timeline" onDelete={onDelete} />
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* Time-grouped messages */}
      {Array.from(buckets.entries()).map(([bucket, msgs]) => (
        <div key={bucket} className="mb-8">
          <h3 className={`text-sm font-medium ${textMuted} mb-4 pl-8`}>
            {bucket}
          </h3>
          <div className={`relative pl-8 border-l-2 ${borderClass}`}>
            <AnimatePresence mode="popLayout">
              {msgs.map((msg) => (
                <MessageCard key={msg.id} message={msg} variant="timeline" onDelete={onDelete} />
              ))}
            </AnimatePresence>
          </div>
        </div>
      ))}

      {/* Empty fallback */}
      {redMessages.length === 0 && buckets.size === 0 && (
        <div className={`flex items-center justify-center h-48 text-sm ${textMuted}`}>
          暂无消息
        </div>
      )}
    </div>
  );
}
