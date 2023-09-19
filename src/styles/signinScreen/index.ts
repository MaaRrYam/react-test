import {FONTS, windowWidth} from '@/constants';
import {Platform, StyleSheet} from 'react-native';

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
    marginBottom: 30,
  },
});
