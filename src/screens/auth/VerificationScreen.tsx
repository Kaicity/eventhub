import React, {useEffect, useRef, useState} from 'react';
import {
  ButtonComponent,
  ContainerComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import {StyleSheet, TextInput} from 'react-native';
import {appColors} from '../../constants/appColors';
import {fontFamilies} from '../../constants/fontFamilies';
import {ArrowRight, ArrowRightGray} from '../../assets/svg';
import authenticationAPI from '../../apis/authApi';
import {LoadingModal} from '../../modals';
import {showToastMessage} from '../../libs';
import {useDispatch} from 'react-redux';
import {addAuth} from '../../redux/reducers/authReducers';
import AsyncStorage from '@react-native-async-storage/async-storage';

const VerificationScreen = ({navigation, route}: any) => {
  const {code, fullname, email, password} = route.params;

  const [currentCode, setCurrentCode] = useState(code);
  const [digits, setDigits] = useState(['', '', '', '']);
  const [newCode, setNewCode] = useState<number>(0);
  const [limit, setLimit] = useState(120);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

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
    if (joinedCode.length === 4 && !newDigits.includes('')) {
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
      setCurrentCode(res.data.code);
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
        const data = {fullname, email, password};
        setIsLoading(true);
        try {
          const res = await authenticationAPI.HandleAuthentication(
            '/register',
            data,
            'post',
          );

          console.log(res);

          dispatch(addAuth(res.data));
          await AsyncStorage.setItem('auth', JSON.stringify(res.data));

          setIsLoading(false);
        } catch (error) {
          console.log(`Can not create new user ${error}`);
          showToastMessage({
            type: 'error',
            text1: 'User email has been registered!',
          });
          setIsLoading(false);
        } finally {
          setIsLoading(false);
        }
      }
    } else {
      showToastMessage({
        type: 'error',
        text1: 'Verification code expired, please resend!',
      });
    }
  };

  return (
    <ContainerComponent back isScroll>
      <SectionComponent>
        <TextComponent text="Verification" title />
        <SpaceComponent height={10} />
        <TextComponent
          text={`We've send you the verification code on ${email.replace(
            /.{1,5}/,
            (m: any) => '*'.repeat(m.length),
          )}`}
          size={16}
        />

        <SpaceComponent height={26} />

        <RowComponent justify="space-around">
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
              text={`0${Math.floor(limit / 60)}:${limit % 60 < 10 ? '0' : ''}${
                limit % 60
              }`}
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

      <LoadingModal visible={isLoading} />
    </ContainerComponent>
  );
};

export default VerificationScreen;

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
