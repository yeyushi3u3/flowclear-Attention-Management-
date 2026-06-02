import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../stores/useAppStore';
import { useRuleStore } from '../stores/useRuleStore';
import { useMessageStore } from '../stores/useMessageStore';
import { identityPresets, getPresetByType } from '../data/identityPresets';
import { tutorialMessages } from '../data/tutorialMessages';
import type { IdentityType } from '../types';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Moon, Sun } from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function OnboardingPage() {
  const navigate = useNavigate();
  const isOnboarded = useAppStore((s) => s.isOnboarded);
  const darkMode = useAppStore((s) => s.darkMode);
  const toggleDarkMode = useAppStore((s) => s.toggleDarkMode);
  const completeOnboarding = useAppStore((s) => s.completeOnboarding);
  const applyIdentityPreset = useRuleStore((s) => s.applyIdentityPreset);
  const injectTutorialMessages = useMessageStore((s) => s.injectTutorialMessages);

  // Redirect if already onboarded
  if (isOnboarded) {
    navigate('/dashboard', { replace: true });
    return null;
  }

  const handleSelect = (type: IdentityType) => {
    const preset = getPresetByType(type);
    if (!preset) return;

    completeOnboarding(type);
    applyIdentityPreset(preset);
    injectTutorialMessages(tutorialMessages);
    navigate('/dashboard', { replace: true });
  };

  // Tailwind-incompatible dynamic classes need full class names or custom properties
  const bgClass = 'bg-[var(--color-zen-bg)] dark:bg-[var(--color-dark-zen-bg)]';
  const surfaceClass = 'bg-[var(--color-zen-surface)] dark:bg-[var(--color-dark-zen-surface)]';
  const borderClass = 'border-[var(--color-zen-border)] dark:border-[var(--color-dark-zen-border)]';
  const textPrimary = 'text-[var(--color-zen-text)] dark:text-[var(--color-dark-zen-text)]';
  const textSecondary = 'text-[var(--color-zen-text-secondary)] dark:text-[var(--color-dark-zen-text-secondary)]';
  const textMuted = 'text-[var(--color-zen-text-muted)] dark:text-[var(--color-dark-zen-text-muted)]';
  const blueClass = 'text-[var(--color-zen-blue)] dark:text-[var(--color-dark-zen-blue)]';
  const hoverBlue = 'hover:border-[var(--color-zen-blue)] dark:hover:border-[var(--color-dark-zen-blue)]';

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center px-6 py-16 ${bgClass} transition-colors duration-300`}>
      {/* Dark mode toggle (top right) */}
      <button
        onClick={toggleDarkMode}
        className={`absolute top-4 right-4 flex items-center justify-center w-10 h-10 rounded-[var(--radius-btn)]
                   ${textSecondary} hover:bg-[var(--color-zen-gray-light)] dark:hover:bg-[var(--color-dark-zen-gray-light)]
                   transition-colors duration-200`}
        title={darkMode ? '切换亮色模式' : '切换暗色模式'}
        aria-label={darkMode ? '切换到亮色模式' : '切换到暗色模式'}
      >
        {darkMode ? <Sun size={18} /> : <Moon size={18} />}
      </button>

      {/* Logo & Tagline */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className={`text-5xl font-light tracking-tight ${textPrimary} mb-4`}>
          静流{' '}
          <span className={`text-[var(--color-zen-gray)] dark:text-[var(--color-dark-zen-gray)] font-normal text-2xl`}>
            FlowClear
          </span>
        </h1>
        <p className={`text-lg ${textSecondary} max-w-md mx-auto leading-relaxed`}>
          选择你的身份，静流为你配置专属信息过滤规则
        </p>
      </motion.div>

      {/* Identity Cards */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 max-w-5xl w-full"
      >
        {identityPresets.map((preset) => (
          <motion.button
            key={preset.type}
            variants={item}
            onClick={() => handleSelect(preset.type)}
            className={`group relative flex flex-col items-center gap-4 p-6 rounded-[var(--radius-card)]
                       ${surfaceClass} border ${borderClass}
                       ${hoverBlue} hover:shadow-lg dark:hover:shadow-2xl
                       transition-all duration-300 cursor-pointer text-left`}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
            aria-label={`选择${preset.label}身份：${preset.tagline}`}
          >
            <span className="text-5xl" aria-hidden="true">{preset.emoji}</span>
            <div className="text-center">
              <h3 className={`font-semibold ${textPrimary} text-base mb-1`}>
                {preset.label}
              </h3>
              <p className={`text-xs ${textMuted} leading-relaxed`}>
                {preset.description}
              </p>
            </div>
            <div className={`flex items-center gap-1 text-xs ${blueClass} opacity-0 group-hover:opacity-100 transition-opacity duration-200`}>
              <Sparkles size={12} aria-hidden="true" />
              <span>{preset.tagline}</span>
              <ArrowRight size={12} aria-hidden="true" />
            </div>
          </motion.button>
        ))}
      </motion.div>

      {/* Footer */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className={`mt-12 text-sm ${textMuted}`}
      >
        你的数据仅保存在本地 · 随时可重置
      </motion.p>
    </div>
  );
}
