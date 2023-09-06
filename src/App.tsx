import React from 'react';
import {Splash} from './screens';
import '@/config/firebase';
import RootNavigation from './navigation';

const App = () => {
  const [showSplash, setShowSplash] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => {
      setShowSplash(false);
    }, 2000);
  }, []);

  return <>{showSplash ? <Splash /> : <RootNavigation />}</>;
};

export default App;
