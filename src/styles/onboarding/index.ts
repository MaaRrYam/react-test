import {Platform, StyleSheet} from 'react-native';
import {COLORS, PADDING, FONTS} from '@/constants';

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
  getStartedWrapper: {
    flex: 1,
    justifyContent: 'space-between',
  },
  searchablecontainer: {
    marginBottom: 12,
    height: 60,
    borderColor: COLORS.border,
    fontSize: FONTS.text,
  },
  searchContainerStyles: {
    borderWidth: 0,
  },
  searchInputContainerStyles: {
    borderWidth: 0,
    padding: 0,
  },
  searchTextInput: {
    borderColor: COLORS.border,
    borderWidth: 0,
    height: 40,
  },
  yourFunctionSearchInput: {
    marginTop: -20,
    marginBottom: 20,
  },
  progressBar: {
    marginBottom: 10,
  },
  infoTextContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 22,
  },
  infoText: {
    color: '#7D7D7D',
    marginLeft: 7,
  },
});
