import {BORDER_RADIUS, COLORS, FONTS} from '@/constants';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  socialsButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    padding: 10,
    borderRadius: BORDER_RADIUS.general,
    borderWidth: 1,
    borderColor: COLORS.border,
    color: COLORS.black,
    fontWeight: '400',
  },
  iconContainer: {
    marginRight: 10,
  },
  signinButtonText: {
    color: COLORS.black,
    fontSize: FONTS.text,
    fontWeight: 'bold',
  },
  icon: {
    width: 30,
    height: 30,
  },
});
