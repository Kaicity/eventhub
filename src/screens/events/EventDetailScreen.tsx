import {ArrowLeft, Calendar, Location} from 'iconsax-react-native';
import React from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  AvatarGroupComponent,
  CardComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TabBarComponent,
  TextComponent,
} from '../../components';
import {appColors} from '../../constants/appColors';
import {globalStyle} from '../../styles/globalStyles';
import {fontFamilies} from '../../constants/fontFamilies';

const EventDetailScreen = ({navigation, route}: any) => {
  return (
    <View style={[{flex: 1}, globalStyle.container]}>
      <ImageBackground
        source={require('../../assets/images/banner-card-detail.png')}
        style={{flex: 1, height: 224}}
        imageStyle={{padding: 6, resizeMode: 'cover'}}>
        <LinearGradient colors={['rgba(0,0,0,0.8)', 'rgba(0,0,0,0)']}>
          <RowComponent
            styles={{
              paddingHorizontal: 14,
              paddingTop: 42,
            }}
            justify="space-between">
            <RowComponent>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{
                  width: 48,
                  height: 48,
                  justifyContent: 'center',
                }}>
                <ArrowLeft size={32} color={appColors.white} />
              </TouchableOpacity>
              <TextComponent
                text="Event Details"
                color={appColors.white}
                title
              />
            </RowComponent>

            <CardComponent
              onPress={() => {}}
              color="#FFFFFF25"
              styles={[globalStyle.miniCard, {width: 36, height: 36}]}>
              <MaterialIcons
                name="bookmark"
                size={24}
                color={appColors.white}
              />
            </CardComponent>
          </RowComponent>
        </LinearGradient>

        <ScrollView
          style={{
            flex: 1,
            paddingTop: 244 - 106,
          }}>
          <SectionComponent styles={{paddingHorizontal: 28}}>
            <View style={[{marginTop: -42}]}>
              <RowComponent
                justify="space-between"
                styles={[
                  {
                    backgroundColor: appColors.white,
                    borderRadius: 100,
                    paddingHorizontal: 18,
                  },
                  globalStyle.shadow,
                ]}>
                <AvatarGroupComponent size={36} />

                <TouchableOpacity
                  style={{
                    backgroundColor: appColors.primary,
                    borderRadius: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingVertical: 8,
                    paddingHorizontal: 26,
                  }}>
                  <TextComponent
                    text="Invite"
                    color={appColors.white}
                    size={14}
                  />
                </TouchableOpacity>
              </RowComponent>
            </View>
          </SectionComponent>

          <SectionComponent>
            <TextComponent
              text="International Band Music Concert"
              size={34}
              font={fontFamilies.medium}
            />
          </SectionComponent>

          <SectionComponent>
            <RowComponent justify="flex-start">
              <CardComponent
                styles={globalStyle.miniCard}
                onPress={() => {}}
                color="#5669FF26">
                <Calendar size={24} color={appColors.primary} variant="Bold" />
              </CardComponent>

              <SpaceComponent width={10} />

              <RowComponent
                styles={{
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                }}>
                <TextComponent
                  text="14 December, 2021"
                  font={fontFamilies.medium}
                />
                <SpaceComponent height={10} />
                <TextComponent
                  text="Tuesday, 4:00PM - 9:00PM"
                  font={fontFamilies.regular}
                  size={12}
                />
              </RowComponent>
            </RowComponent>
          </SectionComponent>

          <SectionComponent>
            <RowComponent justify="flex-start">
              <CardComponent
                styles={globalStyle.miniCard}
                onPress={() => {}}
                color="#5669FF26">
                <Location size={24} color={appColors.primary} variant="Bold" />
              </CardComponent>

              <SpaceComponent width={10} />

              <RowComponent
                styles={{
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                }}>
                <TextComponent
                  text="Gala Convention Center"
                  font={fontFamilies.medium}
                />
                <SpaceComponent height={10} />
                <TextComponent
                  text="36 Guild Street London, UK "
                  font={fontFamilies.regular}
                  size={12}
                />
              </RowComponent>
            </RowComponent>
          </SectionComponent>

          <SectionComponent>
            <RowComponent justify="flex-start">
              <CardComponent
                styles={globalStyle.miniCard}
                onPress={() => {}}
                color="#5669FF26">
                <Image
                  source={require('../../assets/images/author.png')}
                  style={{width: '100%', height: '100%', borderRadius: 12}}
                  resizeMode="cover"
                />
              </CardComponent>

              <SpaceComponent width={10} />

              <RowComponent
                styles={{
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                }}>
                <TextComponent text="Thongular" font={fontFamilies.medium} />
                <SpaceComponent height={10} />
                <TextComponent
                  text="Organizer"
                  font={fontFamilies.regular}
                  size={12}
                />
              </RowComponent>
            </RowComponent>
          </SectionComponent>

          <TabBarComponent title="About event" />
          <SectionComponent>
            <TextComponent text="Enjoy your favorite dishe and a lovely your friends and family and have a great time. Food from local food trucks will be available for purchase. Read More..." />
          </SectionComponent>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default EventDetailScreen;

const styles = StyleSheet.create({});
