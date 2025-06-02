import React, {ReactNode} from 'react';
import {TouchableOpacity, StyleProp, ViewStyle} from 'react-native';
import {globalStyle} from '../styles/globalStyles';
import {appColors} from '../constants/appColors';

interface Props {
  onPress: () => void;
  children: ReactNode;
  styles?: StyleProp<ViewStyle>;
  isShadow?: boolean;
  color?: string;
}

const CardComponent = (props: Props) => {
  const {onPress, children, isShadow, color, styles} = props;

  const localStyles: StyleProp<ViewStyle> = [
    globalStyle.card,
    isShadow ? globalStyle.shadow : undefined,
    {backgroundColor: color ? color : appColors.white},
    styles,
  ];
  return (
    <TouchableOpacity style={localStyles} onPress={onPress}>
      {children}
    </TouchableOpacity>
  );
};

export default CardComponent;
