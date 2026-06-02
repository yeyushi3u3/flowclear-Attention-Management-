// ===== Message Types =====
export type PriorityColor = 'red' | 'blue' | 'yellow' | 'gray';
export type SourceType = 'browser_notification' | 'rss' | 'email' | 'calendar';
export type MessageCategory = 'work' | 'study' | 'entertainment' | 'shopping' | 'social' | 'finance' | 'system' | 'life';

export interface Message {
  id: string;
  title: string;
  summary: string;
  sourceType: SourceType;
  sourceApp: string;
  priority: PriorityColor;
  category: MessageCategory;
  timestamp: number;
  sender?: string;
  groupName?: string;
  originalLink?: string;
  isRead: boolean;
  isMock: boolean;
}

export const categoryLabels: Record<MessageCategory, string> = {
  work: '工作',
  study: '学习',
  entertainment: '娱乐',
  shopping: '购物',
  social: '社交',
  finance: '财务',
  system: '系统',
  life: '生活',
};

export const categoryColors: Record<MessageCategory, string> = {
  work: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  study: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
  entertainment: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
  shopping: 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300',
  social: 'bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300',
  finance: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  system: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300',
  life: 'bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300',
};

// ===== Rule Types =====
export interface ScopeLimit {
  enabled: boolean;
  senders: string[];
  groups: string[];
}

export interface Rule {
  id: string;
  name: string;
  keywords: string[];
  targetPriority: PriorityColor;
  scopeLimit: ScopeLimit;
  excludeWords: string[];
  isActive: boolean;
}

// ===== Identity Types =====
export type IdentityType = 'student' | 'professional' | 'learner' | 'creator' | 'minimalist';

export interface IdentityPreset {
  type: IdentityType;
  emoji: string;
  label: string;
  description: string;
  tagline: string;
  presetRules: Omit<Rule, 'id'>[];
}

// ===== Tutorial Types =====
export type TutorialPhase = 'tutorial' | 'complete' | 'empty';

// ===== View Mode =====
export type ViewMode = 'kanban' | 'timeline';

// ===== Analytics Types =====
export interface AnalyticsEvent {
  name: string;
  timestamp: number;
  properties: Record<string, string | number | boolean>;
}
