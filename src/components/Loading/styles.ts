import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    alignItems: 'center',
  },
  loader: {
    width: 100,
    height: 100,
    // Add any other styles you need for the loader image
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
});
