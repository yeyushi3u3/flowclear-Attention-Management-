import { useState } from 'react';
import type { ScopeLimit } from '../../types';
import { ChevronDown, ChevronRight, X } from 'lucide-react';

interface Props {
  scopeLimit: ScopeLimit;
  onChangeScopeLimit: (sl: ScopeLimit) => void;
  excludeWords: string[];
  onChangeExcludeWords: (words: string[]) => void;
}

export default function AdvancedConfig({
  scopeLimit,
  onChangeScopeLimit,
  excludeWords,
  onChangeExcludeWords,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [excludeInput, setExcludeInput] = useState('');

  const handleAddExclude = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const word = excludeInput.trim().replace(/,/g, '');
      if (word && !excludeWords.includes(word)) {
        onChangeExcludeWords([...excludeWords, word]);
      }
      setExcludeInput('');
    }
  };

  // Style vars with dark mode
  const border = 'border-[var(--color-zen-border)] dark:border-[var(--color-dark-zen-border)]';
  const surface = 'bg-[var(--color-zen-surface)] dark:bg-[var(--color-dark-zen-surface)]';
  const textPrimary = 'text-[var(--color-zen-text)] dark:text-[var(--color-dark-zen-text)]';
  const textSecondary = 'text-[var(--color-zen-text-secondary)] dark:text-[var(--color-dark-zen-text-secondary)]';
  const textMuted = 'text-[var(--color-zen-text-muted)] dark:text-[var(--color-dark-zen-text-muted)]';
  const grayBgHover = 'hover:bg-[var(--color-zen-gray-bg)] dark:hover:bg-[var(--color-dark-zen-gray-bg)]';
  const inputClass = `w-full px-3 py-1.5 text-xs rounded-[var(--radius-btn)] border ${border} ${surface}
                      text-[var(--color-zen-text)] dark:text-[var(--color-dark-zen-text)]
                      placeholder:text-[var(--color-zen-text-muted)] dark:placeholder:text-[var(--color-dark-zen-text-muted)]
                      focus:outline-none focus:ring-2 focus:ring-[var(--color-zen-blue)]/30 dark:focus:ring-[var(--color-dark-zen-blue)]/30
                      focus:border-[var(--color-zen-blue)] dark:focus:border-[var(--color-dark-zen-blue)]`;

  return (
    <div className={`border ${border} rounded-[var(--radius-card)] overflow-hidden`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between px-4 py-3 ${grayBgHover} transition-colors duration-200`}
        aria-expanded={isOpen}
        aria-controls="advanced-config-panel"
      >
        <span className={`text-sm font-medium ${textPrimary}`}>
          高级防误杀配置
        </span>
        {isOpen ? (
          <ChevronDown size={16} className={textMuted} />
        ) : (
          <ChevronRight size={16} className={textMuted} />
        )}
      </button>

      {isOpen && (
        <div id="advanced-config-panel" className="px-4 pb-4 space-y-4">
          {/* Scope limit */}
          <div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={scopeLimit.enabled}
                onChange={(e) =>
                  onChangeScopeLimit({ ...scopeLimit, enabled: e.target.checked })
                }
                className="w-4 h-4 rounded border-[var(--color-zen-border)] dark:border-[var(--color-dark-zen-border)]
                           text-[var(--color-zen-blue)] dark:text-[var(--color-dark-zen-blue)]
                           focus:ring-[var(--color-zen-blue)] dark:focus:ring-[var(--color-dark-zen-blue)]"
              />
              <span className={`text-xs font-medium ${textSecondary}`}>
                仅对特定发件人/群组生效
              </span>
            </label>

            {scopeLimit.enabled && (
              <div className="mt-2 ml-6 space-y-2">
                <input
                  type="text"
                  placeholder="白名单发件人（逗号分隔）"
                  value={scopeLimit.senders.join(', ')}
                  onChange={(e) =>
                    onChangeScopeLimit({
                      ...scopeLimit,
                      senders: e.target.value
                        .split(',')
                        .map((s) => s.trim())
                        .filter(Boolean),
                    })
                  }
                  className={inputClass}
                />
                <input
                  type="text"
                  placeholder="白名单群组（逗号分隔）"
                  value={scopeLimit.groups.join(', ')}
                  onChange={(e) =>
                    onChangeScopeLimit({
                      ...scopeLimit,
                      groups: e.target.value
                        .split(',')
                        .map((s) => s.trim())
                        .filter(Boolean),
                    })
                  }
                  className={inputClass}
                />
              </div>
            )}
          </div>

          {/* Exclude words */}
          <div>
            <label className={`block text-xs font-medium ${textSecondary} mb-1`}>
              排除词（黑名单）
            </label>
            <p className={`text-xs ${textMuted} mb-2`}>
              消息含排除词时，即使命中关键词也将被拦截降级为灰色
            </p>

            <div className="flex flex-wrap gap-1 mb-2">
              {excludeWords.map((ew) => (
                <span
                  key={ew}
                  className="inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded-full
                             bg-[var(--color-zen-red-light)] dark:bg-[var(--color-dark-zen-red-light)]
                             text-[var(--color-zen-red)] dark:text-[var(--color-dark-zen-red)]"
                >
                  {ew}
                  <button
                    onClick={() =>
                      onChangeExcludeWords(excludeWords.filter((w) => w !== ew))
                    }
                    aria-label={`删除排除词：${ew}`}
                  >
                    <X size={12} />
                  </button>
                </span>
              ))}
            </div>

            <input
              type="text"
              value={excludeInput}
              onChange={(e) => setExcludeInput(e.target.value)}
              onKeyDown={handleAddExclude}
              placeholder="输入排除词后按回车（如：物资、广告）"
              className={inputClass}
            />
          </div>
        </div>
      )}
    </div>
  );
}
