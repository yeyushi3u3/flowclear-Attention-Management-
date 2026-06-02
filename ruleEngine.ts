import type { Rule, PriorityColor } from '../types';

export interface MessageInput {
  title: string;
  summary: string;
  sender?: string;
  groupName?: string;
}

/**
 * Match a message against the rule set to determine its priority color.
 * Rules are evaluated in order: first match wins.
 * Default priority is 'gray' when no rules match.
 */
export function matchPriority(message: MessageInput, rules: Rule[]): PriorityColor {
  const text = `${message.title} ${message.summary}`.toLowerCase();
  const sender = (message.sender || '').toLowerCase();
  const group = (message.groupName || '').toLowerCase();

  for (const rule of rules) {
    if (!rule.isActive) continue;

    // Step 1: Keyword match
    const keywordMatch = rule.keywords.some((kw) =>
      text.includes(kw.toLowerCase())
    );
    if (!keywordMatch) continue;

    // Step 2: Scope limit check (if enabled)
    if (rule.scopeLimit.enabled) {
      const hasSenders = rule.scopeLimit.senders.length > 0;
      const hasGroups = rule.scopeLimit.groups.length > 0;

      if (hasSenders || hasGroups) {
        const senderMatch =
          !hasSenders ||
          rule.scopeLimit.senders.some((s) => sender.includes(s.toLowerCase()));
        const groupMatch =
          !hasGroups ||
          rule.scopeLimit.groups.some((g) => group.includes(g.toLowerCase()));

        if (!senderMatch && !groupMatch) continue;
      }
    }

    // Step 3: Exclude word check (blacklist)
    if (rule.excludeWords.length > 0) {
      const excludeMatch = rule.excludeWords.some((ew) =>
        text.includes(ew.toLowerCase())
      );
      if (excludeMatch) continue;
    }

    // All checks passed — first match wins
    return rule.targetPriority;
  }

  return 'gray';
}
