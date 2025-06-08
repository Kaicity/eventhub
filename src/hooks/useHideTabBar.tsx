import {useNavigation} from '@react-navigation/native';
import {useLayoutEffect} from 'react';
import {Platform} from 'react-native';
import {appColors} from '../constants/appColors';

const useHideTabBar = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    const parent = navigation.getParent();

    parent?.setOptions({tabBarStyle: {display: 'none'}});

    return () =>
      parent?.setOptions({
        tabBarStyle: {
          height: Platform.OS === 'ios' ? 88 : 68,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: appColors.white,
        },
      });
  }, [navigation]);
};

export default useHideTabBar;
