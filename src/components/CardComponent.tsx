import React, {ReactNode} from 'react';
import {TouchableOpacity, StyleProp, ViewStyle} from 'react-native';
import {globalStyle} from '../styles/globalStyles';

interface Props {
  onPress: () => void;
  children: ReactNode;
  styles?: StyleProp<ViewStyle>;
}

const CardComponent = (props: Props) => {
  const {onPress, children, styles} = props;
  return (
    <TouchableOpacity
      style={[globalStyle.card, globalStyle.shadow, {}, styles]}
      onPress={onPress}>
      {children}
    </TouchableOpacity>
  );
};

export default CardComponent;
