import type { Message } from '../types';

export function isNotificationSupported(): boolean {
  return 'Notification' in window;
}

export function getPermission(): NotificationPermission {
  if (!isNotificationSupported()) return 'denied';
  return Notification.permission;
}

export async function requestPermission(): Promise<NotificationPermission> {
  if (!isNotificationSupported()) return 'denied';
  return Notification.requestPermission();
}

/**
 * Fire a browser notification for a red-priority message.
 * Only fires if permission is granted and message is red.
 */
export function notifyRedMessage(message: Message): void {
  if (!isNotificationSupported()) return;
  if (Notification.permission !== 'granted') return;
  if (message.priority !== 'red') return;

  new Notification(message.title, {
    body: message.summary.length > 120
      ? message.summary.slice(0, 120) + '…'
      : message.summary,
    icon: '/favicon.svg',
    tag: message.id,
    requireInteraction: false,
  });
}
