import {StyleSheet} from 'react-native';
import {COLORS, PADDING} from '@/constants';

export const homeStyles = StyleSheet.create({
  outerContainer: {
    backgroundColor: COLORS.lightBackground,
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    backgroundColor: COLORS.white,
    padding: PADDING.general,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  logo: {
    width: 40,
    height: 40,
  },
  headerIcons: {
    flexDirection: 'row',
  },
  icon: {
    marginRight: 20,
  },
  subheader: {
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    padding: PADDING.general,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    maxHeight: 100,
  },
});
