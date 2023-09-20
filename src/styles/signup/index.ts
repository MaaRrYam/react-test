import {FONTS} from '@/constants';
import {getScreenDimensions} from '@/utils/functions';
import {Platform, StyleSheet} from 'react-native';
const {width} = getScreenDimensions();
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
    width: width - 180,
    height: 97,
    marginTop: 60,
    marginBottom: 30,
  },
  headingTitle: {
    fontSize: FONTS.heading,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 30,
  },
});
