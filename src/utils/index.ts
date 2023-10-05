import {Timestamp} from 'firebase/firestore';
import {DateFormatOption} from '@/types';

export const formatFirebaseTimestamp = (
  timestamp: Timestamp,
  formatOption: DateFormatOption,
): string => {
  const date = new Date(
    timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000,
  );

  if (formatOption === 'date') {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return date.toLocaleDateString(undefined, options);
  }

  if (formatOption === 'dateTime') {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    return date.toLocaleString(undefined, options);
  }

  if (formatOption === 'time') {
    const options: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
    };
    return date.toLocaleTimeString('en-US', options);
  }

  throw new Error(
    'Invalid format option. Use "date", "dateTime", or "time24".',
  );
};
