import { motion } from 'framer-motion';
import { Waves } from 'lucide-react';

export default function EmptyState() {
  const textMuted = 'text-[var(--color-zen-text-muted)] dark:text-[var(--color-dark-zen-text-muted)]';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col items-center justify-center min-h-[70vh] gap-6"
      role="status"
      aria-label="暂无新消息"
    >
      <motion.div
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="flex flex-col items-center gap-6"
      >
        <Waves size={64} className={`${textMuted} opacity-40`} aria-hidden="true" />
        <p
          className={`text-2xl font-light ${textMuted} text-center leading-relaxed max-w-md`}
          style={{ opacity: 0.5 }}
        >
          暂无新消息流入
          <br />
          世界很安静，请继续保持专注。
        </p>
      </motion.div>
    </motion.div>
  );
}
