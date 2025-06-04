import React from 'react';
import {Image} from 'react-native';
import {appColors} from '../constants/appColors';
import {fontFamilies} from '../constants/fontFamilies';
import RowComponent from './RowComponent';
import TextComponent from './TextComponent';
import SpaceComponent from './SpaceComponent';

interface Props {
  size?: number;
}

const AvatarGroupComponent = (props: Props) => {
  const {size} = props;

  const imageUrl =
    'https://flowgames.gg/wp-content/uploads/2023/09/image-2023-09-01T124912.613.jpg';
  return (
    <RowComponent justify="flex-start" styles={{marginVertical: 12}}>
      {Array.from({length: 3}).map((item, index) => (
        <Image
          key={`img${index}`}
          source={{uri: imageUrl}}
          style={{
            width: size ? size : 24,
            height: size ? size : 24,
            borderRadius: 100,
            borderWidth: 1,
            borderColor: appColors.white,
            marginLeft: index > 0 ? -8 : 0,
          }}
        />
      ))}
      <SpaceComponent width={12} />
      <TextComponent
        text="+20 Going"
        size={14}
        color={appColors.primary}
        font={fontFamilies.semiBold}
      />
    </RowComponent>
  );
};

export default AvatarGroupComponent;
