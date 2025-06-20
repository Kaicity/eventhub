import {ArrowDown2} from 'iconsax-react-native';
import React from 'react';
import {View} from 'react-native';
import {appColors} from '../constants/appColors';
import type {SelectModel} from '../models/select-model';
import {globalStyle} from '../styles/globalStyles';
import RowComponent from './RowComponent';
import TextComponent from './TextComponent';

interface Props {
  label?: string;
  value: SelectModel[];
  selected?: string | string[];
  onSelect: (val: string) => void;
  openModal: () => void;
}

const DropdownPickerComponent = (props: Props) => {
  const {label, onSelect, value, selected, openModal} = props;

  return (
    <View>
      {label && <TextComponent text={label} styles={{marginBottom: 8}} />}
      <RowComponent
        onPress={openModal}
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
