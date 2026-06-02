import { Settings, LayoutGrid, Clock, Play, Pause, Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';
import type { ViewMode } from '../../types';
import { useAppStore } from '../../stores/useAppStore';
import { useMessageStore } from '../../stores/useMessageStore';
import { useRuleStore } from '../../stores/useRuleStore';

interface Props {
  viewMode: ViewMode;
  onViewSwitch: () => void;
  onOpenRules: () => void;
  isSimulating: boolean;
  onToggleSimulation: () => void;
}

export default function DashboardHeader({
  viewMode,
  onViewSwitch,
  onOpenRules,
  isSimulating,
  onToggleSimulation,
}: Props) {
  const resetAll = useAppStore((s) => s.resetAll);
  const darkMode = useAppStore((s) => s.darkMode);
  const toggleDarkMode = useAppStore((s) => s.toggleDarkMode);
  const clearAllMessages = useMessageStore((s) => s.clearAllMessages);
  const clearAllRules = useRuleStore((s) => s.clearAllRules);

  const handleReset = () => {
    if (window.confirm('确定要重置所有数据并重新开始引导流程吗？')) {
      clearAllMessages();
      clearAllRules();
      resetAll();
      window.location.href = '/';
    }
  };

  const colorText = 'text-[var(--color-zen-text-secondary)] dark:text-[var(--color-dark-zen-text-secondary)]';
  const hoverBg = 'hover:bg-[var(--color-zen-gray-light)] dark:hover:bg-[var(--color-dark-zen-gray-light)]';
  const surfaceBg = 'bg-[var(--color-zen-surface)]/90 dark:bg-[var(--color-dark-zen-surface)]/90';
  const borderB = 'border-b border-[var(--color-zen-border)] dark:border-[var(--color-dark-zen-border)]';
  const textPrimary = 'text-[var(--color-zen-text)] dark:text-[var(--color-dark-zen-text)]';
  const textMuted = 'text-[var(--color-zen-text-muted)] dark:text-[var(--color-dark-zen-text-muted)]';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 h-14 flex items-center justify-between
                 px-4 md:px-6 ${surfaceBg} backdrop-blur-md ${borderB}`}
    >
      {/* Left: Logo */}
      <div className="flex items-center gap-3">
        <h1 className={`text-lg font-medium ${textPrimary} tracking-tight`}>
          静流
          <span className={`text-sm font-normal ${textMuted} ml-2 hidden sm:inline`}>
            FlowClear
          </span>
        </h1>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-1">
        {/* Dark mode toggle */}
        <button
          onClick={toggleDarkMode}
          className={`flex items-center justify-center w-9 h-9 min-w-[36px] min-h-[36px] rounded-[var(--radius-btn)]
                     ${colorText} ${hoverBg} transition-colors duration-200`}
          title={darkMode ? '切换亮色模式' : '切换暗色模式'}
          aria-label={darkMode ? '切换到亮色模式' : '切换到暗色模式'}
        >
          {darkMode ? <Sun size={16} /> : <Moon size={16} />}
        </button>

        {/* Simulation toggle */}
        <button
          onClick={onToggleSimulation}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 min-h-[36px] rounded-[var(--radius-btn)]
                     text-xs ${colorText} ${hoverBg} transition-colors duration-200`}
          title={isSimulating ? '暂停模拟' : '开始模拟'}
          aria-label={isSimulating ? '暂停消息模拟' : '开始消息模拟'}
        >
          {isSimulating ? <Pause size={14} /> : <Play size={14} />}
          <span className="hidden sm:inline">{isSimulating ? '模拟中' : '已暂停'}</span>
        </button>

        {/* Rule Settings */}
        <button
          onClick={onOpenRules}
          className={`flex items-center gap-1.5 px-3 py-1.5 min-h-[36px] rounded-[var(--radius-btn)]
                     text-sm ${colorText} ${hoverBg} transition-colors duration-200`}
          aria-label="打开规则配置"
        >
          <Settings size={16} />
          <span className="hidden sm:inline">规则设置</span>
        </button>

        {/* View Switch */}
        <motion.button
          id="view-switch-btn"
          onClick={onViewSwitch}
          className="relative flex items-center gap-1.5 px-3 py-1.5 min-h-[36px] rounded-[var(--radius-btn)]
                     bg-[var(--color-zen-text)] dark:bg-[var(--color-dark-zen-text)] text-white
                     dark:text-[var(--color-dark-zen-bg)]
                     text-sm font-medium transition-colors duration-200
                     hover:bg-[var(--color-zen-text-secondary)] dark:hover:bg-[var(--color-dark-zen-text-secondary)]"
          whileTap={{ scale: 0.95 }}
          aria-label={viewMode === 'kanban' ? '切换到时间轴视图' : '切换到看板视图'}
        >
          {viewMode === 'kanban' ? (
            <>
              <LayoutGrid size={16} />
              <span className="hidden sm:inline">看板</span>
            </>
          ) : (
            <>
              <Clock size={16} />
              <span className="hidden sm:inline">时间轴</span>
            </>
          )}
        </motion.button>

        {/* Reset */}
        <button
          onClick={handleReset}
          className={`ml-1 text-xs ${textMuted} hover:text-[var(--color-zen-red)]
                     dark:hover:text-[var(--color-dark-zen-red)] transition-colors duration-200 px-1 min-h-[36px]`}
          title="重置演示"
          aria-label="重置所有数据"
        >
          重置
        </button>
      </div>
    </header>
  );
}
