import React, {useState} from 'react';
import {View} from 'react-native';
import {InputComponent} from '../../components';
import {globalStyle} from '../../styles/globalStyles';
import {Lock, Sms} from 'iconsax-react-native';
import {appColors} from '../../constants/appColors';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View
      style={[
        globalStyle.container,
        {justifyContent: 'center', alignItems: 'center', padding: 20},
      ]}>
      <InputComponent
        placeholder="Email"
        value={email}
        onchange={val => setEmail(val)}
        allowClear
        affix={<Sms color={appColors.gray_1} size={22} />}
      />
      <InputComponent
        placeholder="Password"
        value={password}
        onchange={val => setPassword(val)}
        allowClear
        isPassword
        affix={<Lock color={appColors.gray_1} size={22} />}
      />
    </View>
  );
};

export default LoginScreen;
