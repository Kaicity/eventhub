import {Location} from 'iconsax-react-native';
import React from 'react';
import {ImageBackground} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {appColors} from '../constants/appColors';
import {appInfo} from '../constants/appInfos';
import {fontFamilies} from '../constants/fontFamilies';
import {globalStyle} from '../styles/globalStyles';
import AvatarGroupComponent from './AvatarGroupComponent';
import CardComponent from './CardComponent';
import RowComponent from './RowComponent';
import TextComponent from './TextComponent';
import {useNavigation} from '@react-navigation/native';

interface Props {
  item: any;
  type: 'card' | 'list';
}

const EventItemComponent = (props: Props) => {
  const {item, type} = props;

  const navigation: any = useNavigation();

  return (
    <CardComponent
      isShadow
      onPress={() => navigation.navigate('EventDetailScreen', {item})}
      styles={{width: appInfo.sizes.WIDTH * 0.7}}>
      <ImageBackground
        style={{flex: 1, marginBottom: 12, height: 131, padding: 10}}
        source={require('../assets/images/banner-card.png')}
        imageStyle={{
          resizeMode: 'cover',
          borderRadius: 12,
        }}>
        <RowComponent justify="space-between">
          <CardComponent
            onPress={() => {}}
            styles={[globalStyle.miniCard]}
            color="#FFFFFFB3">
            <TextComponent
              text="10"
              font={fontFamilies.bold}
              color={appColors.red}
              size={18}
            />
            <TextComponent
              text="JUNE"
              font={fontFamilies.medium}
              color={appColors.red}
              size={10}
            />
          </CardComponent>

          <CardComponent
            onPress={() => {}}
            styles={[globalStyle.miniCard]}
            color="#FFFFFFB3">
            <MaterialIcons name="bookmark" size={22} color={appColors.red} />
          </CardComponent>
        </RowComponent>
      </ImageBackground>
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
