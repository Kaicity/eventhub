import React from 'react';
import {
  ButtonComponent,
  SectionComponent,
  TextComponent,
} from '../../../components';
import {appColors} from '../../../constants/appColors';
import {fontFamilies} from '../../../constants/fontFamilies';
import {Facebook, Google} from '../../../assets/svg';

const SocialLoginComponent = () => {
  return (
    <SectionComponent>
      <TextComponent
        text="OR"
        color={appColors.gray_3}
        size={16}
        font={fontFamilies.medium}
        styles={{textAlign: 'center'}}
      />
      <ButtonComponent
        text="Login with Google"
        type="primary"
        color={appColors.white}
        textColor={appColors.text}
        textFont={fontFamilies.regular}
        iconFlex="left"
        icon={<Google />}
      />

      <ButtonComponent
        text="Login with Facebook"
        type="primary"
        color={appColors.white}
        textColor={appColors.text}
        textFont={fontFamilies.regular}
        iconFlex="left"
        icon={<Facebook />}
      />
    </SectionComponent>
  );
};

export default SocialLoginComponent;
