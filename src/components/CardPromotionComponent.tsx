import React, {ReactNode} from 'react';
import {StyleSheet, View} from 'react-native';
import {appColors} from '../constants/appColors';

interface Props {
  children: ReactNode;
  bgColor?: string;
}

const CardPromotionComponent = (props: Props) => {
  const {children, bgColor} = props;
  return (
    <View
      style={[
        styles.container,
        {backgroundColor: bgColor ? bgColor : appColors.primary},
      ]}>
      {children}
    </View>
  );
};

export default CardPromotionComponent;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 127,
    borderRadius: 8,
  },
});
