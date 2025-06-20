import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {StatusBar} from 'react-native';
import Toast from 'react-native-toast-message';
import {Provider} from 'react-redux';
import {toastConfig} from './src/libs';
import AppRouter from './src/navigators/AppRouter';
import store from './src/redux/store';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
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
    </GestureHandlerRootView>
  );
};

export default App;
