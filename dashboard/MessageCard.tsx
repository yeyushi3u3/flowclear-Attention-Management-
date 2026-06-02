import { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import type { Message } from '../../types';
import { categoryLabels, categoryColors } from '../../types';
import PriorityBadge from '../common/PriorityBadge';
import { formatRelativeTime } from '../../utils/dateFormat';
import {
  MessageCircle, ClipboardList, Video, Radio, Lightbulb,
  ShoppingCart, Wallet, Mail, MailQuestion, CalendarDays,
  Newspaper, PenTool, BookOpen, Cpu, MapPin, ExternalLink,
  Trash2
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface Props {
  message: Message;
  variant?: 'kanban' | 'timeline';
  isTutorial?: boolean;
  onDelete: (id: string) => void;
}

const sourceIconMap: Record<string, LucideIcon> = {
  '微信': MessageCircle,
  '钉钉': ClipboardList,
  'B站': Video,
  '微博': Radio,
  '知乎': Lightbulb,
  '淘宝': ShoppingCart,
  '支付宝': Wallet,
  'Outlook': Mail,
  'Gmail': MailQuestion,
  'Google Calendar': CalendarDays,
  '少数派': Newspaper,
  '阮一峰的网络日志': PenTool,
  'GitHub': Cpu,
  '得到': BookOpen,
  '系统': Cpu,
};

const SWIPE_THRESHOLD = 80; // px to trigger delete reveal

export default function MessageCard({ message, variant = 'kanban', isTutorial = false, onDelete }: Props) {
  const isTimeline = variant === 'timeline';
  const SourceIcon = sourceIconMap[message.sourceApp] || MapPin;

  const [xOffset, setXOffset] = useState(0);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const constraintsRef = useRef<HTMLDivElement>(null);
  const startX = useRef(0);
  const isDragging = useRef(false);

  // Color variable resolution
  const resolveColor = (key: string) => `var(--color-zen-${key})`;
  const borderColor = resolveColor(message.priority);
  const redGlow = `0 2px 8px rgba(201, 75, 75, 0.1)`;

  // CSS class builders
  const surface = 'bg-[var(--color-zen-surface)] dark:bg-[var(--color-dark-zen-surface)]';
  const border = 'border-[var(--color-zen-border)] dark:border-[var(--color-dark-zen-border)]';
  const textPrimary = 'text-[var(--color-zen-text)] dark:text-[var(--color-dark-zen-text)]';
  const textSecondary = 'text-[var(--color-zen-text-secondary)] dark:text-[var(--color-dark-zen-text-secondary)]';
  const textMuted = 'text-[var(--color-zen-text-muted)] dark:text-[var(--color-dark-zen-text-muted)]';

  // ---- Touch / mouse handlers for swipe ----
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    startX.current = e.clientX;
    isDragging.current = true;
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const dx = e.clientX - startX.current;
    // Only allow leftward swipe; cap at -120px
    const clamped = Math.max(Math.min(dx, 0), -120);
    setXOffset(clamped);
    setShowDeleteConfirm(clamped < -SWIPE_THRESHOLD);
  }, []);

  const handlePointerUp = useCallback(() => {
    isDragging.current = false;
    if (showDeleteConfirm) {
      // Stay at delete position
      setXOffset(-100);
    } else {
      // Snap back
      setXOffset(0);
    }
  }, [showDeleteConfirm]);

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(message.id);
  };

  const handleCancelDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDeleteConfirm(false);
    setXOffset(0);
  };

  // ---- Render ----

  return (
    <motion.div
      layout
      exit={{ opacity: 0, height: 0, marginBottom: 0, padding: 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className={`relative overflow-hidden rounded-[var(--radius-card)] ${isTimeline ? 'mb-3 ml-8' : 'mb-2'}`}
        >
          {/* ---- Delete background (revealed behind card on swipe) ---- */}
          <div
            className={`absolute inset-y-0 right-0 flex items-center justify-end
                        bg-red-500 dark:bg-red-700 rounded-[var(--radius-card)]
                        ${xOffset < -10 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            style={{ width: '100px' }}
          >
            <button
              onClick={handleDelete}
              className="w-[100px] h-full flex flex-col items-center justify-center gap-1
                         text-white font-medium text-sm hover:bg-red-600 dark:hover:bg-red-600
                         transition-colors rounded-r-[var(--radius-card)] cursor-pointer"
              aria-label={`删除消息：${message.title}`}
            >
              <Trash2 size={18} />
              <span className="text-xs">删除</span>
            </button>
          </div>

          {/* ---- Card (slides over delete area) ---- */}
          <motion.div
            ref={constraintsRef}
            animate={{ x: xOffset }}
            transition={isDragging.current ? { duration: 0 } : { type: 'spring', stiffness: 400, damping: 30 }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            className={`group relative ${surface} cursor-pointer touch-pan-y select-none
                        border ${border} transition-shadow
                        ${isTutorial ? 'ring-2 ring-[var(--color-zen-blue)] dark:ring-[var(--color-dark-zen-blue)] ring-opacity-30' : ''}
                        ${!message.isRead && message.priority === 'red' ? 'shadow-sm' : ''}`}
            style={{
              borderLeft: isTimeline ? undefined : `3px solid ${borderColor}`,
              boxShadow: !message.isRead && message.priority === 'red' ? redGlow : undefined,
            }}
            whileHover={xOffset === 0 ? { scale: 1.01, boxShadow: '0 4px 12px rgba(0,0,0,0.06)' } : undefined}
          >
            <div className="p-3 md:p-4">
              {/* Header row */}
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    {isTutorial && (
                      <span className="text-xs px-1.5 py-0.5 rounded
                                       bg-[var(--color-zen-blue-light)] dark:bg-[var(--color-dark-zen-blue-light)]
                                       text-[var(--color-zen-blue)] dark:text-[var(--color-dark-zen-blue)] font-medium">
                        静流助手
                      </span>
                    )}
                    {/* Source icon */}
                    <SourceIcon size={14} className={`shrink-0 ${textMuted}`} aria-hidden="true" />
                    <span className={`text-xs ${textMuted}`}>
                      {message.sourceApp}
                    </span>
                    {message.sender && (
                      <span className={`text-xs ${textSecondary} truncate`}>
                        · {message.sender}
                      </span>
                    )}
                    {message.groupName && (
                      <span className={`text-xs ${textMuted} truncate`}>
                        · {message.groupName}
                      </span>
                    )}
                  </div>
                  <h4 className={`mt-1 text-sm font-medium ${textPrimary} leading-snug
                    ${!message.isRead ? 'font-semibold' : ''}`}>
                    {message.title}
                  </h4>
                </div>
                <PriorityBadge priority={message.priority} />
              </div>

              {/* Summary */}
              <p className={`text-xs ${textSecondary} leading-relaxed line-clamp-2 mb-2`}>
                {message.summary}
              </p>

              {/* Footer row: category tag + time + view original */}
              <div className="flex items-center justify-between gap-2">
                {/* Category tag + time */}
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  {/* Category badge */}
                  <span className={`inline-block px-1.5 py-0.5 text-[10px] rounded-md font-medium leading-none ${categoryColors[message.category]}`}>
                    {categoryLabels[message.category]}
                  </span>
                  <span className={`text-xs ${textMuted}`}>
                    {formatRelativeTime(message.timestamp)}
                  </span>
                </div>

                {/* View original link */}
                {message.originalLink && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (message.originalLink?.startsWith('http')) {
                        window.open(message.originalLink, '_blank', 'noopener,noreferrer');
                      } else if (message.originalLink?.startsWith('mailto:')) {
                        window.location.href = message.originalLink;
                      }
                    }}
                    className="shrink-0 inline-flex items-center gap-1 text-xs
                               text-[var(--color-zen-blue)] dark:text-[var(--color-dark-zen-blue)]
                               hover:underline opacity-0 group-hover:opacity-100
                               transition-opacity duration-200 min-h-[32px]"
                    aria-label={`查看 ${message.sourceApp} 消息原文`}
                  >
                    查看原文 <ExternalLink size={11} aria-hidden="true" />
                  </button>
                )}

                {/* Swipe hint — only visible when not yet swiped */}
                {xOffset === 0 && (
                  <span className="shrink-0 text-[10px] text-[var(--color-zen-text-muted)]/40
                                   dark:text-[var(--color-dark-zen-text-muted)]/40
                                   opacity-0 group-hover:opacity-100 transition-opacity duration-200
                                   hidden md:inline">
                    ← 左滑删除
                  </span>
                )}
              </div>
            </div>

            {/* Timeline breathing dot */}
            {isTimeline && (
              <div
                className={`absolute -left-7 top-4 w-2.5 h-2.5 rounded-full
                  ${message.priority === 'red' ? 'animate-breathe-red' : ''}
                  ${message.priority === 'blue' ? 'animate-breathe-blue' : ''}
                  ${message.priority === 'yellow' ? 'animate-breathe-yellow' : ''}
                  ${message.priority === 'gray' ? 'opacity-40' : ''}`}
                style={{
                  backgroundColor: resolveColor(message.priority),
                  boxShadow: message.priority !== 'gray'
                    ? `0 0 6px ${resolveColor(message.priority)}`
                    : undefined,
                }}
                aria-hidden="true"
              />
            )}
          </motion.div>

          {/* ---- Cancel delete button (shown when swiped) ---- */}
          {showDeleteConfirm && (
            <button
              onClick={handleCancelDelete}
              className="absolute top-2 left-2 z-10 px-2 py-1 text-[10px] rounded-md
                         bg-white/90 dark:bg-black/60 text-slate-700 dark:text-slate-200
                         shadow-sm hover:bg-white dark:hover:bg-black/80 transition-colors"
            >
              取消
            </button>
          )}
        </motion.div>
  );
}
