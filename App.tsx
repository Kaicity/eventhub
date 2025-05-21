import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import AppRouter from './src/navigators/AppRouter';
import store from './src/redux/store';
import Toast from 'react-native-toast-message';
import {toastConfig} from './src/libs';

const App = () => {
  return (
    <>
      <Provider store={store}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent
        />

        <NavigationContainer>
          <AppRouter />
        </NavigationContainer>
      </Provider>
      <Toast config={toastConfig} />
    </>
  );
};

export default App;
