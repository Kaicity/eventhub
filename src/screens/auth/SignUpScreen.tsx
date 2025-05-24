import {yupResolver} from '@hookform/resolvers/yup';
import {Lock, Sms, User} from 'iconsax-react-native';
import React, {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
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
import {showToastMessage} from '../../libs';

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
    //Không gửi confirm password chỉ để xác thực với password
    const {confirmPassword, ...submitData} = data;
    setIsLoading(true);
    try {
      const res = await authenticationAPI.HandleAuthentication(
        '/verification',
        {email: submitData.email},
        'post',
      );

      navigation.navigate('VerificationScreen', {
        code: res.data.data.code,
        ...submitData,
      });
    } catch (error: any) {
      setIsLoading(false);
      console.log(`Can not register account errors, ${error}`);
      showToastMessage({
        type: 'error',
        text1: error?.response?.data?.message || 'Network Errors!',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderValidationError = () => {
    const errorMessages = [
      errors.fullname?.message,
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
          name="fullname"
          control={control}
          render={({field: {onChange, value}}) => (
            <InputComponent
              placeholder="full name"
              value={value}
              onchange={onChange}
              allowClear
              borderColor={errors.fullname && appColors.danger}
              placeholderTextColor={errors.fullname && appColors.danger}
              affix={
                <User
                  color={errors.fullname ? appColors.danger : appColors.gray_1}
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

        {renderValidationError()}
      </SectionComponent>

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
