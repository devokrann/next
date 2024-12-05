import { HourSystem } from '@/enums/date';
import { FormatOptions } from '@/types/date-time';

export function useRegionalDate(
  date: Date,
  options: FormatOptions = {
    format: 'short',
  }
): { date: string; time: string } {
  // Handle both string and Date inputs
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  // Check if the date is valid
  if (isNaN(dateObj.getTime())) {
    throw new Error('---> utility error - (invalid date)');
  }

  const formatDate = () => {
    let formatOptions: Intl.DateTimeFormatOptions;

    switch (options?.format) {
      case 'short':
        formatOptions = {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        };
        break;

      case 'long':
        formatOptions = {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        };
        break;

      case 'full':
        formatOptions = {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          weekday: 'long',
        };

        break;

      default:
        formatOptions = {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        };

        break;
    }

    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const userLocale = Intl.DateTimeFormat().resolvedOptions().locale;

    return new Intl.DateTimeFormat(options.locale || userLocale, {
      ...formatOptions,
      timeZone: options.timezone || userTimeZone,
    }).format(dateObj);
  };

  const formatTime = () => {
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const userLocale = Intl.DateTimeFormat().resolvedOptions().locale;

    return new Intl.DateTimeFormat(options.locale || userLocale, {
      hour: '2-digit',
      minute: '2-digit',
      hour12: options.hourSystem != HourSystem.TWENTY_FOUR,
      timeZone: options.timezone || userTimeZone,
    }).format(dateObj);
  };

  return { date: formatDate(), time: formatTime() };
}
