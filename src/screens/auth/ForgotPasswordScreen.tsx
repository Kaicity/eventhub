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

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');
  return (
    <ContainerComponent isImageBackground back>
      <SectionComponent>
        <TextComponent text="Resset Password" title />
        <SpaceComponent height={10} />
        <TextComponent
          text="Please enter your email address to request a password reset"
          size={16}
        />
        <SpaceComponent height={26} />
        <InputComponent
          value={email}
          onchange={val => setEmail(email)}
          affix={<Sms size={20} color={appColors.gray_1} />}
          placeholder="davidhoang@gmail.com"
        />
      </SectionComponent>

      <SectionComponent>
        <ButtonComponent
          text="Send"
          type="primary"
          icon={<ArrowRight />}
          iconFlex="right"
        />
      </SectionComponent>
    </ContainerComponent>
  );
};

export default ForgotPasswordScreen;
