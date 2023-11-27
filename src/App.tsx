import React, {useEffect, useState} from 'react';
import {Provider} from 'react-redux';
import '@/config/firebase';
import 'react-native-gesture-handler';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {ToastProvider} from 'react-native-toast-notifications';

import store from '@/store';
import {Splash} from '@/screens';
import RootNavigation from '@/navigation';

const App = () => {
  const [showSplash, setShowSplash] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setShowSplash(false);
    }, 2000);
  }, []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <ToastProvider placement="bottom" offsetBottom={50} r>
        <Provider store={store}>
          {showSplash ? <Splash /> : <RootNavigation />}
        </Provider>
      </ToastProvider>
    </GestureHandlerRootView>
  );
};

export default App;
