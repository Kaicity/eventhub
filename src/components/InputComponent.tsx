import React, {useState, type ReactNode} from 'react';
import {
  TextInput,
  TouchableOpacity,
  View,
  type KeyboardType,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {appColors} from '../constants/appColors';
import {globalStyle} from '../styles/globalStyles';

interface Props {
  value: string;
  onchange: (val: string) => void;
  placeholder?: string;
  placeholderTextColor?: string;
  borderColor?: string;
  affix?: ReactNode;
  suffix?: ReactNode;
  isPassword?: boolean;
  allowClear?: boolean;
  type?: KeyboardType;
  multiLine?: boolean;
  numberOfLine?: number;
  onEnter?: () => void;
  styles?: StyleProp<ViewStyle>;
}

const InputComponent = (props: Props) => {
  const {
    value,
    onchange,
    placeholder,
    placeholderTextColor,
    borderColor,
    affix,
    suffix,
    isPassword,
    allowClear,
    type,
    multiLine,
    numberOfLine,
    onEnter,
    styles,
  } = props;

  const [isShowPassword, setIsShowPassword] = useState(isPassword ?? false);

  return (
    <View
      style={[
        globalStyle.inputContainer,
        {
          borderColor: borderColor ?? appColors.gray_3,
        },
        styles,
      ]}>
      {affix ?? affix}
      <TextInput
        style={[globalStyle.input, globalStyle.text]}
        value={value}
        onChange={e => onchange(e.nativeEvent.text)}
        placeholder={placeholder ?? ''}
        secureTextEntry={isShowPassword}
        placeholderTextColor={placeholderTextColor ?? appColors.gray_2}
        keyboardType={type ?? 'default'}
        autoCapitalize="none"
        onEndEditing={onEnter}
        multiline={multiLine}
        numberOfLines={numberOfLine}
      />
      {suffix ?? suffix}
      <TouchableOpacity
        onPress={
          isPassword
            ? () => setIsShowPassword(!isShowPassword)
            : () => onchange('')
        }>
        {isPassword ? (
          <FontAwesome
            name={isShowPassword ? 'eye-slash' : 'eye'}
            size={22}
            color={appColors.gray_1}
          />
        ) : (
          value &&
          value.length > 0 &&
          allowClear && (
            <AntDesign name="close" size={22} color={appColors.text} />
          )
        )}
      </TouchableOpacity>
    </View>
  );
};

export default InputComponent;
