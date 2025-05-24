import {Lock, Sms} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
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
import {ArrowRight} from '../../assets/svg';
import authenticationAPI from '../../apis/authApi';
import {Controller, useForm} from 'react-hook-form';
import LoginSchema from '../../schemas/loginSchema';
import {yupResolver} from '@hookform/resolvers/yup';
import {LoadingModal} from '../../modals';
import {showToastMessage} from '../../libs';
import {useDispatch} from 'react-redux';
import {addAuth} from '../../redux/reducers/authReducers';
import AsyncStorage from '@react-native-async-storage/async-storage';

const REMEMBER_KEY = 'rememberCredentials';

const LoginScreen = ({navigation}: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRemember, setIsRemember] = useState(false);

  const isDispatch = useDispatch();

  // Giá trị ghi nhớ
  const [initialEmail, setInitialEmail] = useState('');
  const [initialPassword, setInitialPassword] = useState('');

  useEffect(() => {
    const loadRemembered = async () => {
      try {
        const creds = await AsyncStorage.getItem(REMEMBER_KEY);
        if (creds) {
          const {email, password} = JSON.parse(creds);
          setInitialEmail(email);
          setInitialPassword(password);
        }
      } catch (e) {
        // ignore
      }
    };
    loadRemembered();
  }, []);

  const {
    control,
    handleSubmit,
    formState: {errors},
    setValue,
  } = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues: {
      email: initialEmail,
      password: initialPassword,
    },
  });

  useEffect(() => {
    setValue('email', initialEmail);
    setValue('password', initialPassword);
  }, [initialEmail, initialPassword, setValue]);

  const handleLogin = async (data: any) => {
    const {...submitData} = data;

    setIsLoading(true);
    try {
      const res = await authenticationAPI.HandleAuthentication(
        '/login',
        submitData,
        'post',
      );

      // set gia tri auth cho store
      isDispatch(addAuth(res.data));

      await AsyncStorage.setItem('auth', JSON.stringify(res.data));

      // xu ly ghi nho thong tin dang nhap
      await AsyncStorage.setItem('existUser', submitData.email);

      if (isRemember) {
        await AsyncStorage.setItem(
          REMEMBER_KEY,
          JSON.stringify({
            email: submitData.email,
            password: submitData.password,
          }),
        );
      } else {
        await AsyncStorage.removeItem(REMEMBER_KEY);
      }
    } catch (error: any) {
      setIsLoading(false);
      console.log(error);
      showToastMessage({
        type: 'error',
        text1: error?.response?.data?.message || 'Network Errors!',
      });
    } finally {
      setIsLoading(false);
    }
  };

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

        <Controller
          name="email"
          control={control}
          render={({field: {onChange, value}}) => (
            <InputComponent
              placeholder={
                errors.email ? errors.email.message : 'davidhoang@gmail.com'
              }
              value={value}
              onchange={onChange}
              allowClear
              borderColor={errors.email && appColors.danger}
              placeholderTextColor={errors.email && appColors.danger}
              affix={
                <Sms
                  color={errors.email ? appColors.danger : appColors.gray_1}
                  size={22}
                />
              }
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({field: {onChange, value}}) => (
            <InputComponent
              placeholder={
                errors.password ? errors.password.message : 'Your Password'
              }
              value={value}
              onchange={onChange}
              allowClear
              borderColor={errors.password && appColors.danger}
              placeholderTextColor={errors.password && appColors.danger}
              affix={
                <Lock
                  color={errors.password ? appColors.danger : appColors.gray_1}
                  size={22}
                />
              }
              isPassword
            />
          )}
        />

        <RowComponent justify="space-between">
          <RowComponent onPress={() => setIsRemember(!isRemember)}>
            <Switch
              trackColor={{true: appColors.primary}}
              thumbColor={appColors.white}
              value={isRemember}
              onChange={() => setIsRemember(!isRemember)}
            />
            <SpaceComponent width={4} />
            <TextComponent text="Remember Me" />
          </RowComponent>

          <ButtonComponent
            text="Forgot Password?"
            type="text"
            onpress={() => {
              navigation.navigate('ForgotPasswordScreen');
            }}
          />
        </RowComponent>
      </SectionComponent>

      <SpaceComponent height={16} />

      <SectionComponent>
        <ButtonComponent
          onpress={handleSubmit(handleLogin)}
          text="SIGN IN"
          type="primary"
          icon={<ArrowRight />}
          iconFlex="right"
        />
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
      <LoadingModal visible={isLoading} />
    </ContainerComponent>
  );
};

export default LoginScreen;
