import React from 'react';
import {
  ButtonComponent,
  SectionComponent,
  TextComponent,
} from '../../../components';
import {appColors} from '../../../constants/appColors';
import {fontFamilies} from '../../../constants/fontFamilies';
import {Google} from 'iconsax-react-native';

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
        icon={<Google size={24} color={appColors.primary} />}
        iconFlex="left"
      />
    </SectionComponent>
  );
};

export default SocialLoginComponent;
