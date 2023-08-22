import React from 'react';
import SplashScreen from './screens/Splash';
import SignIn from './screens/signInRequestAccess/SignIn';
import {View, StyleSheet} from 'react-native';
import SelectRole from './screens/signInRequestAccess/SelectRole';
import RequestAccess from './screens/signInRequestAccess/RequestAccess';
import GetStarted from './screens/onboarding/GetStarted';
import RequestAccessComplete from './screens/signInRequestAccess/RequestAccessComplete';

const App = () => {
  const [showSplash, setShowSplash] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => {
      setShowSplash(false);
    }, 3000);
  }, []);

  return showSplash ? (
    <SplashScreen />
  ) : (
    <View style={styles.container}>
      {/* <SignIn /> */}
      {/* <SelectRole /> */}
      {/* <RequestAccess /> */}
      <RequestAccessComplete />
      {/* <GetStarted /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
