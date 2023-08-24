import {StyleSheet} from 'react-native';
import {COLORS, PADDING, FONTS} from '../../constants';

export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: PADDING.general,
  },
  title: {
    fontSize: FONTS.heading,
    fontWeight: 'bold',
    marginVertical: 40,
  },
  footer: {
    borderTopColor: COLORS.borderGray,
    borderTopWidth: 1,
    paddingTop: PADDING.general,
    width: '100%',
  },
});
