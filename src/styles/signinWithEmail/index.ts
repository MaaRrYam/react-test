import {BORDER_RADIUS, COLORS, FONTS, containerWidth} from '@/constants';
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
    flex: 1,
    paddingLeft: 25,
    paddingRight: 20,
  },
  mainText: {
    color: 'black',
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
    marginBottom: 13,
  },
  inputContainer: {
    width: containerWidth,
  },
  signinButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: BORDER_RADIUS.general,
    borderWidth: 1,
    borderColor: COLORS.border,
    color: COLORS.black,
    marginVertical: 20,
    fontWeight: '300',
  },
  dontHaveAnAccount: {
    marginTop: 205,
    marginLeft: 8,
    flexDirection: 'row',
  },
  signUpText: {
    color: COLORS.primary,
  },
});
