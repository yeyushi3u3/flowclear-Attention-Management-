import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Rule, IdentityPreset } from '../types';
import { nanoid } from 'nanoid';

interface RuleState {
  rules: Rule[];

  applyIdentityPreset: (preset: IdentityPreset) => void;
  addRule: (rule: Omit<Rule, 'id'>) => void;
  updateRule: (id: string, updates: Partial<Rule>) => void;
  deleteRule: (id: string) => void;
  toggleRule: (id: string) => void;
  clearAllRules: () => void;
}

export const useRuleStore = create<RuleState>()(
  persist(
    (set) => ({
      rules: [],

      applyIdentityPreset: (preset) => {
        const newRules: Rule[] = preset.presetRules.map((r) => ({
          ...r,
          id: nanoid(),
        }));
        set({ rules: newRules });
      },

      addRule: (rule) => {
        const newRule: Rule = { ...rule, id: nanoid() };
        set((state) => ({ rules: [...state.rules, newRule] }));
      },

      updateRule: (id, updates) => {
        set((state) => ({
          rules: state.rules.map((r) =>
            r.id === id ? { ...r, ...updates } : r
          ),
        }));
      },

      deleteRule: (id) => {
        set((state) => ({
          rules: state.rules.filter((r) => r.id !== id),
        }));
      },

      toggleRule: (id) => {
        set((state) => ({
          rules: state.rules.map((r) =>
            r.id === id ? { ...r, isActive: !r.isActive } : r
          ),
        }));
      },

      clearAllRules: () => set({ rules: [] }),
    }),
    { name: 'flowclear:rules' }
  )
);
