import React from 'react';
import CardComponent from './CardComponent';
import TextComponent from './TextComponent';
import {appInfo} from '../constants/appInfos';
import {Image} from 'react-native';
import SpaceComponent from './SpaceComponent';
import AvatarGroupComponent from './AvatarGroupComponent';
import RowComponent from './RowComponent';
import {Location} from 'iconsax-react-native';
import {appColors} from '../constants/appColors';

interface Props {
  item: any;
  type: 'card' | 'list';
}

const EventItemComponent = (props: Props) => {
  const {item, type} = props;

  return (
    <CardComponent
      onPress={() => {}}
      styles={{width: appInfo.sizes.WIDTH * 0.6}}>
      <Image
        source={require('../assets/images/banner-card.png')}
        style={{
          width: '100%',
          height: 130,
          borderRadius: 8,
        }}
        resizeMode="cover"
      />
      <SpaceComponent height={10} />
      <TextComponent size={18} text={item.title} title numberOfLine={1} />
      <AvatarGroupComponent />
      <RowComponent justify="flex-start">
        <Location
          size={18}
          color={appColors.gray_3}
          variant="Bold"
          style={{marginRight: 2}}
        />
        <TextComponent
          text={item.location?.address}
          numberOfLine={1}
          size={14}
          color={appColors.gray_2}
        />
      </RowComponent>
    </CardComponent>
  );
};

export default EventItemComponent;
