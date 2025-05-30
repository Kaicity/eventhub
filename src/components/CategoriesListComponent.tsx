import {View, Text, FlatList} from 'react-native';
import React, {type ReactNode} from 'react';
import {ArtIcon, FoodIcon, MusicIcon, SportIcon} from '../assets/svg';
import {appColors} from '../constants/appColors';
import RowComponent from './RowComponent';
import TagComponent from './TagComponent';

interface Props {
  isFill?: boolean;
}

interface Category {
  icon: ReactNode;
  color: string;
  label: string;
  key: string;
}

const CategoriesListComponent = (props: Props) => {
  const {isFill} = props;

  const categories: Category[] = [
    {
      key: 'Sport',
      label: 'Sport',
      icon: <SportIcon color={isFill ? appColors.white : appColors.red} />,
      color: appColors.red,
    },
    {
      key: 'Music',
      label: 'Music',
      icon: <MusicIcon color={isFill ? appColors.white : appColors.orange} />,
      color: appColors.orange,
    },
    {
      key: 'Food',
      label: 'Food',
      icon: <FoodIcon color={isFill ? appColors.white : appColors.green} />,
      color: appColors.green,
    },
    {
      key: 'Art',
      label: 'Art',
      icon: <ArtIcon color={isFill ? appColors.white : appColors.blueSky} />,
      color: appColors.blueSky,
    },
  ];

  return (
    <FlatList
      style={{paddingHorizontal: 16}}
      horizontal
      showsHorizontalScrollIndicator={false}
      data={categories}
      renderItem={({item, index}) => (
        <View>
          <TagComponent
            styles={{
              paddingHorizontal: 14,
              paddingVertical: 8,
              marginRight: index === categories.length - 1 ? 28 : 12,
              minWidth: 82,
            }}
            label={item.label}
            bgColor={isFill ? item.color : appColors.white}
            icon={item.icon}
            textColor={appColors.white}
          />
        </View>
      )}
    />
  );
};

export default CategoriesListComponent;
