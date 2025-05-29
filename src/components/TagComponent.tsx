import React, {type ReactNode} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import {globalStyle} from '../styles/globalStyles';
import TextComponent from './TextComponent';
import {appColors} from '../constants/appColors';

interface Props {
  onPress?: () => void;
  icon?: ReactNode;
  label: string;
  textColor?: string;
  bgColor?: string;
  styles?: StyleProp<ViewStyle>;
}

const TagComponent = (props: Props) => {
  const {onPress, label, textColor, bgColor, icon, styles} = props;
  return (
    <TouchableOpacity
      style={[
        globalStyle.row,
        globalStyle.tag,
        {
          backgroundColor: bgColor ?? appColors.primary,
        },
        styles,
      ]}>
      {icon && icon}
      <TextComponent
        text={label}
        styles={{marginLeft: icon ? 8 : 0}}
        color={textColor}
      />
    </TouchableOpacity>
  );
};

export default TagComponent;
