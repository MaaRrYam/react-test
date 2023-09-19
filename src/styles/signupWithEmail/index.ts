import {BORDER_RADIUS, COLORS, FONTS, containerWidth, windowWidth} from '@/constants';
import {Platform, StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: Platform.OS === 'ios' ? 20 : 30,
  },
  mainContainer: {
    color: 'black',
    paddingLeft: 25,
    paddingRight: 20,
  },
  mainText: {
    color: 'black',
  },
  logo: {
    width: windowWidth - 180,
    height: 97,
    marginTop: 60,
    marginBottom: 30,
  },
  headingTitle: {
    fontSize: FONTS.heading,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 0,
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
    color: 'black',
    fontWeight: '400',
  },
});
