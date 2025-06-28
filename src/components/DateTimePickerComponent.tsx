import {addMinutes, format} from 'date-fns';
import {vi} from 'date-fns/locale';
import {Calendar, Clock} from 'iconsax-react-native';
import React, {useState} from 'react';
import {View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {appColors} from '../constants/appColors';
import {fontFamilies} from '../constants/fontFamilies';
import {globalStyle} from '../styles/globalStyles';
import RowComponent from './RowComponent';
import TextComponent from './TextComponent';

interface Props {
  selected: any;
  mode: 'date' | 'time' | 'datetime';
  modal?: boolean;
  onSelect: (val: any) => void;
  label?: string;
  minimumDate?: Date;
  fromMinute?: number;
}

const DateTimePickerComponent = (props: Props) => {
  const {label, selected, mode, modal, onSelect, minimumDate, fromMinute} = props;
  const [isShowDatePicker, setIsShowDatePicker] = useState(false);

  return (
    <View style={{flex: 1}}>
      {label && <TextComponent text={label} styles={{marginBottom: 8}} />}
      <RowComponent
        onPress={() => setIsShowDatePicker(true)}
        styles={[globalStyle.inputContainer, {borderColor: appColors.gray_3}]}>
        <TextComponent
          flex={1}
          font={fontFamilies.medium}
          styles={{textAlign: 'center'}}
          text={
            selected
              ? mode === 'time'
                ? format(new Date(selected), 'HH:mm')
                : format(new Date(selected), 'dd MMMM, yyyy', {locale: vi})
              : mode === 'time'
              ? 'Chọn thời gian'
              : 'Chọn ngày'
          }
        />
        {mode === 'date' || mode === 'datetime' ? (
          <Calendar size={22} color={appColors.gray_1} />
        ) : (
          <Clock size={22} color={appColors.gray_1} />
        )}
      </RowComponent>

      <DatePicker
        minimumDate={minimumDate}
        locale="vi-VI"
        title={mode === 'time' ? 'Chọn thời gian' : 'Chọn ngày'}
        cancelText="Hủy"
        confirmText="Xác Nhận"
        open={isShowDatePicker}
        mode={mode}
        date={selected ? new Date(selected) : addMinutes(new Date(), fromMinute || 0)}
        modal={modal}
        onCancel={() => setIsShowDatePicker(false)}
        onConfirm={val => {
          setIsShowDatePicker(false);
          onSelect(val);
        }}
      />
    </View>
  );
};

export default DateTimePickerComponent;
