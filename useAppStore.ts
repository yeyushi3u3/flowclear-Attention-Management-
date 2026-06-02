import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { IdentityType, ViewMode, TutorialPhase } from '../types';

interface AppState {
  isOnboarded: boolean;
  identityType: IdentityType | null;
  viewMode: ViewMode;
  tutorialPhase: TutorialPhase;
  isRuleDrawerOpen: boolean;
  darkMode: boolean;

  completeOnboarding: (type: IdentityType) => void;
  setViewMode: (mode: ViewMode) => void;
  advanceTutorial: () => void;
  setTutorialPhase: (phase: TutorialPhase) => void;
  setRuleDrawerOpen: (open: boolean) => void;
  toggleDarkMode: () => void;
  resetAll: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      isOnboarded: false,
      identityType: null,
      viewMode: 'kanban',
      tutorialPhase: 'tutorial',
      isRuleDrawerOpen: false,
      darkMode: false,

      completeOnboarding: (type) =>
        set({
          isOnboarded: true,
          identityType: type,
          tutorialPhase: 'tutorial',
        }),

      setViewMode: (mode) => {
        const { tutorialPhase } = get();
        set({ viewMode: mode });
        if (tutorialPhase === 'tutorial') {
          set({ tutorialPhase: 'complete' });
        }
      },

      advanceTutorial: () => {
        const { tutorialPhase } = get();
        if (tutorialPhase === 'tutorial') {
          set({ tutorialPhase: 'complete' });
        }
      },

      setTutorialPhase: (phase) => set({ tutorialPhase: phase }),
      setRuleDrawerOpen: (open) => set({ isRuleDrawerOpen: open }),

      toggleDarkMode: () =>
        set((state) => ({ darkMode: !state.darkMode })),

      resetAll: () =>
        set({
          isOnboarded: false,
          identityType: null,
          viewMode: 'kanban',
          tutorialPhase: 'tutorial',
          isRuleDrawerOpen: false,
          darkMode: false,
        }),
    }),
    { name: 'flowclear:app' }
  )
);
