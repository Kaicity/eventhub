import React, {type ReactNode} from 'react';
import type {StyleProp, ViewStyle} from 'react-native';
import {TouchableOpacity, View} from 'react-native';
import {globalStyle} from '../styles/globalStyles';

interface Props {
  justify?:
    | 'center'
    | 'flex-start'
    | 'flex-end'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
    | undefined;
  styles?: StyleProp<ViewStyle>;
  children: ReactNode;
  onPress?: () => void;
}

const RowComponent = (props: Props) => {
  const {justify, styles, children, onPress} = props;

  const localStyle = [globalStyle.row, {justifyContent: justify}, styles];

  return onPress ? (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress} style={localStyle}>
      {children}
    </TouchableOpacity>
  ) : (
    <View style={localStyle}>{children}</View>
  );
};

export default RowComponent;
