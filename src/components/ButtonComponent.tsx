import React, {ReactNode} from 'react';
import {
  StyleProp,
  TouchableOpacity,
  ViewStyle,
  type TextStyle,
} from 'react-native';
import {appColors} from '../constants/appColors';
import {globalStyle} from '../styles/globalStyles';
import TextComponent from './TextComponent';

interface Props {
  icon?: ReactNode;
  text: string;
  type?: 'primary' | 'text' | 'link';
  color?: string;
  styles?: StyleProp<ViewStyle>;
  textColor?: string;
  textStyles?: StyleProp<TextStyle>;
  iconFlex?: 'right' | 'left';
  onpress?: () => void;
}

const ButtonComponent = (props: Props) => {
  const {
    icon,
    text,
    type,
    color,
    styles,
    textColor,
    textStyles,
    onpress,
    iconFlex,
  } = props;

  return type === 'primary' ? (
    <TouchableOpacity
      style={[
        globalStyle.button,
        {backgroundColor: color ?? appColors.primary},
        styles,
      ]}>
      {icon && icon}
      <TextComponent
        text={text}
        color={textColor ?? appColors.white}
        styles={[textStyles, {marginLeft: icon ? 12 : 0}]}
        flex={icon && iconFlex === 'right' ? 1 : 0}
      />
      {icon && iconFlex === 'right' && icon}
    </TouchableOpacity>
  ) : (
    <TouchableOpacity>
      <TextComponent
        text={text}
        color={
          type === 'link' ? appColors.link : appColors.text
        }></TextComponent>
    </TouchableOpacity>
  );
};

export default ButtonComponent;
