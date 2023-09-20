import {BORDER_RADIUS, COLORS, FONTS, containerWidth} from '@/constants';
import {getScreenDimensions} from '@/utils/functions';
import {Platform} from 'react-native';
import {StyleSheet} from 'react-native';

const {width} = getScreenDimensions();
export const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: Platform.OS === 'ios' ? 20 : 30,
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
    fontWeight: '400',
  },
});
