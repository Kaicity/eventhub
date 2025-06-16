import {yupResolver} from '@hookform/resolvers/yup';
import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {useSelector} from 'react-redux';
import {
  ButtonComponent,
  ContainerComponent,
  DateTimePickerComponent,
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

const AddNewScreen = () => {
  const auth = useSelector(authSelector);

  const {
    control,
    handleSubmit,
    formState: {errors},
    setValue,
  } = useForm({
    resolver: yupResolver(EventSchema),
  });

  setValue('author', auth?.data.id);

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

  const handleAddNewEvent = (data: any) => {
    console.log(data);

    try {
    } catch (error) {}
  };

  return (
    <ContainerComponent isScroll title="Add New">
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
        <ButtonComponent
          text="Add New"
          type="primary"
          onpress={handleSubmit(handleAddNewEvent)}
        />
      </SectionComponent>
    </ContainerComponent>
  );
};

export default AddNewScreen;
