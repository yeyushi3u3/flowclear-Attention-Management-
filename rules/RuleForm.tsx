import { useState, useRef } from 'react';
import type { Rule, PriorityColor } from '../../types';
import PriorityBadge from '../common/PriorityBadge';
import AdvancedConfig from './AdvancedConfig';
import { Save, X, AlertCircle } from 'lucide-react';

interface Props {
  initial?: Rule;
  onSave: (data: Omit<Rule, 'id'>) => void;
  onCancel: () => void;
}

const priorityOptions: { value: PriorityColor; label: string }[] = [
  { value: 'red', label: '红色·重要紧急' },
  { value: 'blue', label: '蓝色·重要不紧急' },
  { value: 'yellow', label: '黄色·紧急不重要' },
  { value: 'gray', label: '灰色·不重要不紧急' },
];

export default function RuleForm({ initial, onSave, onCancel }: Props) {
  const [name, setName] = useState(initial?.name || '');
  const [keywordInput, setKeywordInput] = useState('');
  const [keywords, setKeywords] = useState<string[]>(initial?.keywords || []);
  const [targetPriority, setTargetPriority] = useState<PriorityColor>(
    initial?.targetPriority || 'red'
  );
  const [scopeLimit, setScopeLimit] = useState(
    initial?.scopeLimit || { enabled: false, senders: [], groups: [] }
  );
  const [excludeWords, setExcludeWords] = useState<string[]>(initial?.excludeWords || []);
  const [showError, setShowError] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);

  const addKeyword = () => {
    const kw = keywordInput.trim().replace(/,/g, '');
    if (kw && !keywords.includes(kw)) {
      setKeywords((prev) => [...prev, kw]);
    }
    setKeywordInput('');
    setShowError(false);
  };

  const handleKeywordKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addKeyword();
    }
  };

  const removeKeyword = (kw: string) => {
    setKeywords(keywords.filter((k) => k !== kw));
    setShowError(false);
  };

  const handleSave = () => {
    const nameOk = name.trim().length > 0;
    const kwOk = keywords.length > 0;

    if (!nameOk || !kwOk) {
      setShowError(true);
      if (!nameOk) nameRef.current?.focus();
      return;
    }

    setShowError(false);
    onSave({
      name: name.trim(),
      keywords,
      targetPriority,
      scopeLimit,
      excludeWords,
      isActive: initial?.isActive ?? true,
    });
  };

  const canSave = name.trim().length > 0 && keywords.length > 0;

  // Styling
  const textPrimary = 'text-[var(--color-zen-text)] dark:text-[var(--color-dark-zen-text)]';
  const textSecondary = 'text-[var(--color-zen-text-secondary)] dark:text-[var(--color-dark-zen-text-secondary)]';
  const border = 'border-[var(--color-zen-border)] dark:border-[var(--color-dark-zen-border)]';
  const inputBg = `bg-[var(--color-zen-surface)] dark:bg-[var(--color-dark-zen-surface)]`;
  const inputText = `text-[var(--color-zen-text)] dark:text-[var(--color-dark-zen-text)]`;
  const placeholderColor = `placeholder:text-[var(--color-zen-text-muted)] dark:placeholder:text-[var(--color-dark-zen-text-muted)]`;
  const focusRing = `focus:outline-none focus:ring-2 focus:ring-[var(--color-zen-blue)]/30 dark:focus:ring-[var(--color-dark-zen-blue)]/30 focus:border-[var(--color-zen-blue)] dark:focus:border-[var(--color-dark-zen-blue)]`;
  const blueChip = 'bg-[var(--color-zen-blue-light)] dark:bg-[var(--color-dark-zen-blue-light)] text-[var(--color-zen-blue)] dark:text-[var(--color-dark-zen-blue)]';
  const inputClass = `w-full px-3 py-2 text-sm rounded-[var(--radius-btn)] border ${border} ${inputBg} ${inputText} ${placeholderColor} ${focusRing}`;

  return (
    <div className="space-y-4">
      <h4 className={`text-sm font-semibold ${textPrimary}`}>
        {initial ? '编辑规则' : '新建规则'}
      </h4>

      {/* Rule name */}
      <div>
        <label htmlFor="rule-name" className={`block text-xs font-medium ${textSecondary} mb-1`}>
          规则名称 <span className="text-[var(--color-zen-red)]">*</span>
        </label>
        <input
          ref={nameRef}
          id="rule-name"
          type="text"
          value={name}
          onChange={(e) => { setName(e.target.value); setShowError(false); }}
          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleSave(); } }}
          placeholder="例如：工作紧急消息"
          className={inputClass}
          autoFocus
        />
      </div>

      {/* Keywords */}
      <div>
        <label htmlFor="rule-keywords" className={`block text-xs font-medium ${textSecondary} mb-1`}>
          关键词 <span className="text-[var(--color-zen-red)]">*</span>
          <span className={`text-xs text-[var(--color-zen-text-muted)] dark:text-[var(--color-dark-zen-text-muted)] ml-1`}>
            （输入后按回车添加）
          </span>
        </label>
        <div className="flex flex-wrap gap-1.5 mb-2 min-h-[28px]" id="keyword-chips">
          {keywords.map((kw) => (
            <span
              key={kw}
              className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full ${blueChip}`}
            >
              {kw}
              <button type="button" onClick={() => removeKeyword(kw)} aria-label={`删除关键词：${kw}`}>
                <X size={12} />
              </button>
            </span>
          ))}
        </div>
        <input
          id="rule-keywords"
          type="text"
          value={keywordInput}
          onChange={(e) => setKeywordInput(e.target.value)}
          onKeyDown={handleKeywordKeyDown}
          placeholder="输入关键词后按回车添加"
          className={inputClass}
        />
      </div>

      {/* Priority */}
      <fieldset>
        <legend className={`block text-xs font-medium ${textSecondary} mb-2`}>
          匹配后设为
        </legend>
        <div className="grid grid-cols-2 gap-2">
          {priorityOptions.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setTargetPriority(opt.value)}
              className={`flex items-center gap-2 px-3 py-2 text-xs rounded-[var(--radius-btn)]
                          border transition-colors duration-200 cursor-pointer
                          ${targetPriority === opt.value
                            ? 'border-[var(--color-zen-blue)] dark:border-[var(--color-dark-zen-blue)] bg-[var(--color-zen-blue-light)] dark:bg-[var(--color-dark-zen-blue-light)]'
                            : `${border} hover:border-[var(--color-zen-gray)] dark:hover:border-[var(--color-dark-zen-gray)]`
                          }`}
            >
              <PriorityBadge priority={opt.value} />
              <span className={textSecondary}>{opt.label}</span>
            </button>
          ))}
        </div>
      </fieldset>

      {/* Advanced config */}
      <AdvancedConfig
        scopeLimit={scopeLimit}
        onChangeScopeLimit={setScopeLimit}
        excludeWords={excludeWords}
        onChangeExcludeWords={setExcludeWords}
      />

      {/* Validation error */}
      {showError && (
        <div className="flex items-center gap-2 px-3 py-2 rounded-[var(--radius-btn)]
                        bg-[var(--color-zen-red-light)] dark:bg-[var(--color-dark-zen-red-light)]
                        text-xs text-[var(--color-zen-red)] dark:text-[var(--color-dark-zen-red)]"
             role="alert">
          <AlertCircle size={14} />
          <span>请填写规则名称并添加至少一个关键词</span>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-2 pt-2">
        <button
          type="button"
          onClick={handleSave}
          className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium min-h-[40px]
                     rounded-[var(--radius-btn)] cursor-pointer
                     bg-[var(--color-zen-text)] dark:bg-[var(--color-dark-zen-text)]
                     text-white dark:text-[var(--color-dark-zen-bg)]
                     hover:bg-[var(--color-zen-text-secondary)] dark:hover:bg-[var(--color-dark-zen-text-secondary)]
                     transition-colors duration-200
                     ${!canSave ? 'opacity-40' : ''}`}
        >
          <Save size={14} aria-hidden="true" />
          保存规则
        </button>
        <button
          type="button"
          onClick={onCancel}
          className={`px-4 py-2 text-sm min-h-[40px] cursor-pointer ${textSecondary} hover:${textPrimary} transition-colors duration-200`}
        >
          取消
        </button>
      </div>
    </div>
  );
}
