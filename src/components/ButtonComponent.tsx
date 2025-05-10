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
import {fontFamilies} from '../constants/fontFamilies';

interface Props {
  icon?: ReactNode;
  text: string;
  type?: 'primary' | 'text' | 'link';
  color?: string;
  styles?: StyleProp<ViewStyle>;
  textColor?: string;
  textStyles?: StyleProp<TextStyle>;
  textFont?: string;
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
    textFont,
    onpress,
    iconFlex,
  } = props;

  return type === 'primary' ? (
    <TouchableOpacity
      onPress={onpress}
      style={[
        globalStyle.button,
        globalStyle.shadow,
        {
          backgroundColor: color ?? appColors.primary,
          marginBottom: 17,
          width: '80%',
        },
        styles,
      ]}>
      {icon && iconFlex === 'left' && icon}
      <TextComponent
        text={text}
        color={textColor ?? appColors.white}
        styles={[textStyles, {marginLeft: icon ? 12 : 0}, {fontSize: 16}]}
        flex={icon && iconFlex === 'right' ? 1 : 0}
        font={textFont ?? fontFamilies.medium}
      />
      {icon && iconFlex === 'right' && icon}
    </TouchableOpacity>
  ) : (
    <TouchableOpacity onPress={onpress}>
      <TextComponent
        text={text}
        color={type === 'link' ? appColors.link : appColors.text}
      />
    </TouchableOpacity>
  );
};

export default ButtonComponent;
