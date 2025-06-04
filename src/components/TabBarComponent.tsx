import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {appColors} from '../constants/appColors';
import {fontFamilies} from '../constants/fontFamilies';
import RowComponent from './RowComponent';
import TextComponent from './TextComponent';

interface Props {
  title: string;
  onPress?: () => void;
}

const TabBarComponent = (props: Props) => {
  const {title, onPress} = props;
  return (
    <RowComponent
      justify="space-between"
      styles={{marginBottom: 20, paddingHorizontal: 16}}>
      <TextComponent text={title} size={18} font={fontFamilies.medium} />
      {onPress && (
        <RowComponent onPress={onPress}>
          <TextComponent text="See All" size={13} color={appColors.gray_1} />
          <MaterialIcons
            name="arrow-right"
            size={18}
            color={appColors.gray_1}
          />
        </RowComponent>
      )}
    </RowComponent>
  );
};

export default TabBarComponent;
