import {COLORS, FONTS, containerWidth} from '@/constants';
import {getScreenDimensions} from '@/utils/functions';
import {StyleSheet} from 'react-native';
const {width} = getScreenDimensions();
export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  keyboardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContainer: {
    color: COLORS.black,
    paddingLeft: 25,
    paddingRight: 20,
  },
  mainText: {
    color: COLORS.black,
  },
  logo: {
    width: width - 180,
    height: 97,
    marginTop: 60,
    marginBottom: 30,
  },
  headingTitle: {
    fontSize: FONTS.heading,
    color: COLORS.black,
    fontWeight: 'bold',
  },
  inputContainer: {
    width: containerWidth,
    marginTop: 44,
  },
  signUpButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    color: COLORS.black,
    marginVertical: 20,
    fontWeight: 300,
  },
  dontHaveAccount: {
    marginTop: 130,
    marginLeft: 8,
    flexDirection: 'row',
  },
  signInText: {
    color: COLORS.primary,
  },
});
