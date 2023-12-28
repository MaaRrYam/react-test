import {StyleSheet} from 'react-native';
import {FONTS, COLORS} from '@/constants';

export const checkBoxStyles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    borderWidth: 2,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkIcon: {
    position: 'absolute',
  },
  checkText: {
    marginLeft: 8,
  },
});

export const inputStyles = StyleSheet.create({
  container: {
    marginVertical: 10,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    position: 'relative',
  },
  input: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: FONTS.text,
    color: COLORS.black,
  },
  error: {
    fontSize: FONTS.bodySmall,
    color: 'red',
    marginTop: -10,
    marginLeft: 12,
    marginBottom: 10,
  },
  fullWidth: {
    width: '100%',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
  },
  phoneTextContainer: {
    backgroundColor: COLORS.white,
  },
  phoneCountryPickerButton: {
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
});
