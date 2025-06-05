import {ArrowLeft, Calendar, Location} from 'iconsax-react-native';
import React, {useState} from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {ArrowRight} from '../../assets/svg';
import {
  AvatarGroupComponent,
  ButtonComponent,
  CardComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TabBarComponent,
  TextComponent,
} from '../../components';
import {appColors} from '../../constants/appColors';
import {fontFamilies} from '../../constants/fontFamilies';
import {globalStyle} from '../../styles/globalStyles';
import useHideTabBar from '../../hooks/useHideTabBar';

const EventDetailScreen = ({navigation, route}: any) => {
  // Single screen
  useHideTabBar();

  const [showSeeMore, setShowSeeMore] = useState(2);

  return (
    <View style={[{flex: 1}, globalStyle.container]}>
      <ImageBackground
        source={require('../../assets/images/banner-card-detail.png')}
        style={{height: 224}}
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

          <View
            style={{
              position: 'absolute',
              bottom: -180,
              left: 0,
              right: 0,
              zIndex: 1,
            }}>
            <SectionComponent styles={{paddingHorizontal: 28}}>
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
                  style={[
                    globalStyle.button,
                    {backgroundColor: appColors.primary, paddingVertical: 8},
                  ]}>
                  <TextComponent
                    text="Invite"
                    color={appColors.white}
                    size={14}
                  />
                </TouchableOpacity>
              </RowComponent>
            </SectionComponent>
          </View>
        </LinearGradient>
      </ImageBackground>

      <SpaceComponent height={50} />

      {/* AREA SCROLL */}
      <View style={{flex: 1}}>
        <SectionComponent>
          <TextComponent
            text="International Band Music Concert"
            size={34}
            font={fontFamilies.medium}
          />
        </SectionComponent>

        <ScrollView
          style={{marginBottom: showSeeMore > 0 ? 0 : 100}}
          showsVerticalScrollIndicator={false}>
          <SectionComponent>
            <RowComponent justify="flex-start" styles={{marginBottom: 20}}>
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

            <RowComponent justify="flex-start" styles={{marginBottom: 20}}>
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

            <RowComponent justify="flex-start" styles={{marginBottom: 20}}>
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
            <TextComponent
              numberOfLine={showSeeMore}
              text="Enjoy your favorite dishe and a lovely your friends and family and have a great time. Food from local food trucks will be available for purchase. Enjoy your favorite dishe and a lovely your friends and family and have a great time. Food from local food trucks will be available for purchase. Enjoy your favorite dishe and a lovely your friends and family and have a great time. Food from local food trucks will be available for purchase."
            />
            <ButtonComponent
              text={showSeeMore === 0 ? 'Unless..' : 'See more..'}
              type="link"
              onpress={() => {
                showSeeMore === 0 ? setShowSeeMore(2) : setShowSeeMore(0);
              }}
            />
          </SectionComponent>
        </ScrollView>
      </View>

      <LinearGradient
        colors={['rgba(255, 255, 255, 0.6)', 'rgba(255, 255, 255, 1)']}
        style={{
          position: 'absolute',
          bottom: -10,
          right: 0,
          left: 0,
          padding: 12,
        }}>
        <ButtonComponent
          text="BUY TICKET $120"
          type="primary"
          onpress={() => {}}
          icon={<ArrowRight />}
          iconFlex="right"
        />
      </LinearGradient>
    </View>
  );
};

export default EventDetailScreen;
