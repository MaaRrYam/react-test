import React from 'react';
import {Home, Network, Notifications, Jobs, Image} from '@/assets/icons';

export const getIcon = (label: string, isFocused: boolean) => {
  switch (label) {
    case 'Home':
      return <Home isFocused={isFocused} />;
    case 'Network':
      return <Network isFocused={isFocused} />;
    case 'Notifications':
      return <Notifications isFocused={isFocused} />;
    case 'Jobs':
      return <Jobs isFocused={isFocused} />;
    case 'Profile':
      return <Image />;
    default:
      return <Home isFocused={isFocused} />;
  }
};
