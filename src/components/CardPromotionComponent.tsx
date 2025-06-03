import React, {ReactNode} from 'react';
import {View, type StyleProp, type ViewStyle} from 'react-native';
import {appColors} from '../constants/appColors';

interface Props {
  children: ReactNode;
  bgColor?: string;
  styles?: StyleProp<ViewStyle>;
}

const CardPromotionComponent = (props: Props) => {
  const {children, bgColor, styles} = props;
  return (
    <View
      style={[
        {
          width: '100%',
          height: 127,
          borderRadius: 12,
          backgroundColor: bgColor ? bgColor : appColors.primary,
        },
        styles,
      ]}>
      {children}
    </View>
  );
};

export default CardPromotionComponent;
