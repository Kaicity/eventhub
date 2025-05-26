import React, {ReactNode} from 'react';
import {StyleProp, TouchableOpacity, View, ViewStyle} from 'react-native';
import {appColors} from '../constants/appColors';

interface Props {
  size?: number;
  children: ReactNode;
  color?: string;
  onpress?: () => void;
  styles?: StyleProp<ViewStyle>;
}

const CircleComponent = (props: Props) => {
  const {size, children, color, onpress, styles} = props;

  const localStyle: any = {
    width: size ?? 40,
    height: size ?? 40,
    backgroundColor: color ?? appColors.primary,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  };

  return onpress ? (
    <TouchableOpacity style={[localStyle, styles]}>{children}</TouchableOpacity>
  ) : (
    <View style={[localStyle, styles]}>{children}</View>
  );
};

export default CircleComponent;
