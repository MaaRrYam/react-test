import {Platform, StyleSheet} from 'react-native';
import {COLORS, PADDING, FONTS, BORDER_RADIUS, MARGINS} from '@/constants';
import {WINDOW_HEIGHT, WINDOW_WIDTH} from '@gorhom/bottom-sheet';

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
  imageContainer: {
    paddingRight: PADDING.general,
    borderRadius: 15,
    width: 101,
    height: 101,
    backgroundColor: COLORS.lightBlueBackground,
  },
  imageText: {
    marginTop: 10,
    marginBottom: 25,
    fontSize: FONTS.regularLabel,
  },
  cameraImage: {
    paddingVertical: PADDING.general * 3,
    paddingHorizontal: PADDING.general * 4,
  },
  image: {
    width: 71,
    height: 71,
    marginRight: 10,
    borderRadius: 10,
  },
});
