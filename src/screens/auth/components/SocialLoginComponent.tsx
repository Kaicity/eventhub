import React from 'react';
import {
  ButtonComponent,
  SectionComponent,
  TextComponent,
} from '../../../components';
import {appColors} from '../../../constants/appColors';
import {fontFamilies} from '../../../constants/fontFamilies';
import {Facebook, Google} from '../../../assets/svg';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId:
    '946530783857-0bmrvh1gjrufhl0ci4vlrqqq2dhv3pib.apps.googleusercontent.com',
});

const SocialLoginComponent = () => {
  const loginWithGoogle = async () => {
    await GoogleSignin.hasPlayServices({
      showPlayServicesUpdateDialog: true,
    });
    try {
      await GoogleSignin.hasPlayServices();

      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
    } catch (error) {
      console.log(error);
    }
  };

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
        textFont={fontFamilies.medium}
        iconFlex="left"
        icon={<Google />}
        onpress={loginWithGoogle}
      />

      <ButtonComponent
        text="Login with Facebook"
        type="primary"
        color={appColors.white}
        textColor={appColors.text}
        textFont={fontFamilies.medium}
        iconFlex="left"
        icon={<Facebook />}
      />
    </SectionComponent>
  );
};

export default SocialLoginComponent;
