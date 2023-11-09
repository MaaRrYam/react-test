import {BORDER_RADIUS, COLORS, MARGINS, PADDING} from '@/constants';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: BORDER_RADIUS.general,
    borderTopRightRadius: BORDER_RADIUS.general,
  },
  contentContainer: {
    flex: 1,
  },
  sheetStyles: {
    backgroundColor: COLORS.black,
    borderRadius: 30,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16,
    elevation: 24,
  },
});
