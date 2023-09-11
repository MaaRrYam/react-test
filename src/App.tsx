import React, {useEffect, useState} from 'react';
import {Splash} from './screens';
import '@/config/firebase';
import RootNavigation from './navigation';
import 'react-native-gesture-handler';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowSplash(false);
    }, 2000);
  }, []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      {showSplash ? <Splash /> : <RootNavigation />}
    </GestureHandlerRootView>
  );
};

export default App;
