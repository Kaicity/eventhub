import {ArrowRight2, Location} from 'iconsax-react-native';
import React, {useState} from 'react';
import {appColors} from '../constants/appColors';
import {globalStyle} from '../styles/globalStyles';
import RowComponent from './RowComponent';
import SpaceComponent from './SpaceComponent';
import TextComponent from './TextComponent';
import LocationModal from '../modals/LocationModal';

const SelectLocationComponent = () => {
  const [isVisibleModalLocation, setIsVisibleLocation] = useState(false);

  return (
    <>
      <RowComponent
        styles={[globalStyle.inputContainer, {borderColor: appColors.gray_3}]}
        onPress={() => setIsVisibleLocation(true)}>
        <Location color={`${appColors.primary}80`} size={22} variant="Bold" />
        <SpaceComponent width={12} />
        <TextComponent text="New York, USA" flex={1} />
        <ArrowRight2 color={appColors.primary} size={22} />
      </RowComponent>

      <LocationModal
        visible={isVisibleModalLocation}
        onClose={() => setIsVisibleLocation(false)}
        onSelect={val => console.log(val)}
      />
    </>
  );
};

export default SelectLocationComponent;
