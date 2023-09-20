import {COLORS, containerWidth} from '@/constants';
import {getScreenDimensions} from '@/utils/functions';
import {Platform, StyleSheet} from 'react-native';
const {width} = getScreenDimensions();
export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: Platform.OS === 'ios' ? 20 : 30,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
  },
  imagesContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    maxHeight: '45%',
  },
  logo: {
    width: width - 180,
    height: '30%',
    marginTop: 50,
  },
  peopleImage: {
    width: width - 80,
    height: '70%',
    marginLeft: 30,
  },
  inputContainer: {
    width: containerWidth,
  },
  btnContainer: {
    alignItems: 'center',
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.white,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 16,
  },
  divider: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.white,
    marginBottom: 10,
  },
  socialsButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent', // Google Blue
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    color: COLORS.black,
    fontWeight: '400',
  },
  iconContainer: {
    marginRight: 10,
  },
  signinButtonText: {
    color: COLORS.black,
    fontSize: 16,
    fontWeight: 'bold',
  },
  icon: {
    width: 30,
    height: 30,
  },
  alreadyHaveAnAccount: {
    color: COLORS.black,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    marginLeft: '27%',
  },
});
