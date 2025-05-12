import {Lock, Sms, User} from 'iconsax-react-native';
import React, {useState} from 'react';
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
import {ArrowRight} from '../../assets/svg';

const initValue = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUpScreen = ({navigation}: any) => {
  const [values, setValues] = useState(initValue);

  const handleChangeValue = (key: string, value: string) => {
    const data: any = {...values};
    data[`${key}`] = value;
    setValues(data);
  };

  return (
    <ContainerComponent isImageBackground isScroll back>
      <SectionComponent>
        <TextComponent text="Sign up" title size={24} />
        <SpaceComponent height={21} />
        <InputComponent
          placeholder="User name"
          value={values.username}
          onchange={val => handleChangeValue('username', val)}
          allowClear
          affix={<User color={appColors.gray_1} size={22} />}
        />
        <InputComponent
          placeholder="davidhoang@gmail.com"
          value={values.email}
          onchange={val => handleChangeValue('email', val)}
          allowClear
          affix={<Sms color={appColors.gray_1} size={22} />}
        />
        <InputComponent
          placeholder="Your password"
          value={values.password}
          onchange={val => handleChangeValue('password', val)}
          allowClear
          isPassword
          affix={<Lock color={appColors.gray_1} size={22} />}
        />
        <InputComponent
          placeholder="Confirm password"
          value={values.confirmPassword}
          onchange={val => handleChangeValue('confirmPassword', val)}
          allowClear
          isPassword
          affix={<Lock color={appColors.gray_1} size={22} />}
        />
      </SectionComponent>

      <SpaceComponent height={16} />

      <SectionComponent>
        <ButtonComponent
          text="SIGN UP"
          type="primary"
          icon={<ArrowRight />}
          iconFlex="right"
          onpress={() => {
            console.log(values);
            navigation.navigate('VericationScreen');
          }}
        />
      </SectionComponent>

      <SocialLoginComponent />

      <SectionComponent>
        <RowComponent justify="center">
          <TextComponent text="Already have an account? " />
          <ButtonComponent
            text="Signin"
            type="link"
            onpress={() => navigation.navigate('LoginScreen')}
          />
        </RowComponent>
      </SectionComponent>
    </ContainerComponent>
  );
};

export default SignUpScreen;
