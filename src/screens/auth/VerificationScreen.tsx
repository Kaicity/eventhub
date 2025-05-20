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

const VerificationScreen = ({navigation, route}: any) => {
  const {code, fullname, email, password} = route.params;

  const [digits, setDigits] = useState(['', '', '', '']);
  const [verifyCode, setVerifyCode] = useState('');

  // Tạo 4 ref cho 4 input
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
      setVerifyCode(joinedCode);
    } else {
      setVerifyCode('');
    }
  };

  return (
    <ContainerComponent back>
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

        <SpaceComponent height={26} />
        <ButtonComponent
          disable={!verifyCode}
          text="Continue"
          type="primary"
          icon={verifyCode ? <ArrowRight /> : <ArrowRightGray />}
          iconFlex="right"
          onpress={() => {
            console.log(digits);
            console.log(verifyCode);
          }}
        />
      </SectionComponent>
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
