import React, {useState} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import Swiper from 'react-native-swiper';
import {TextComponent} from '../../components';
import {appColors} from '../../constants/appColors';
import {appInfo} from '../../constants/appInfos';
import {fontFamilies} from '../../constants/fontFamilies';
import {globalStyle} from '../../styles/globalStyles';

const OnboardingScreen = ({navigation}: any) => {
  const [index, setIndex] = useState(0);

  return (
    <View style={[globalStyle.container]}>
      <Swiper
        style={{}}
        loop={false}
        onIndexChanged={num => setIndex(num)}
        index={index}
        activeDotColor={appColors.white}>
        <Image
          source={require('../../assets/images/onboarding-1.png')}
          style={{flex: 1, width: appInfo.sizes.WIDTH, resizeMode: 'cover'}}
        />

        <Image
          source={require('../../assets/images/onboarding-2.png')}
          style={{flex: 1, width: appInfo.sizes.WIDTH, resizeMode: 'cover'}}
        />

        <Image
          source={require('../../assets/images/onboarding-3.png')}
          style={{flex: 1, width: appInfo.sizes.WIDTH, resizeMode: 'cover'}}
        />
      </Swiper>
      <View
        style={{
          paddingHorizontal: 16,
          paddingVertical: 20,
          position: 'absolute',
          bottom: 0,
          right: 0,
          left: 0,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
          <TextComponent
            text="Skip"
            color={appColors.gray_3}
            font={fontFamilies.medium}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            index < 2 ? setIndex(index + 1) : navigation.navigate('LoginScreen')
          }>
          <TextComponent
            text="Next"
            color={appColors.white}
            font={fontFamilies.medium}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OnboardingScreen;
