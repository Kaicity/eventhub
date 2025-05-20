import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {
  ForgotPasswordScreen,
  LoginScreen,
  SignUpScreen,
  VerificationScreen,
} from '../screens';
import OnboardingScreen from '../screens/auth/OnboardingScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthNavigator = () => {
  const [isExistingUser, setIsExistingUser] = useState(false);

  useEffect(() => {
    checkUserExisting();
  }, []);

  const Stack = createNativeStackNavigator();

  const checkUserExisting = async () => {
    const res = await AsyncStorage.getItem('existUser');
    res && setIsExistingUser(true);
  };

  console.log(isExistingUser);

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {!isExistingUser && (
        <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
      )}
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      <Stack.Screen name="VerificationScreen" component={VerificationScreen} />
      <Stack.Screen
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreen}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
