import {Platform, StyleSheet} from 'react-native';
import {COLORS, PADDING, FONTS, MARGINS} from '@/constants';

export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: PADDING.general,
    backgroundColor: COLORS.white,
  },
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  keyboardContainer: {
    flex: 1,
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
    paddingTop: PADDING.general * 3,
    paddingHorizontal: PADDING.general * 4,
  },
  image: {
    width: '100%',
    height: '100%',
    marginRight: 10,
    borderRadius: 10,
  },
  searchablecontainer: {
    marginTop: MARGINS.general,
    select: {
      flex: 1,
      container: {
        height: 60,
        borderColor: COLORS.border,
      },
      text: {
        fontSize: FONTS.text,
      },
    },
    option: {
      flex: 1,
      text: {
        fontSize: FONTS.text,
      },
    },
    optionsList: {
      borderColor: COLORS.border,
    },
  },
  yourFunctionSearchInput: {
    marginTop: -20,
    marginBottom: 20,
  },
  progressBar: {
    marginBottom: 10,
  },
});
