import {StyleSheet} from 'react-native';
import {BORDER_RADIUS, COLORS, FONTS, MARGINS, PADDING} from '@/constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: PADDING.general,
    marginTop: MARGINS.general,
  },
  createPostText: {
    fontSize: FONTS.largeLabel,
    color: COLORS.black,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  authorContainer: {
    marginTop: MARGINS.general,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 43,
    height: 43,
    borderRadius: BORDER_RADIUS.general,
    marginRight: MARGINS.general,
  },
  authorName: {
    fontSize: FONTS.bodyRegular,
    color: COLORS.black,
    fontWeight: '700',
  },
});
