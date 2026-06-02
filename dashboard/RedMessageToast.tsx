import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';
import type { Message } from '../../types';
import { useMessageStore } from '../../stores/useMessageStore';

const TOAST_DURATION = 5000; // 5 seconds

export default function RedMessageToast() {
  const messages = useMessageStore((s) => s.messages);
  const markAsRead = useMessageStore((s) => s.markAsRead);

  const [activeToast, setActiveToast] = useState<Message | null>(null);
  const [seenIds, setSeenIds] = useState<Set<string>>(new Set());
  const [isDismissed, setIsDismissed] = useState(false);

  // Watch for new unread red messages
  useEffect(() => {
    const unreadRed = messages
      .filter((m) => m.priority === 'red' && !m.isRead && !seenIds.has(m.id))
      .sort((a, b) => b.timestamp - a.timestamp);

    if (unreadRed.length > 0 && !activeToast) {
      const latest = unreadRed[0];
      setActiveToast(latest);
      setIsDismissed(false);
      setSeenIds((prev) => new Set([...prev, latest.id]));

      // Auto-dismiss after 5 seconds
      const timer = setTimeout(() => {
        dismissToast();
      }, TOAST_DURATION);

      return () => clearTimeout(timer);
    }
  }, [messages, seenIds, activeToast]);

  const dismissToast = () => {
    setIsDismissed(true);
    if (activeToast) {
      markAsRead(activeToast.id);
    }
    // Small delay for exit animation, then remove
    setTimeout(() => setActiveToast(null), 300);
  };

  return (
    <AnimatePresence>
      {activeToast && !isDismissed && (
        <motion.div
          initial={{ y: -120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -120, opacity: 0 }}
          transition={{ type: 'spring', damping: 22, stiffness: 280 }}
          className="fixed top-0 left-0 right-0 z-[60] flex justify-center pointer-events-none"
        >
          <div
            className="pointer-events-auto mt-3 mx-4 w-full max-w-2xl
                       bg-gradient-to-r from-red-600 to-rose-600
                       dark:from-red-800 dark:to-rose-800
                       rounded-xl shadow-2xl shadow-red-500/30
                       dark:shadow-red-900/40
                       border border-red-400/40 dark:border-red-600/40
                       overflow-hidden"
            role="alert"
            aria-live="assertive"
          >
            <div className="flex items-start gap-3 px-5 py-4">
              {/* Icon */}
              <div className="shrink-0 mt-0.5">
                <AlertTriangle size={20} className="text-white animate-pulse" />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-semibold uppercase tracking-wider text-red-200/90">
                    ⚡ 重要紧急
                  </span>
                  {/* Countdown bar */}
                  <div className="flex-1 h-1 bg-red-400/30 rounded-full overflow-hidden max-w-24">
                    <motion.div
                      className="h-full bg-white/70 rounded-full"
                      initial={{ width: '100%' }}
                      animate={{ width: '0%' }}
                      transition={{ duration: TOAST_DURATION / 1000, ease: 'linear' }}
                    />
                  </div>
                </div>
                <p className="text-sm font-semibold text-white truncate">
                  {activeToast.title}
                </p>
                <p className="text-xs text-red-100/80 mt-0.5 line-clamp-1">
                  {activeToast.summary}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs text-red-200/70">
                    {activeToast.sourceApp}
                    {activeToast.sender ? ` · ${activeToast.sender}` : ''}
                  </span>
                </div>
              </div>

              {/* Close button */}
              <button
                onClick={dismissToast}
                className="shrink-0 p-1.5 rounded-lg hover:bg-white/15 transition-colors
                           text-white/70 hover:text-white"
                aria-label="关闭通知"
              >
                <X size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
