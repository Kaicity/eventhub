import {ArrowDown2, CloseCircle} from 'iconsax-react-native';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {appColors} from '../constants/appColors';
import type {UserSelectedModel} from '../models/user-select-model';
import {globalStyle} from '../styles/globalStyles';
import RowComponent from './RowComponent';
import TextComponent from './TextComponent';

interface Props {
  label?: string;
  title?: string;
  value: UserSelectedModel[];
  selected?: string[];
  onSelect: (val: string | string[]) => void;
  openModal: () => void;
}

const DropdownPickerComponent = (props: Props) => {
  const {label, title, onSelect, value, selected, openModal} = props;

  const selectedUsers = value.filter(u => selected?.includes(u.id));

  const handleRemove = (id: string) => {
    const updated = selected?.filter((uid: any) => uid !== id) || [];
    onSelect(updated);
  };

  return (
    <View>
      {label && <TextComponent text={label} styles={{marginBottom: 8}} />}
      <RowComponent
        onPress={openModal}
        styles={[globalStyle.inputContainer, {borderColor: appColors.gray_3, flexWrap: 'wrap'}]}>
        <RowComponent styles={{flex: 1, flexWrap: 'wrap', gap: 6}}>
          {selectedUsers.length > 0 ? (
            selectedUsers.map(user => (
              <View
                key={user.id}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: 10,
                  paddingVertical: 4,
                  borderRadius: 20,
                  backgroundColor: appColors.primary,
                }}>
                <TextComponent
                  text={user.fullname}
                  color={appColors.white}
                  styles={{marginRight: 6}}
                />
                <TouchableOpacity onPress={() => handleRemove(user.id)}>
                  <CloseCircle size={16} color={appColors.white} />
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <TextComponent text={title ?? ''} />
          )}
        </RowComponent>

        <ArrowDown2 size={22} color={appColors.gray_1} />
      </RowComponent>
    </View>
  );
};

export default DropdownPickerComponent;
