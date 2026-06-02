import type { Rule } from '../../types';
import PriorityBadge from '../common/PriorityBadge';
import { Pencil, Trash2, Plus, ToggleLeft, ToggleRight } from 'lucide-react';

interface Props {
  rules: Rule[];
  onEdit: (rule: Rule) => void;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
  onAdd: () => void;
}

export default function RuleList({ rules, onEdit, onDelete, onToggle, onAdd }: Props) {
  const border = 'border-[var(--color-zen-border)] dark:border-[var(--color-dark-zen-border)]';
  const surface = 'bg-[var(--color-zen-surface)] dark:bg-[var(--color-dark-zen-surface)]';
  const grayBg = 'bg-[var(--color-zen-gray-bg)] dark:bg-[var(--color-dark-zen-gray-bg)]';
  const textPrimary = 'text-[var(--color-zen-text)] dark:text-[var(--color-dark-zen-text)]';
  const textSecondary = 'text-[var(--color-zen-text-secondary)] dark:text-[var(--color-dark-zen-text-secondary)]';
  const textMuted = 'text-[var(--color-zen-text-muted)] dark:text-[var(--color-dark-zen-text-muted)]';
  const hoverGray = 'hover:bg-[var(--color-zen-gray-light)] dark:hover:bg-[var(--color-dark-zen-gray-light)]';
  const hoverRed = 'hover:bg-[var(--color-zen-red-light)] dark:hover:bg-[var(--color-dark-zen-red-light)]';
  const blueText = 'text-[var(--color-zen-blue)] dark:text-[var(--color-dark-zen-blue)]';
  const hoverBlue = 'hover:border-[var(--color-zen-blue)] dark:hover:border-[var(--color-dark-zen-blue)]';
  const grayChip = 'bg-[var(--color-zen-gray-light)] dark:bg-[var(--color-dark-zen-gray-light)]';

  return (
    <div className="space-y-3">
      {/* Add button */}
      <button
        onClick={onAdd}
        className={`w-full flex items-center justify-center gap-2 py-3
                   border-2 border-dashed ${border}
                   rounded-[var(--radius-card)] text-sm ${textSecondary}
                   ${hoverBlue} ${blueText}
                   transition-colors duration-200 cursor-pointer min-h-[44px]`}
        aria-label="添加新规则"
      >
        <Plus size={16} aria-hidden="true" />
        添加新规则
      </button>

      {/* Rule items */}
      {rules.length === 0 ? (
        <p className={`text-center text-sm ${textMuted} py-8`}>
          还没有规则，点击上方按钮添加
        </p>
      ) : (
        rules.map((rule) => (
          <div
            key={rule.id}
            className={`p-4 rounded-[var(--radius-card)] border transition-all duration-200
              ${rule.isActive
                ? `${border} ${surface}`
                : `${border} ${grayBg} opacity-60`
              }`}
          >
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex-1 min-w-0">
                <h4 className={`text-sm font-medium ${textPrimary} truncate`}>
                  {rule.name}
                </h4>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => onToggle(rule.id)}
                  className={`p-1 rounded ${hoverGray} transition-colors duration-200 min-h-[36px] min-w-[36px] flex items-center justify-center`}
                  title={rule.isActive ? '停用规则' : '启用规则'}
                  aria-label={rule.isActive ? `停用规则：${rule.name}` : `启用规则：${rule.name}`}
                >
                  {rule.isActive ? (
                    <ToggleRight size={18} className="text-[var(--color-zen-blue)] dark:text-[var(--color-dark-zen-blue)]" />
                  ) : (
                    <ToggleLeft size={18} className={textMuted} />
                  )}
                </button>
                <button
                  onClick={() => onEdit(rule)}
                  className={`p-1 rounded ${hoverGray} transition-colors duration-200 min-h-[36px] min-w-[36px] flex items-center justify-center`}
                  aria-label={`编辑规则：${rule.name}`}
                >
                  <Pencil size={15} className={textSecondary} />
                </button>
                <button
                  onClick={() => onDelete(rule.id)}
                  className={`p-1 rounded ${hoverRed} transition-colors duration-200 min-h-[36px] min-w-[36px] flex items-center justify-center`}
                  aria-label={`删除规则：${rule.name}`}
                >
                  <Trash2 size={15} className="text-[var(--color-zen-red)] dark:text-[var(--color-dark-zen-red)]" />
                </button>
              </div>
            </div>

            {/* Keywords */}
            <div className="flex items-center gap-1.5 flex-wrap mb-2">
              {rule.keywords.map((kw) => (
                <span
                  key={kw}
                  className={`px-2 py-0.5 text-xs rounded-full ${grayChip} ${textSecondary}`}
                >
                  {kw}
                </span>
              ))}
              <PriorityBadge priority={rule.targetPriority} />
            </div>

            {/* Advanced info */}
            {(rule.scopeLimit.enabled || rule.excludeWords.length > 0) && (
              <div className={`text-xs ${textMuted} space-y-0.5 mt-1`}>
                {rule.scopeLimit.enabled && (
                  <p>范围限定：仅特定发件人/群组</p>
                )}
                {rule.excludeWords.length > 0 && (
                  <p>排除词：{rule.excludeWords.join('、')}</p>
                )}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}
