import React from 'react';
import {
  ButtonComponent,
  SectionComponent,
  TextComponent,
} from '../../../components';
import {appColors} from '../../../constants/appColors';
import {fontFamilies} from '../../../constants/fontFamilies';
import {Facebook, Google} from '../../../assets/svg';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {appInfo} from '../../../constants/appInfos';
import {LoginButton, Settings} from 'react-native-fbsdk-next';

GoogleSignin.configure({
  webClientId: appInfo.WEB_CLIENT_ID,
  scopes: ['https://www.googleapis.com/auth/drive.readonly'],
  forceCodeForRefreshToken: false,
  iosClientId: appInfo.IOS_CLIENT_ID,
});

Settings.setAppID('1635060480335963');

const SocialLoginComponent = () => {
  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      if (response) {
        console.log({userInfo: response.data});
      } else {
        // sign in was cancelled by user
      }
    } catch (error: any) {
      if (error) {
        switch (error.code) {
          case statusCodes.IN_PROGRESS:
            // operation (eg. sign in) already in progress
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            // Android only, play services not available or outdated
            break;
          default:
          // some other error happened
        }
      } else {
        // an error that's not related to google sign in occurred
      }
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
        onpress={() => signInWithGoogle()}
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
