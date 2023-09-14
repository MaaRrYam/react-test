export const getIcon = (label: string, isFocused: boolean) => {
  switch (label) {
    case 'Home':
      if (isFocused) {
        return require('../assets/icons/home-filled.png');
      }
      return require('../assets/icons/home.png');
    case 'Network':
      if (isFocused) {
        return require('../assets/icons/network-filled.png');
      }
      return require('../assets/icons/network.png');
    case 'Notifications':
      if (isFocused) {
        return require('../assets/icons/notifications-filled.png');
      }
      return require('../assets/icons/notifications.png');
    case 'Jobs':
      if (isFocused) {
        return require('../assets/icons/jobs-filled.png');
      }
      return require('../assets/icons/jobs.png');
    case 'Profile':
      return require('../assets/images/user.png');
    default:
      return '';
  }
};
