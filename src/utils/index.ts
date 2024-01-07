import {Timestamp} from 'firebase/firestore';
import {DateFormatOption} from '@/types';
import {PermissionsAndroid, Platform} from 'react-native';

export const formatFirebaseTimestamp = (
  timestamp: Timestamp | string,
  formatOption: DateFormatOption,
): string => {
  if (typeof timestamp === 'string') {
    return timestamp as string;
  }
  const date = new Date(
    timestamp?.seconds * 1000 + timestamp?.nanoseconds / 1000000,
  );

  if (formatOption === 'date') {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return date?.toLocaleDateString(undefined, options);
  }

  if (formatOption === 'dateTime') {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    return date?.toLocaleString(undefined, options);
  }

  if (formatOption === 'time') {
    const options: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
    };
    return date?.toLocaleTimeString('en-US', options);
  }

  throw new Error(
    'Invalid format option. Use "date", "dateTime", or "time24".',
  );
};

export async function hasAndroidPermission() {
  const getCheckPermissionPromise = () => {
    if (Platform.Version >= '33') {
      return Promise.all([
        PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
        ),
        PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
        ),
      ]).then(
        ([hasReadMediaImagesPermission, hasReadMediaVideoPermission]) =>
          hasReadMediaImagesPermission && hasReadMediaVideoPermission,
      );
    } else {
      return PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      );
    }
  };

  const hasPermission = await getCheckPermissionPromise();
  if (hasPermission) {
    return true;
  }
  const getRequestPermissionPromise = () => {
    if (Platform.Version >= '33') {
      return PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
      ]).then(
        statuses =>
          statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO] ===
            PermissionsAndroid.RESULTS.GRANTED,
      );
    } else {
      return PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      ).then(status => status === PermissionsAndroid.RESULTS.GRANTED);
    }
  };

  return await getRequestPermissionPromise();
}

export const trackOnboardingProgress = (screenName: string) => {
  switch (screenName) {
    case 'GetStarted':
      return 0;
    case 'Education':
      return 0.2;
    case 'Industry':
      return 0.4;
    case 'Experience':
      return 0.6;
    case 'SalaryExpectations':
      return 0.8;
    default:
      return 1;
  }
};

export const OnboardingScreens = [
  'GetStarted',
  'Education',
  'Industry',
  'Experience',
  'SalaryExpectations',
  'OnboardingCompleted',
];

/**
 * Get YouTube video ID from URL
 *
 * @param {string} url
 * @returns {string|boolean} YouTube video id or false if none found.
 */
export function youtubeIdFromUrl(url: string) {
  const pattern =
    /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=))([\w-]{10,12})$/;
  const matches = url.match(pattern);

  if (matches) {
    return matches[1];
  }

  return 'iee2TATGMyI';
}
