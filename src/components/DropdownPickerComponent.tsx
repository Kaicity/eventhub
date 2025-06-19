import React from 'react';
import {View} from 'react-native';
import type {SelectModel} from '../models/select-model';
import TextComponent from './TextComponent';
import RowComponent from './RowComponent';
import {ArrowDown2} from 'iconsax-react-native';
import {appColors} from '../constants/appColors';
import {globalStyle} from '../styles/globalStyles';

interface Props {
  label?: string;
  value: SelectModel[];
  selected?: string | string[];
  onSelect: (val: string) => void;
}

const DropdownPickerComponent = (props: Props) => {
  const {label, onSelect, value, selected} = props;
  return (
    <View>
      {label && <TextComponent text={label} styles={{marginBottom: 8}} />}
      <RowComponent
        styles={[globalStyle.inputContainer, {borderColor: appColors.gray_3}]}>
        <RowComponent styles={{flex: 1}}>
          <TextComponent text="Chọn" />
        </RowComponent>
        <ArrowDown2 size={22} color={appColors.gray_1} />
      </RowComponent>
    </View>
  );
};

export default DropdownPickerComponent;
