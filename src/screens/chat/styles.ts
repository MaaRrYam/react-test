import {BORDER_RADIUS, COLORS, MARGINS, PADDING} from '@/constants';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  backButtonStyles: {
    borderWidth: 0,
    padding: 0,
  },
  searchInputStyles: {
    flex: 1,
    borderRadius: BORDER_RADIUS.general * 2,
    backgroundColor: COLORS.lightBackground,
    paddingHorizontal: 10,
    paddingVertical: PADDING.general - 6,
    color: COLORS.black,
    marginRight: 30,
    marginLeft: -10,
  },
  leftContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: MARGINS.general / 3,
  },
  rightContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    backgroundColor: COLORS.lightGrayBackground,
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
