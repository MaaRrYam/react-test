import {COLORS, FONTS} from '@/constants';
import {getScreenDimensions} from '@/utils/functions';
import {Platform, StyleSheet} from 'react-native';
const {width} = getScreenDimensions();
export const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: Platform.OS === 'ios' ? 20 : 30,
  },
  mainContainer: {
    color: 'black',
    paddingLeft: 25,
    paddingRight: 25,
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
    marginBottom: 30,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 57,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.border,
  },
  text: {
    color: COLORS.black,
  },
  dividerMargin: {
    marginHorizontal: 10,
  },
  alreadyHaveAnAccount: {
    marginTop: 150,
    marginLeft: 8,
    flexDirection: 'row',
  },
  signInWithEmailButton: {
    marginTop: 30,
  },
  signUpText: {
    color: COLORS.primary,
  },
});
