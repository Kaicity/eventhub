import React from 'react';
import {Button, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {authSelector, removeAuth} from '../../redux/reducers/authReducers';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = () => {
  const dispatch = useDispatch();

  const auth = useSelector(authSelector);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Button
        title="Logout"
        onPress={async () => {
          await AsyncStorage.removeItem('auth');
          dispatch(removeAuth({}));
        }}
      />
    </View>
  );
};

export default HomeScreen;
