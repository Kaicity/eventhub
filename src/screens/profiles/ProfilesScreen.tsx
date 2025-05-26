import React from 'react';
import {Text} from 'react-native';
import {useDispatch} from 'react-redux';
import {ButtonComponent, ContainerComponent} from '../../components';
import {removeAuth} from '../../redux/reducers/authReducers';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfilesScreen = () => {
  const dispatch = useDispatch();
  return (
    <ContainerComponent>
      <Text>ProfilesScreen</Text>

      <ButtonComponent
        text="Logout"
        type="primary"
        onpress={async () => {
          dispatch(removeAuth({}));
          await AsyncStorage.removeItem('auth');
        }}
      />
    </ContainerComponent>
  );
};

export default ProfilesScreen;
