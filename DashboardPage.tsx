import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useAppStore } from '../stores/useAppStore';
import { useMessageStore } from '../stores/useMessageStore';
import { notifyRedMessage } from '../utils/notifications';
import { getSimulatedMessage } from '../data/mockMessages';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import KanbanView from '../components/dashboard/KanbanView';
import TimelineView from '../components/dashboard/TimelineView';
import RedMessageToast from '../components/dashboard/RedMessageToast';
import TutorialOverlay from '../components/tutorial/TutorialOverlay';
import RuleConfigDrawer from '../components/rules/RuleConfigDrawer';
import EmptyState from '../components/common/EmptyState';

const SIMULATION_INTERVAL = 25000; // 25 seconds

export default function DashboardPage() {
  const navigate = useNavigate();
  const isOnboarded = useAppStore((s) => s.isOnboarded);
  const viewMode = useAppStore((s) => s.viewMode);
  const tutorialPhase = useAppStore((s) => s.tutorialPhase);
  const setViewMode = useAppStore((s) => s.setViewMode);
  const setTutorialPhase = useAppStore((s) => s.setTutorialPhase);
  const isRuleDrawerOpen = useAppStore((s) => s.isRuleDrawerOpen);
  const setRuleDrawerOpen = useAppStore((s) => s.setRuleDrawerOpen);

  const messages = useMessageStore((s) => s.messages);
  const addMessage = useMessageStore((s) => s.addMessage);
  const deleteMessage = useMessageStore((s) => s.deleteMessage);
  const clearTutorialMessages = useMessageStore((s) => s.clearTutorialMessages);
  const hasRealMessages = useMessageStore((s) => s.hasRealMessages);

  const [isSimulating, setIsSimulating] = useState(true);

  // Redirect if not onboarded
  useEffect(() => {
    if (!isOnboarded) {
      navigate('/onboarding', { replace: true });
    }
  }, [isOnboarded, navigate]);

  // Tutorial state machine: clear mocks + check empty
  useEffect(() => {
    if (tutorialPhase === 'complete') {
      clearTutorialMessages();
      if (!hasRealMessages()) {
        const tid = setTimeout(() => setTutorialPhase('empty'), 300);
        return () => clearTimeout(tid);
      }
    }
  }, [tutorialPhase, clearTutorialMessages, hasRealMessages, setTutorialPhase]);

  // When real messages arrive while in empty state, exit empty
  useEffect(() => {
    if (tutorialPhase === 'empty' && hasRealMessages()) {
      setTutorialPhase('complete');
    }
  }, [messages.length, tutorialPhase, hasRealMessages, setTutorialPhase]);

  // Simulated message injection (uses controlled distribution)
  const injectMessage = useCallback(() => {
    const raw = getSimulatedMessage();
    const msgId = addMessage(raw);

    // Notify if red
    const msg = useMessageStore.getState().messages.find((m) => m.id === msgId);
    if (msg && msg.priority === 'red') {
      notifyRedMessage(msg);
    }
  }, [addMessage]);

  useEffect(() => {
    if (!isSimulating) return;
    const interval = setInterval(injectMessage, SIMULATION_INTERVAL);
    return () => clearInterval(interval);
  }, [isSimulating, injectMessage]);

  // Handle view switch (triggers tutorial advancement)
  const handleViewSwitch = () => {
    const nextMode = viewMode === 'kanban' ? 'timeline' : 'kanban';
    setViewMode(nextMode);
  };

  if (!isOnboarded) return null;

  const bgClass = 'bg-[var(--color-zen-bg)] dark:bg-[var(--color-dark-zen-bg)]';
  const simBg = 'bg-[var(--color-zen-surface)] dark:bg-[var(--color-dark-zen-surface)]';
  const simBorder = 'border-[var(--color-zen-border)] dark:border-[var(--color-dark-zen-border)]';
  const simText = 'text-[var(--color-zen-text-muted)] dark:text-[var(--color-dark-zen-text-muted)]';

  return (
    <div className={`min-h-screen ${bgClass} transition-colors duration-300`}>
      <DashboardHeader
        viewMode={viewMode}
        onViewSwitch={handleViewSwitch}
        onOpenRules={() => setRuleDrawerOpen(true)}
        isSimulating={isSimulating}
        onToggleSimulation={() => setIsSimulating((v) => !v)}
      />

      {/* Red message toast — floats over everything */}
      <RedMessageToast />

      {/* Tutorial tooltip */}
      <TutorialOverlay />

      {/* Main content */}
      <main className="pt-16 px-4 md:px-6 lg:px-8 pb-8 max-w-7xl mx-auto">
        {tutorialPhase === 'empty' ? (
          <EmptyState />
        ) : (
          <AnimatePresence mode="wait">
            {viewMode === 'kanban' ? (
              <motion.div
                key="kanban"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.25 }}
              >
                <KanbanView messages={messages} onDelete={deleteMessage} />
              </motion.div>
            ) : (
              <motion.div
                key="timeline"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.25 }}
              >
                <TimelineView messages={messages} onDelete={deleteMessage} />
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </main>

      {/* Rule Config Drawer */}
      <RuleConfigDrawer
        isOpen={isRuleDrawerOpen}
        onClose={() => setRuleDrawerOpen(false)}
      />

      {/* Simulation indicator */}
      {isSimulating && (
        <div className={`fixed bottom-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-full
                        ${simBg} border ${simBorder}
                        shadow-sm text-xs ${simText} z-30`}
             aria-live="polite"
             aria-label="消息模拟运行中">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" aria-hidden="true" />
          实时消息模拟中
        </div>
      )}
    </div>
  );
}
