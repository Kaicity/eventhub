import React, {useEffect, useRef, useState} from 'react';
import {
  ButtonComponent,
  ContainerComponent,
  InputComponent,
  RowComponent,
  SectionComponent,
  TextComponent,
} from '../../components';
import {StyleSheet, TextInput} from 'react-native';
import {appColors} from '../../constants/appColors';
import {fontFamilies} from '../../constants/fontFamilies';
import authenticationAPI from '../../apis/authApi';
import {ProgressStep, ProgressSteps} from 'react-native-progress-steps';
import {showToastMessage} from '../../libs';
import {ArrowRight, ArrowRightGray} from '../../assets/svg';
import * as Yup from 'yup';
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {Lock} from 'iconsax-react-native';
import {LoadingModal} from '../../modals';

const ChangePasswordScreen = ({navigation, route}: any) => {
  const {code, email} = route.params;

  const [currentCode, setCurrentCode] = useState(code);
  const [digits, setDigits] = useState(['', '', '', '', '', '']);
  const [newCode, setNewCode] = useState<number>(0);
  const [limit, setLimit] = useState(120);
  const [step, setStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const ResetPasswordSchema = Yup.object().shape({
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(ResetPasswordSchema),
  });

  useEffect(() => {
    if (limit > 0) {
      const interval = setInterval(() => {
        setLimit(limit => limit - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [limit]);

  const inputRefs = [
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
  ];

  // Hàm xử lý khi nhập xong 1 ký tự
  const handleChangeText = (text: string, index: number) => {
    const newDigits = [...digits];
    newDigits[index] = text;
    setDigits(newDigits);

    if (text && index < inputRefs.length - 1) {
      inputRefs[index + 1].current?.focus();
    }

    // Nếu đã nhập đủ 4 ký tự, set verifycode
    const joinedCode = newDigits.join('');
    if (joinedCode.length === 6 && !newDigits.includes('')) {
      setNewCode(Number(joinedCode));
    } else {
      setNewCode(0);
    }
  };

  const handleResendVerification = async () => {
    setIsLoading(true);
    try {
      const res: any = await authenticationAPI.HandleAuthentication(
        '/verification',
        {email},
        'post',
      );

      //reset gia tri
      setCurrentCode(res.data.data.code);
      setLimit(120);
      setDigits(['', '', '', '']);

      setIsLoading(false);
    } catch (error) {
      console.log(`Can not send verification code ${error}`);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerification = async () => {
    if (limit > 0) {
      if (newCode !== currentCode) {
        showToastMessage({
          type: 'error',
          text1: 'Invalid verification code, please try again',
        });
      } else {
        setStep(1);
      }
    } else {
      setStep(0);
      showToastMessage({
        type: 'error',
        text1: 'Verification code expired, please resend!',
      });
    }
  };

  const renderValidationError = () => {
    const errorMessages = [
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

  const handleNewPassword = async (data: any) => {
    const {password} = data;
    setIsLoading(true);
    try {
      const res = await authenticationAPI.HandleAuthentication(
        '/changePassword',
        {email: email, password},
        'post',
      );

      showToastMessage({
        type: 'success',
        text1: res.data.message,
      });

      setIsLoading(false);
      navigation.navigate('LoginScreen');
    } catch (error) {
      setIsLoading(false);
      console.log(`Can not change password error, ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ContainerComponent back isScroll>
      <ProgressSteps
        activeStep={step}
        completedStepIconColor={appColors.primary}
        activeStepIconBorderColor={appColors.primary}
        labelColor={appColors.primary}
        activeLabelColor={appColors.primary}
        completedLabelColor={appColors.primary}
        progressBarColor={appColors.primary}>
        <ProgressStep
          label="Verification"
          buttonFillColor={appColors.primary}
          buttonNextText="Verify"
          removeBtnRow
          buttonNextDisabled={!newCode}>
          <SectionComponent>
            <RowComponent justify="center" styles={{gap: 4}}>
              {inputRefs.map((ref, index) => (
                <TextInput
                  value={digits[index]}
                  key={index}
                  ref={ref}
                  placeholder="-"
                  style={styles.input}
                  maxLength={1}
                  keyboardType="number-pad"
                  onChangeText={text => handleChangeText(text, index)}
                />
              ))}
            </RowComponent>
          </SectionComponent>

          <SectionComponent styles={{marginTop: 40}}>
            <ButtonComponent
              disable={!newCode}
              text="Continue"
              type="primary"
              icon={newCode ? <ArrowRight /> : <ArrowRightGray />}
              iconFlex="right"
              onpress={handleVerification}
            />
          </SectionComponent>

          <SectionComponent>
            {limit > 0 ? (
              <RowComponent justify="center">
                <TextComponent text="Re-send code in " flex={0} />
                <TextComponent
                  text={`0${Math.floor(limit / 60)}:${
                    limit % 60 < 10 ? '0' : ''
                  }${limit % 60}`}
                  flex={0}
                  color={appColors.link}
                />
              </RowComponent>
            ) : (
              <RowComponent justify="center">
                <ButtonComponent
                  text="Re-send email verification code"
                  type="link"
                  onpress={handleResendVerification}
                />
              </RowComponent>
            )}
          </SectionComponent>
        </ProgressStep>

        <ProgressStep
          label="Change Password"
          buttonFillColor={appColors.primary}
          buttonNextText="Save change"
          removeBtnRow>
          <SectionComponent>
            <Controller
              name="password"
              control={control}
              render={({field: {onChange, value}}) => (
                <InputComponent
                  placeholder="New Password"
                  value={value}
                  onchange={onChange}
                  allowClear
                  borderColor={errors.password && appColors.danger}
                  placeholderTextColor={errors.password && appColors.danger}
                  affix={
                    <Lock
                      color={
                        errors.password ? appColors.danger : appColors.gray_1
                      }
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
                  placeholderTextColor={
                    errors.confirmPassword && appColors.danger
                  }
                  affix={
                    <Lock
                      color={
                        errors.confirmPassword
                          ? appColors.danger
                          : appColors.gray_1
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
              disable={!newCode}
              text="Save Change"
              type="primary"
              icon={newCode ? <ArrowRight /> : <ArrowRightGray />}
              iconFlex="right"
              onpress={handleSubmit(handleNewPassword)}
            />
          </SectionComponent>
        </ProgressStep>
      </ProgressSteps>

      <LoadingModal visible={isLoading} />
    </ContainerComponent>
  );
};

export default ChangePasswordScreen;

const styles = StyleSheet.create({
  input: {
    height: 55,
    width: 55,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: appColors.gray_3,
    alignItems: 'center',
    fontSize: 24,
    fontFamily: fontFamilies.bold,
    textAlign: 'center',
  },
});
