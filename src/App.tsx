import React, {useEffect, useState} from 'react';
import {Provider} from 'react-redux';
import '@/config/firebase';
import 'react-native-gesture-handler';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import store from '@/store';
import {Splash} from '@/screens';
import RootNavigation from '@/navigation';
import ToastProvider from 'react-native-toast-message';

const App = () => {
  const [showSplash, setShowSplash] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setShowSplash(false);
    }, 2000);
  }, []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Provider store={store}>
        {showSplash ? <Splash /> : <RootNavigation />}
      </Provider>
      <ToastProvider bottomOffset={50} position="bottom" />
    </GestureHandlerRootView>
  );
};

export default App;
