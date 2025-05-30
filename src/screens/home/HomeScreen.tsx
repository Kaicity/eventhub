import {Notification, SearchNormal1, Sort} from 'iconsax-react-native';
import React from 'react';
import {
  FlatList,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {MenuIcon} from '../../assets/svg';
import {
  CategoriesListComponent,
  CircleComponent,
  EventItemComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TabBarComponent,
  TagComponent,
  TextComponent,
} from '../../components';
import {appColors} from '../../constants/appColors';
import {fontFamilies} from '../../constants/fontFamilies';
import {globalStyle} from '../../styles/globalStyles';

const HomeScreen = ({navigation}: any) => {
  return (
    <View style={[globalStyle.container]}>
      <StatusBar barStyle="light-content" />
      <View style={[styles.barContainer]}>
        <View style={{paddingHorizontal: 16}}>
          {/* BAR HEADER */}
          <RowComponent>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <MenuIcon width={20} height={20} />
            </TouchableOpacity>

            <View style={[{flex: 1, alignItems: 'center'}]}>
              <RowComponent onPress={() => {}}>
                <TextComponent
                  text="Current Location"
                  color={appColors.white_2}
                  size={12}
                />
                <MaterialIcons
                  name="arrow-drop-down"
                  size={24}
                  color={appColors.white}
                />
              </RowComponent>
              <TextComponent
                text="California, USA"
                color={appColors.white}
                font={fontFamilies.medium}
                size={13}
              />
            </View>

            <CircleComponent color="#5D56F3" size={36}>
              <View>
                <Notification size={20} color={appColors.white} />
                <View style={[styles.dotNotification]}></View>
              </View>
            </CircleComponent>
          </RowComponent>
          <SpaceComponent height={16} />
          {/* BAR MIDDLE */}
          <RowComponent
            onPress={() =>
              navigation.navigate('SearchEvents', {isFilters: false})
            }>
            <SearchNormal1
              size={20}
              color={appColors.white}
              variant="TwoTone"
            />
            <View
              style={{
                width: 1,
                height: 20,
                backgroundColor: appColors.gray_4,
                marginHorizontal: 10,
              }}
            />
            <TextComponent
              flex={1}
              text="Search.."
              color={appColors.gray_4}
              size={18}
            />

            <TagComponent
              onPress={() => {
                navigation.navigate('SearchEvents', {isFilters: true});
              }}
              label="Filters"
              textColor={appColors.white}
              bgColor="#5D56F3"
              styles={{paddingVertical: 6}}
              icon={
                <CircleComponent color="#B1AEFA" size={26}>
                  <Sort size={18} color={appColors.primary} />
                </CircleComponent>
              }
            />
          </RowComponent>
        </View>

        <SpaceComponent height={20} />
        <View>
          <CategoriesListComponent isFill />
        </View>
      </View>

      <ScrollView style={{flex: 1, marginTop: 16}}>
        <SectionComponent styles={{paddingHorizontal: 0, paddingTop: 20}}>
          <TabBarComponent title="Upcoming Events" onPress={() => {}} />

          <FlatList
            horizontal
            data={Array.from({length: 5})}
            renderItem={({item, index}) => (
              <EventItemComponent
                key={`event${index}`}
                item={item}
                type="card"
              />
            )}
          />
        </SectionComponent>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  barContainer: {
    backgroundColor: appColors.primary,
    height: 200,
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 52,
  },

  dotNotification: {
    width: 10,
    height: 10,
    backgroundColor: appColors.light_cyan_blue,
    borderColor: '#524CE0',
    borderRadius: 4,
    borderWidth: 1,
    position: 'absolute',
    top: -2,
    right: -2,
  },

  listCategoryContainer: {
    marginBottom: 2,
  },
});
