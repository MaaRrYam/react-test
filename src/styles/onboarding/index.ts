import {Platform, StyleSheet} from 'react-native';
import {COLORS, PADDING, FONTS} from '@/constants';

export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: PADDING.general,
    backgroundColor: COLORS.white,
  },
  title: {
    fontSize: FONTS.title,
    fontWeight: 'bold',
    marginVertical: 30,
    color: COLORS.black,
  },
  footer: {
    borderTopColor: COLORS.border,
    borderTopWidth: 1,
    paddingTop: PADDING.general,
    width: '100%',
    paddingHorizontal: Platform.OS === 'ios' ? PADDING.general : 0,
    paddingBottom: 20,
  },
});
