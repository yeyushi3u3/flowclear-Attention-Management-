import { AnimatePresence, motion } from 'framer-motion';
import { useAppStore } from '../../stores/useAppStore';
import { ArrowUpRight, Hand } from 'lucide-react';

export default function TutorialOverlay() {
  const tutorialPhase = useAppStore((s) => s.tutorialPhase);

  const surface = 'bg-[var(--color-zen-surface)] dark:bg-[var(--color-dark-zen-surface)]';
  const borderBlue = 'border-[var(--color-zen-blue)] dark:border-[var(--color-dark-zen-blue)]';
  const textPrimary = 'text-[var(--color-zen-text)] dark:text-[var(--color-dark-zen-text)]';
  const textSecondary = 'text-[var(--color-zen-text-secondary)] dark:text-[var(--color-dark-zen-text-secondary)]';
  const textMuted = 'text-[var(--color-zen-text-muted)] dark:text-[var(--color-dark-zen-text-muted)]';

  return (
    <AnimatePresence>
      {tutorialPhase === 'tutorial' && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          className="fixed top-16 right-4 md:right-6 z-50 max-w-xs"
          role="alertdialog"
          aria-label="使用引导"
        >
          <div
            className={`relative ${surface} border ${borderBlue}
                        rounded-[var(--radius-card)] p-4 shadow-lg`}
          >
            {/* Arrow pointing up-right toward the switch button */}
            <div className={`absolute -top-2 right-6 w-3 h-3 rotate-45
                            ${surface} border-l border-t ${borderBlue}`}
                 aria-hidden="true" />

            <div className="flex items-start gap-3">
              {/* Hand icon instead of emoji wave */}
              <Hand size={22} className="shrink-0 text-[var(--color-zen-blue)] dark:text-[var(--color-dark-zen-blue)]" aria-hidden="true" />
              <div className="flex-1">
                <p className={`text-sm font-medium ${textPrimary} mb-1`}>
                  欢迎使用静流！
                </p>
                <p className={`text-xs ${textSecondary} leading-relaxed mb-3`}>
                  已为你准备了 3 条演示消息。
                  <br />
                  点击右上角
                  <span className="inline-flex items-center gap-0.5 mx-0.5 px-1.5 py-0.5 rounded
                                   bg-[var(--color-zen-text)] dark:bg-[var(--color-dark-zen-text)]
                                   text-white dark:text-[var(--color-dark-zen-bg)] text-xs font-medium">
                    切换视图 <ArrowUpRight size={10} aria-hidden="true" />
                  </span>
                  按钮，体验看板与时间轴两种信息浏览方式。
                </p>
                <p className={`text-xs ${textMuted}`}>
                  切换后教程消息将自动清除
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
