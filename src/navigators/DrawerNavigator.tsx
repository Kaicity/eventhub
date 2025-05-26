import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import DrawerCustomComponent from '../components/DrawerCustomComponent';
import TabNavigator from './TabNavigator';

const DrawerNavigator = () => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      screenOptions={{headerShown: false, drawerPosition: 'left'}}
      drawerContent={props => <DrawerCustomComponent {...props} />}>
      <Drawer.Screen name="HomeNavigator" component={TabNavigator} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
