import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import '@/config/firebase';
import 'react-native-gesture-handler';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {ToastProvider} from 'react-native-toast-notifications';
import SplashScreen from 'react-native-splash-screen';

import store from '@/store';
import RootNavigation from '@/navigation';
import {Platform} from 'react-native';
import CustomToast from './components/CustomToast';

const App = () => {
  useEffect(() => {
    if (Platform.OS === 'android') {
      SplashScreen.hide();
    }
  }, []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <ToastProvider
        placement="bottom"
        offsetBottom={50}
        renderType={{
          with_close_button: toast => <CustomToast toast={toast} />,
        }}>
        <Provider store={store}>
          <RootNavigation />
        </Provider>
      </ToastProvider>
    </GestureHandlerRootView>
  );
};

export default App;
