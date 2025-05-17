import React from 'react';
import {Button, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {removeAuth} from '../../redux/reducers/authReducers';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = () => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    dispatch(removeAuth({}));
    await AsyncStorage.removeItem('auth');
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default HomeScreen;
