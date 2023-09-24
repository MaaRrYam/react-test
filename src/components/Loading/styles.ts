import {BORDER_RADIUS, COLORS} from '@/constants';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: BORDER_RADIUS.general,
  },
  image: {
    width: 100,
    height: 100,
  },
});
