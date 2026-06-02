import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import RuleList from './RuleList';
import RuleForm from './RuleForm';
import { useState } from 'react';
import { useRuleStore } from '../../stores/useRuleStore';
import type { Rule } from '../../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function RuleConfigDrawer({ isOpen, onClose }: Props) {
  const rules = useRuleStore((s) => s.rules);
  const addRule = useRuleStore((s) => s.addRule);
  const updateRule = useRuleStore((s) => s.updateRule);
  const deleteRule = useRuleStore((s) => s.deleteRule);
  const toggleRule = useRuleStore((s) => s.toggleRule);

  const [editingRule, setEditingRule] = useState<Rule | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const handleSave = (data: Omit<Rule, 'id'>) => {
    if (editingRule) {
      updateRule(editingRule.id, data);
      setEditingRule(null);
    } else {
      addRule(data);
      setIsAdding(false);
    }
  };

  const handleCancel = () => {
    setEditingRule(null);
    setIsAdding(false);
  };

  const surface = 'bg-[var(--color-zen-surface)] dark:bg-[var(--color-dark-zen-surface)]';
  const borderB = 'border-[var(--color-zen-border)] dark:border-[var(--color-dark-zen-border)]';
  const textPrimary = 'text-[var(--color-zen-text)] dark:text-[var(--color-dark-zen-text)]';
  const textSecondary = 'text-[var(--color-zen-text-secondary)] dark:text-[var(--color-dark-zen-text-secondary)]';
  const textMuted = 'text-[var(--color-zen-text-muted)] dark:text-[var(--color-dark-zen-text-muted)]';
  const hoverBg = 'hover:bg-[var(--color-zen-gray-light)] dark:hover:bg-[var(--color-dark-zen-gray-light)]';

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/30 dark:bg-black/60"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 250 }}
            className={`fixed right-0 top-0 bottom-0 z-50 w-full max-w-md
                       ${surface} shadow-2xl flex flex-col`}
            role="dialog"
            aria-modal="true"
            aria-label="规则配置中心"
          >
            {/* Header */}
            <div className={`flex items-center justify-between px-5 py-4 border-b ${borderB}`}>
              <h3 className={`font-semibold ${textPrimary}`}>
                规则配置中心
              </h3>
              <button
                onClick={onClose}
                className={`p-1.5 rounded-[var(--radius-btn)] ${hoverBg} transition-colors duration-200`}
                aria-label="关闭规则配置"
              >
                <X size={18} className={textSecondary} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-5">
              <p className={`text-xs ${textMuted} mb-4`}>
                规则按顺序匹配，命中即停止。拖动或编辑可调整优先级顺序。
              </p>

              {isAdding || editingRule ? (
                <RuleForm
                  initial={editingRule || undefined}
                  onSave={handleSave}
                  onCancel={handleCancel}
                />
              ) : (
                <RuleList
                  rules={rules}
                  onEdit={(rule) => setEditingRule(rule)}
                  onDelete={deleteRule}
                  onToggle={toggleRule}
                  onAdd={() => setIsAdding(true)}
                />
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
