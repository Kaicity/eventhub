import React from 'react';
import {Button, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {removeAuth} from '../../redux/reducers/authReducers';

const HomeScreen = () => {
  const dispatch = useDispatch();

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Button title="Logout" onPress={() => dispatch(removeAuth({}))} />
    </View>
  );
};

export default HomeScreen;
