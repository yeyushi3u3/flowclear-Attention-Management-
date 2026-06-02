import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Message, PriorityColor } from '../types';
import { nanoid } from 'nanoid';

type MessageInput = Omit<Message, 'id'>;

interface MessageState {
  messages: Message[];

  injectTutorialMessages: (msgs: MessageInput[]) => void;
  clearTutorialMessages: () => void;
  addMessage: (msg: MessageInput) => string;
  markAsRead: (id: string) => void;
  deleteMessage: (id: string) => void;
  clearAllMessages: () => void;

  getByPriority: (priority: PriorityColor) => Message[];
  getRedUnread: () => Message[];
  hasRealMessages: () => boolean;
}

export const useMessageStore = create<MessageState>()(
  persist(
    (set, get) => ({
      messages: [],

      injectTutorialMessages: (msgs) => {
        const tutorialMsgs: Message[] = msgs.map((m) => ({
          ...m,
          id: nanoid(),
        }));
        set((state) => ({
          messages: [...tutorialMsgs, ...state.messages],
        }));
      },

      clearTutorialMessages: () => {
        set((state) => ({
          messages: state.messages.filter((m) => !m.isMock),
        }));
      },

      addMessage: (msg) => {
        const id = nanoid();
        const message: Message = {
          ...msg,
          id,
          timestamp: msg.timestamp || Date.now(),
        };
        set((state) => ({
          messages: [message, ...state.messages],
        }));
        return id;
      },

      markAsRead: (id) => {
        set((state) => ({
          messages: state.messages.map((m) =>
            m.id === id ? { ...m, isRead: true } : m
          ),
        }));
      },

      clearAllMessages: () => set({ messages: [] }),

      deleteMessage: (id) => {
        set((state) => ({
          messages: state.messages.filter((m) => m.id !== id),
        }));
      },

      getByPriority: (priority) => {
        return get().messages.filter((m) => m.priority === priority);
      },

      getRedUnread: () => {
        return get().messages.filter(
          (m) => m.priority === 'red' && !m.isRead
        );
      },

      hasRealMessages: () => {
        return get().messages.some((m) => !m.isMock);
      },
    }),
    { name: 'flowclear:messages' }
  )
);
