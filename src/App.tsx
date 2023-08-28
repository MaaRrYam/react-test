import React from 'react';
import {PaperProvider} from 'react-native-paper';
import AppNavigation from './AppNavigation';

import {Splash} from 'screens';

const App = () => {
  const [showSplash, setShowSplash] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => {
      setShowSplash(false);
    }, 2000);
  }, []);

  return (
    <PaperProvider>{showSplash ? <Splash /> : <AppNavigation />}</PaperProvider>
  );
};

export default App;
