import {useNavigation} from '@react-navigation/native';
import {ArrowLeft} from 'iconsax-react-native';
import React, {ReactNode} from 'react';
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  View,
} from 'react-native';
import {appColors} from '../constants/appColors';
import {fontFamilies} from '../constants/fontFamilies';
import {globalStyle} from '../styles/globalStyles';
import RowComponent from './RowComponent';
import TextComponent from './TextComponent';

interface Props {
  isImageBackground?: boolean;
  isScroll?: boolean;
  title?: string;
  children: ReactNode;
  back?: boolean;
}

const ContainerComponent = (props: Props) => {
  const {isImageBackground, isScroll, title, children, back} = props;
  const navigation: any = useNavigation();

  const headerComponent = () => {
    return (
      <View style={{flex: 1, paddingTop: 30}}>
        {(title || back) && (
          <RowComponent
            justify="flex-start"
            styles={{
              paddingHorizontal: 16,
              paddingVertical: 10,
              minWidth: 48,
              minHeight: 48,
            }}>
            {back && (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{marginRight: 12}}>
                <ArrowLeft size={24} color={appColors.text} />
              </TouchableOpacity>
            )}
            {title && (
              <TextComponent
                text={title}
                size={20}
                font={fontFamilies.medium}
              />
            )}
          </RowComponent>
        )}

        {isScroll ? (
          <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
            {children}
          </ScrollView>
        ) : (
          <View style={{flex: 1}}>{children}</View>
        )}
      </View>
    );
  };

  return isImageBackground ? (
    <ImageBackground
      source={require('../assets/images/splash-img.png')}
      style={{flex: 1}}
      resizeMode="cover">
      <SafeAreaView style={{flex: 1}}>{headerComponent()}</SafeAreaView>
    </ImageBackground>
  ) : (
    <SafeAreaView style={[globalStyle.container]}>
      <StatusBar barStyle="dark-content" />
      {headerComponent()}
    </SafeAreaView>
  );
};

export default ContainerComponent;
