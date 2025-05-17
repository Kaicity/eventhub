import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {addAuth, authSelector} from '../redux/reducers/authReducers';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';

const AppRouter = () => {
  const {getItem} = useAsyncStorage('auth');

  const auth = useSelector(authSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = async () => {
    const res = await getItem();

    res && dispatch(addAuth(JSON.parse(res)));
  };

  return <>{auth.data?.accesstoken ? <MainNavigator /> : <AuthNavigator />}</>;
};

export default AppRouter;
