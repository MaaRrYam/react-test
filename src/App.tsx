import React from 'react';
import AppNavigation from './AppNavigation';

import {Splash} from 'screens';

const App = () => {
  const [showSplash, setShowSplash] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => {
      setShowSplash(false);
    }, 2000);
  }, []);

  return <>{showSplash ? <Splash /> : <AppNavigation />}</>;
};

export default App;
