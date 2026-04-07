import { parseISO, differenceInSeconds } from 'date-fns';

/**
 * Formats an ISO date string to a relative time format (e.g., "5 min", "2 h", "3 d")
 *
 * @param dateISO - Date in ISO 8601 format (e.g., "2026-03-27T10:30:00Z" or "2026-03-27T10:30:00-03:00")
 *
 */
const formatRelative = (dateISO: string): string => {
  const date = parseISO(dateISO);
  const now = Date.now();
  const diffInSeconds = differenceInSeconds(now, date);

  if (diffInSeconds < 60) {
    return `${Math.abs(diffInSeconds)} s`;
  }

  const diffInMinutes = Math.round(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} min`;
  }

  const diffInHours = Math.round(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} h`;
  }

  const diffInDays = Math.round(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays} d`;
  }

  const diffInWeeks = Math.round(diffInDays / 7);
  if (diffInWeeks < 4) {
    return `${diffInWeeks} sem`;
  }

  const diffInMonths = Math.round(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths} m`;
  }

  const diffInYears = Math.round(diffInMonths / 12);
  return `${diffInYears} a`;
};

export const dateUtils = {
  formatRelative,
};
