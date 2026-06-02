/**
 * Truncate text to a summary of maxLen characters or fewer.
 * Tries to cut at sentence boundaries (。！？\n) or word boundaries.
 */
export function truncateToSummary(text: string, maxLen = 100): string {
  if (text.length <= maxLen) return text;

  // Try to cut at Chinese sentence boundaries
  const sentenceBreaks = /[。！？\n]/g;
  let bestCut = 0;
  let match: RegExpExecArray | null;

  while ((match = sentenceBreaks.exec(text)) !== null) {
    if (match.index < maxLen) {
      bestCut = match.index + 1;
    } else {
      break;
    }
  }

  if (bestCut > 0) {
    return text.slice(0, bestCut).trim();
  }

  // Fall back to cutting at space or simply at maxLen
  const spaceCut = text.lastIndexOf(' ', maxLen);
  if (spaceCut > maxLen * 0.7) {
    return text.slice(0, spaceCut).trim() + '…';
  }

  return text.slice(0, maxLen - 1).trim() + '…';
}
