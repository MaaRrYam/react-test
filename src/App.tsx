import React from 'react';
import {View, StyleSheet} from 'react-native';
import {PaperProvider} from 'react-native-paper';

import {
  Splash,
  SignIn,
  SelectRole,
  RequestAccess,
  RequestAccessComplete,
  GetStarted,
  Education,
  Industry,
  Experience,
  EmploymentStatus,
  SalaryExpectations,
  OnboardingCompleted,
} from 'screens';

const App = () => {
  const [showSplash, setShowSplash] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => {
      setShowSplash(false);
    }, 2000);
  }, []);

  return (
    <PaperProvider>
      {showSplash ? (
        <Splash />
      ) : (
        <View style={styles.container}>
          {/* <SignIn /> */}
          {/* <SelectRole /> */}
          {/* <RequestAccess /> */}
          {/* <RequestAccessComplete /> */}
          {/* <GetStarted /> */}
          {/* <Education /> */}
          {/* <Industry /> */}
          {/* <Experience /> */}
          {/* <EmploymentStatus /> */}
          {/* <SalaryExpectations /> */}
          <OnboardingCompleted />
        </View>
      )}
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
