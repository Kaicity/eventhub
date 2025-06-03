import React from 'react';
import {
  CircleComponent,
  ContainerComponent,
  RowComponent,
  SectionComponent,
  TagComponent,
  TextComponent,
} from '../../components';
import {SearchNormal1, Sort} from 'iconsax-react-native';
import {appColors} from '../../constants/appColors';
import {View} from 'react-native';

const SearchEvents = ({navigation, route}: any) => {
  const {isFilters}: {isFilters: boolean} = route.params;
  console.log(isFilters);
  return (
    <ContainerComponent isScroll back title="Search">
      <SectionComponent>
        <RowComponent>
          <SearchNormal1
            size={20}
            color={appColors.primary}
            variant="TwoTone"
          />
          <View
            style={{
              width: 1,
              height: 20,
              backgroundColor: appColors.primary,
              marginHorizontal: 10,
            }}
          />
          <TextComponent
            flex={1}
            text="Search.."
            color={appColors.gray_3}
            size={20}
          />

          <TagComponent
            label="Filters"
            textColor={appColors.white}
            bgColor={appColors.primary}
            icon={
              <CircleComponent color={appColors.white} size={26}>
                <Sort size={18} color={appColors.primary} />
              </CircleComponent>
            }
          />
        </RowComponent>
      </SectionComponent>
    </ContainerComponent>
  );
};

export default SearchEvents;
