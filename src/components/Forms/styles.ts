import {COLORS, FONTS} from '@/constants';
import {Dimensions, StyleSheet} from 'react-native';

export const editFormStyles = StyleSheet.create({
  flexStyle: {
    flex: 1,
    justifyContent: 'space-between',
    height: Dimensions.get('window').height * 0.7,
  },
  paddedContainer: {
    paddingHorizontal: 20,
    flex: 1,
  },
  sectionHeader: {
    color: COLORS.black,
    marginBottom: 24,
    fontWeight: 'bold',
    fontSize: FONTS.largeLabel,
  },
  yearInputContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  yearInput: {
    width: 156,
  },
  textInput: {
    width: 323,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  checkboxText: {
    color: COLORS.black,
    marginLeft: 10,
  },
  careerItem: {
    paddingHorizontal: 20,
    borderBottomWidth: 1,
  },
  saveButton: {
    marginTop: 10,
  },
  leftMargin: {
    marginLeft: 11,
  },
  borderTransparent: {
    borderBottomColor: 'transparent',
  },
  borderColored: {
    borderBottomColor: COLORS.border,
  },
  footer: {
    borderTopColor: COLORS.border,
    borderTopWidth: 1,
    paddingHorizontal: 20,
  },
});
