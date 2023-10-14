import {COLORS, FONTS} from '@/constants';
import {StyleSheet} from 'react-native';

export const editFormStyles = StyleSheet.create({
  paddedContainer: {
    paddingHorizontal: 20,
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
    marginTop: 270,
  },
  educationSaveButton: {
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
    marginTop: 260,
  },
});
