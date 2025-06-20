import {yupResolver} from '@hookform/resolvers/yup';
import React, {useCallback, useMemo, useRef, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
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
import {authSelector} from '../redux/reducers/authReducers';
import EventSchema from '../schemas/eventSchema';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import {StyleSheet} from 'react-native';

const AddNewScreen = () => {
  const auth = useSelector(authSelector);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  console.log(isDropdownOpen);

  // hooks
  const sheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ['100%'], []);

  // callbacks
  const handleSheetChange = useCallback((index: any) => {
    if (index === -1) {
      setIsDropdownOpen(false);
    }
  }, []);

  const handleSnapPress = useCallback((index: number) => {
    sheetRef.current?.snapToIndex(index);
  }, []);

  const handleClosePress = useCallback(() => {
    setIsDropdownOpen(false);
    sheetRef.current?.close();
  }, []);

  const {
    control,
    handleSubmit,
    formState: {errors},
    setValue,
  } = useForm({
    resolver: yupResolver(EventSchema),
  });

  setValue('author', auth?.id);

  const renderValidationError = () => {
    const errorMessages = [
      errors.title?.message,
      errors.description?.message,
    ].filter(Boolean);

    if (errorMessages.length > 0) {
      return (
        <TextComponent
          text={`* ${errorMessages.join('\n* ')}`}
          color={appColors.danger}
        />
      );
    }
    return null;
  };

  const handleAddNewEvent = async (data: any) => {
    console.log(data);

    try {
    } catch (error) {}
  };

  const testAPi = async () => {
    try {
      const res = await userAPI.HandleUser('/getAll');
      console.log(res);
    } catch (error) {}
  };

  return (
    <ContainerComponent
      isScroll
      title="Add New"
      styles={{
        backgroundColor: isDropdownOpen ? 'rgba(0,0,0,0.1)' : 'transparent',
      }}>
      <SectionComponent>
        <Controller
          name="title"
          control={control}
          render={({field: {onChange, value}}) => (
            <InputComponent
              value={value ?? ''}
              onchange={onChange}
              placeholder="Title"
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
              value={value}
              onchange={onChange}
              placeholder="Description"
              borderColor={errors.description && appColors.danger}
              placeholderTextColor={errors.description && appColors.danger}
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
                selected={value}
                onSelect={onChange}
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
              label="Ngày: "
              selected={value}
              onSelect={onChange}
              mode="date"
              modal={true}
            />
          )}
        />

        <DropdownPickerComponent
          label="Mời bạn tham gia"
          value={[]}
          selected={undefined}
          onSelect={() => {}}
          openModal={() => {
            setIsDropdownOpen(true);
            handleSnapPress(0);
          }}
        />

        <Controller
          name="locationTitle"
          control={control}
          render={({field: {onChange, value}}) => (
            <InputComponent
              value={value as string}
              onchange={onChange}
              placeholder="Title Location"
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
        <ButtonComponent text="Add New" type="primary" onpress={testAPi} />
      </SectionComponent>

      {/* Modal */}
      <BottomSheet
        ref={sheetRef}
        snapPoints={snapPoints}
        enableDynamicSizing={false}
        enablePanDownToClose={true}
        onClose={handleClosePress}>
        <BottomSheetView style={styles.contentContainer}>
          <TextComponent text="HELLO EM TRAI" />
        </BottomSheetView>
      </BottomSheet>
    </ContainerComponent>
  );
};

export default AddNewScreen;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 36,
    alignItems: 'center',
  },
});
