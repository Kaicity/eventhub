import React, {useState} from 'react';
import {
  ButtonComponent,
  ContainerComponent,
  InputComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import {Sms} from 'iconsax-react-native';
import {appColors} from '../../constants/appColors';
import {ArrowRight} from '../../assets/svg';
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import authenticationAPI from '../../apis/authApi';
import {LoadingModal} from '../../modals';
import {Alert} from 'react-native';
import {showToastMessage} from '../../libs';

const ForgotPasswordScreen = ({navigation}: any) => {
  const [isLoading, setIsLoading] = useState(false);

  const EmailAttributeSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
  });

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(EmailAttributeSchema),
  });

  const renderValidationError = () => {
    const errorMessages = [errors.email?.message].filter(Boolean);

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

  const handleResetPassword = async (data: any) => {
    const {...submitData} = data;

    setIsLoading(true);
    try {
      const res = await authenticationAPI.HandleAuthentication(
        '/forgotPassword',
        submitData,
        'post',
      );

      Alert.alert('Send mail', 'We sended a email includes new password!');
      navigation.navigate('ChangePasswordScreen', {
        code: res.data.data.resetCode,
        ...submitData,
      });

      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      console.log(`Can not create new password api forgot password, ${error}`);
      showToastMessage({type: 'error', text1: error || 'Network errors!'});
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ContainerComponent isImageBackground back>
      <SectionComponent>
        <TextComponent text="Reset Password" title />
        <SpaceComponent height={10} />
        <TextComponent
          text="Please enter your email address to request a password reset"
          size={16}
        />
        <SpaceComponent height={26} />

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

        {renderValidationError()}
      </SectionComponent>

      <SectionComponent>
        <ButtonComponent
          onpress={handleSubmit(handleResetPassword)}
          text="Send"
          type="primary"
          icon={<ArrowRight />}
          iconFlex="right"
        />
      </SectionComponent>

      <LoadingModal visible={isLoading} />
    </ContainerComponent>
  );
};

export default ForgotPasswordScreen;
