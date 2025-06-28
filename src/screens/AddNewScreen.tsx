import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetFlatList,
  BottomSheetFooter,
} from '@gorhom/bottom-sheet';
import {Portal} from '@gorhom/portal';
import {yupResolver} from '@hookform/resolvers/yup';
import {Box1, SearchNormal1} from 'iconsax-react-native';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import userAPI from '../apis/userApi';
import {
  ButtonComponent,
  ContainerComponent,
  DateTimePickerComponent,
  DropdownPickerComponent,
  InputComponent,
  RowComponent,
  SectionComponent,
  SelectLocationComponent,
  SpaceComponent,
  TextComponent,
} from '../components';
import {appColors} from '../constants/appColors';
import {fontFamilies} from '../constants/fontFamilies';
import type {UserSelectedModel} from '../models/user-select-model';
import {authSelector} from '../redux/reducers/authReducers';
import EventSchema from '../schemas/eventSchema';
import {LoadingModal} from '../modals';
import {addMinutes, format, isBefore} from 'date-fns';
import {vi} from 'date-fns/locale';
import {showToastMessage} from '../libs';

const AddNewScreen = () => {
  const auth = useSelector(authSelector);

  const [isLoading, setIsLoading] = useState(false);
  const [searchKey, setSearchKey] = useState('');
  const [usersSelect, setUsersSelect] = useState<UserSelectedModel[]>([]);
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);

  useEffect(() => {
    handleGetAllUsers();
  }, []);

  const sheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ['90%'], []);

  const handleSheetChange = useCallback((index: any) => {
    if (index === -1) {
      console.log(index);
    }
  }, []);

  const handleSnapPress = useCallback((index: number) => {
    sheetRef.current?.snapToIndex(index);
  }, []);

  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
  }, []);

  const {
    control,
    handleSubmit,
    formState: {errors},
    setValue,
    getValues,
  } = useForm({
    resolver: yupResolver(EventSchema),
  });

  setValue('author', auth?.id);

  const renderValidationError = () => {
    const errorMessages = [
      errors.title?.message,
      errors.startAt?.message,
      errors.endAt?.message,
      errors.date?.message,
    ].filter(Boolean);

    if (errorMessages.length > 0) {
      return <TextComponent text={`* ${errorMessages.join('\n* ')}`} color={appColors.danger} />;
    }
    return null;
  };

  const handleAddNewEvent = async (data: any) => {
    console.log(data);

    try {
    } catch (error) {}
  };

  const handleGetAllUsers = async () => {
    setIsLoading(true);
    try {
      const res = await userAPI.HandleUser('/getAll');

      if (res && res.data) {
        const items: UserSelectedModel[] = [];

        res.data.forEach((item: any) =>
          items.push({
            fullname: item.fullname,
            id: item.id,
            email: item.email,
            imageUrl: item.imageUrl,
          }),
        );
        setUsersSelect(items);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectUser = useCallback((item: UserSelectedModel) => {
    setSelectedUserIds(prev => {
      const isSelected = prev.includes(item.id);
      return isSelected ? prev.filter(id => id !== item.id) : [...prev, item.id];
    });
  }, []);

  const handleCheckDateTimePicker = (endAt: any) => {
    if (endAt) {
      const startAt = getValues('startAt');
      const startDate = new Date(startAt);
      const endDate = new Date(endAt);

      const isValid = isBefore(startDate, endDate);
      if (!isValid) {
        showToastMessage({
          type: 'error',
          text1: 'Giờ bắt đầu phải trước giờ kết thúc',
        });

        // Cách nhau 30 phút cho mỗi thời điểm
        setValue('startAt', addMinutes(new Date(), 30));
        setValue('endAt', addMinutes(new Date(), 60));
      } else return;
    }
  };

  const renderFooter = useCallback(
    (props: any) => (
      <BottomSheetFooter {...props} bottomInset={24}>
        <ButtonComponent type="primary" text="Xác nhận" onpress={handleClosePress} />
      </BottomSheetFooter>
    ),
    [],
  );

  return (
    <ContainerComponent isScroll title="Add New">
      <SectionComponent>
        <Controller
          name="title"
          control={control}
          render={({field: {onChange, value}}) => (
            <InputComponent
              label="Tên sự kiện"
              labelColor={errors.title ? appColors.red : ''}
              value={value ?? ''}
              onchange={onChange}
              placeholder="Nhập sự kiện"
              borderColor={errors.title && appColors.danger}
              placeholderTextColor={errors.title && appColors.danger}
              allowClear
            />
          )}></Controller>

        <Controller
          name="description"
          control={control}
          render={({field: {onChange, value}}) => (
            <InputComponent
              label="Mô tả"
              value={value ?? ''}
              onchange={onChange}
              placeholder="Hãy mô tả về sự kiện này"
              numberOfLine={4}
              allowClear
              multiLine
            />
          )}
        />

        <RowComponent>
          <Controller
            control={control}
            name="startAt"
            render={({field: {value, onChange}}) => (
              <DateTimePickerComponent
                label="Bắt đầu: "
                minimumDate={addMinutes(new Date(), 30)}
                fromMinute={30}
                selected={value}
                onSelect={onChange}
                mode="time"
                modal={true}
              />
            )}
          />
          <SpaceComponent width={20} />
          <Controller
            control={control}
            name="endAt"
            render={({field: {value, onChange}}) => (
              <DateTimePickerComponent
                label="Kết thúc: "
                fromMinute={60}
                selected={value}
                onSelect={val => {
                  onChange(val);
                  handleCheckDateTimePicker(val);
                }}
                mode="time"
                modal={true}
              />
            )}
          />
        </RowComponent>

        <Controller
          control={control}
          name="date"
          render={({field: {value, onChange}}) => (
            <DateTimePickerComponent
              minimumDate={new Date()}
              label="Ngày: "
              selected={value}
              onSelect={onChange}
              mode="date"
              modal={true}
            />
          )}
        />

        <DropdownPickerComponent
          label="Mời bạn bè"
          title="Chọn người tham gia"
          value={usersSelect}
          selected={selectedUserIds}
          onSelect={val => setSelectedUserIds(Array.isArray(val) ? val : [val])}
          openModal={() => {
            handleSnapPress(0);
          }}
        />

        <Controller
          name="locationTitle"
          control={control}
          render={({field: {onChange, value}}) => (
            <InputComponent
              label="Vị trí"
              value={value as string}
              onchange={onChange}
              placeholder="Vị trí đề cập"
              borderColor={errors.locationTitle && appColors.danger}
              placeholderTextColor={errors.locationTitle && appColors.danger}
              numberOfLine={1}
              allowClear
              multiLine
            />
          )}
        />

        <SelectLocationComponent />

        {renderValidationError()}
      </SectionComponent>

      <SectionComponent>
        <ButtonComponent
          text="Tạo sự kiện"
          type="primary"
          onpress={handleSubmit(handleAddNewEvent)}
        />
      </SectionComponent>

      {/* Modal bottom sheet */}
      <Portal>
        <BottomSheet
          onChange={handleSheetChange}
          ref={sheetRef}
          snapPoints={snapPoints}
          enableDynamicSizing={false}
          enablePanDownToClose={true}
          index={-1}
          onClose={handleClosePress}
          backdropComponent={props => (
            <BottomSheetBackdrop
              {...props}
              disappearsOnIndex={-1}
              appearsOnIndex={0}
              opacity={0.4}
            />
          )}
          footerComponent={renderFooter}>
          <View style={styles.sheetContent}>
            <RowComponent>
              <View style={{flex: 1}}>
                <InputComponent
                  placeholder="Tìm kiếm..."
                  value={searchKey}
                  onchange={val => setSearchKey(val)}
                  styles={{marginBottom: 0}}
                  affix={<SearchNormal1 size={18} color={appColors.primary} />}
                />
              </View>
              <SpaceComponent width={20} />
              <ButtonComponent type="link" text="Hủy" onpress={handleClosePress} />
            </RowComponent>

            <SpaceComponent height={20} />

            {usersSelect.length > 0 ? (
              <BottomSheetFlatList
                data={usersSelect}
                keyExtractor={item => item.id}
                renderItem={({item}) => {
                  const isSelected = selectedUserIds.includes(item.id);

                  return (
                    <RowComponent styles={[styles.listItem]} onPress={() => handleSelectUser(item)}>
                      <View style={[styles.avatar, {backgroundColor: appColors.gray_3}]}>
                        <TextComponent
                          text={(() => {
                            const parts = item.fullname.split(' ');
                            const lastName = parts[parts.length - 1];
                            return lastName.substring(0, 1).toUpperCase();
                          })()}
                          color={appColors.white}
                          font={fontFamilies.medium}
                          size={16}
                        />
                      </View>

                      <SpaceComponent width={10} />

                      <RowComponent
                        styles={{flexDirection: 'column', alignItems: 'flex-start', flex: 1}}>
                        <TextComponent text={item.fullname} />
                        <TextComponent text={item.email} size={12} color={appColors.gray_1} />
                      </RowComponent>

                      <View style={styles.diot}>
                        {isSelected && (
                          <View
                            style={{
                              width: 10,
                              height: 10,
                              borderRadius: 5,
                              backgroundColor: appColors.blue,
                            }}
                          />
                        )}
                      </View>
                    </RowComponent>
                  );
                }}
              />
            ) : (
              <RowComponent
                justify="center"
                styles={{flexDirection: 'column', alignItems: 'center', gap: 6}}>
                <Box1 size={18} color={appColors.gray_1} />
                <TextComponent text="Không có dữ liệu" color={appColors.gray_1} />
              </RowComponent>
            )}
          </View>
          <LoadingModal visible={isLoading} />
        </BottomSheet>
      </Portal>
    </ContainerComponent>
  );
};

export default AddNewScreen;

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', padding: 16},
  selectBox: {
    padding: 12,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  sheetContent: {
    flex: 1,
    padding: 20,
  },
  listItem: {
    paddingVertical: 12,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  avatar: {
    width: 42,
    height: 42,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },

  diot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: appColors.gray_4,
    alignItems: 'center',
    justifyContent: 'center',
  },

  footerContainer: {
    padding: 12,
    margin: 12,
  },
});
