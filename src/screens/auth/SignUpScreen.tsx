import {yupResolver} from '@hookform/resolvers/yup';
import {Lock, Sms, User} from 'iconsax-react-native';
import React, {useState} from 'react';
import {useForm, Controller} from 'react-hook-form';
import authenticationAPI from '../../apis/authApi';
import {ArrowRight} from '../../assets/svg';
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
import {LoadingModal} from '../../modals';
import RegisterSchema from '../../schemas/registerSchema';
import SocialLoginComponent from './components/SocialLoginComponent';

const SignUpScreen = ({navigation}: any) => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(RegisterSchema),
  });

  const handleRegister = async (data: any) => {
    setIsLoading(true);
    try {
      const res = await authenticationAPI.HandleAuthentication(
        'register',
        data,
        'post',
      );
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const renderValidationError = () => {
    const errorMessages = [
      errors.username?.message,
      errors.email?.message,
      errors.password?.message,
      errors.confirmPassword?.message,
    ].filter(Boolean);

    if (errorMessages.length > 0) {
      return (
        <TextComponent
          text={`* ${errorMessages.join('\n* ')}`}
          color={appColors.danger}
        />
      );
    }
    return null;
  };

  return (
    <ContainerComponent isImageBackground isScroll back>
      <SectionComponent>
        <TextComponent text="Sign up" title size={24} />
        <SpaceComponent height={21} />

        <Controller
          name="username"
          control={control}
          render={({field: {onChange, value}}) => (
            <InputComponent
              placeholder="Username"
              value={value}
              onchange={onChange}
              allowClear
              borderColor={errors.username && appColors.danger}
              placeholderTextColor={errors.username && appColors.danger}
              affix={
                <User
                  color={errors.username ? appColors.danger : appColors.gray_1}
                  size={22}
                />
              }
            />
          )}
        />

        <Controller
          name="email"
          control={control}
          render={({field: {onChange, value}}) => (
            <InputComponent
              placeholder="davidhoang@gmail.com"
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
              placeholder="Your Password"
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

        <Controller
          name="confirmPassword"
          control={control}
          render={({field: {onChange, value}}) => (
            <InputComponent
              placeholder="Confirm password"
              value={value}
              onchange={onChange}
              allowClear
              borderColor={errors.confirmPassword && appColors.danger}
              placeholderTextColor={errors.confirmPassword && appColors.danger}
              affix={
                <Lock
                  color={
                    errors.confirmPassword ? appColors.danger : appColors.gray_1
                  }
                  size={22}
                />
              }
              isPassword
            />
          )}
        />
      </SectionComponent>

      <SectionComponent>{renderValidationError()}</SectionComponent>

      <SpaceComponent height={16} />

      <SectionComponent>
        <ButtonComponent
          text="SIGN UP"
          type="primary"
          icon={<ArrowRight />}
          iconFlex="right"
          onpress={handleSubmit(handleRegister)}
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
      <LoadingModal visible={isLoading} />
    </ContainerComponent>
  );
};

export default SignUpScreen;
