import React, {ReactNode} from 'react';
import {ImageBackground, SafeAreaView, ScrollView, View} from 'react-native';
import {globalStyle} from '../styles/globalStyles';

interface Props {
  isImageBackground?: boolean;
  isScroll?: boolean;
  title?: string;
  children: ReactNode;
}

const ContainerComponent = (props: Props) => {
  const {isImageBackground, isScroll, title, children} = props;

  const returnContainer = isScroll ? (
    <ScrollView style={{flex: 1}}>{children}</ScrollView>
  ) : (
    <View style={{flex: 1}}>{children}</View>
  );

  return isImageBackground ? (
    <ImageBackground
      source={require('../assets/images/splash-img.png')}
      style={{flex: 1}}
      resizeMode="cover">
      <SafeAreaView style={{flex: 1}}> {returnContainer}</SafeAreaView>
    </ImageBackground>
  ) : (
    <SafeAreaView style={[globalStyle.container]}>
      <View> {returnContainer}</View>
    </SafeAreaView>
  );
};

export default ContainerComponent;
