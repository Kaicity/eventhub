import {Lock, Sms} from 'iconsax-react-native';
import React, {useState} from 'react';
import {Image, Switch} from 'react-native';
import {
  ButtonComponent,
  ContainerComponent,
  InputComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import {appColors} from '../../constants/appColors';
import SocialLoginComponent from './components/SocialLoginComponent';

const LoginScreen = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRemember, setIsRemember] = useState(true);

  return (
    <ContainerComponent isImageBackground isScroll>
      <SectionComponent
        styles={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 75,
          marginBottom: 30,
        }}>
        <Image
          source={require('../../assets/images/text-logo.png')}
          style={{width: 162, height: 114}}
        />
      </SectionComponent>

      <SectionComponent>
        <TextComponent text="Sign in" title size={24} />
        <SpaceComponent height={21} />
        <InputComponent
          placeholder="davidhoang@gmail.com"
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
        <RowComponent justify="space-between">
          <RowComponent onPress={() => setIsRemember(!isRemember)}>
            <Switch
              trackColor={{true: appColors.primary}}
              thumbColor={appColors.white}
              value={isRemember}
              onChange={() => setIsRemember(!isRemember)}
            />
            <TextComponent text="Remember Me" />
          </RowComponent>
          <ButtonComponent
            text="Forgot Password?"
            type="text"
            onpress={() => {}}
          />
        </RowComponent>
      </SectionComponent>

      <SpaceComponent height={16} />

      <SectionComponent styles={{alignItems: 'center'}}>
        <ButtonComponent text="SIGN IN" type="primary" />
      </SectionComponent>

      <SocialLoginComponent />

      <SectionComponent>
        <RowComponent justify="center">
          <TextComponent text="Dont't have an account? " />
          <ButtonComponent
            text="Sign up"
            type="link"
            onpress={() => navigation.navigate('SignUpScreen')}
          />
        </RowComponent>
      </SectionComponent>
    </ContainerComponent>
  );
};

export default LoginScreen;
