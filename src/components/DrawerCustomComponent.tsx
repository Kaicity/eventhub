import React from 'react';
import {
  FlatList,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {fontFamilies} from '../constants/fontFamilies';
import {globalStyle} from '../styles/globalStyles';
import RowComponent from './RowComponent';
import TextComponent from './TextComponent';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SpaceComponent from './SpaceComponent';
import {useDispatch, useSelector} from 'react-redux';
import {authSelector, removeAuth} from '../redux/reducers/authReducers';
import {Image} from 'react-native';
import {appColors} from '../constants/appColors';
import {
  Bookmark2,
  Calendar,
  Logout,
  Message2,
  MessageQuestion,
  Setting2,
  Sms,
  User,
} from 'iconsax-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DrawerCustomComponent = ({navigation}: any) => {
  const getUser = useSelector(authSelector);

  const dispatch = useDispatch();

  const size = 20;
  const color = appColors.gray_1;
  const profileMenu = [
    {
      key: 'MyProfile',
      title: 'My Profile',
      icon: <User size={size} color={color} />,
    },
    {
      key: 'Message',
      title: 'Message',
      icon: <Message2 size={size} color={color} />,
    },
    {
      key: 'Calendar',
      title: 'Calendar',
      icon: <Calendar size={size} color={color} />,
    },
    {
      key: 'BookMark',
      title: 'BookMark',
      icon: <Bookmark2 size={size} color={color} />,
    },
    {
      key: 'ContactUs',
      title: 'Contact Us',
      icon: <Sms size={size} color={color} />,
    },
    {
      key: 'Settings',
      title: 'Settings',
      icon: <Setting2 size={size} color={color} />,
    },
    {
      key: 'HelpFAQs',
      title: 'Help & FAQs',
      icon: <MessageQuestion size={size} color={color} />,
    },
    {
      key: 'SignOut',
      title: 'Sign Out',
      icon: <Logout size={size} color={color} />,
    },
  ];

  const handleSignOut = async () => {
    dispatch(removeAuth({}));
    await AsyncStorage.removeItem('auth');
  };

  return (
    <View style={[styles.container]}>
      <View>
        <TouchableOpacity
          onPress={() => {
            navigation.closeDrawer();

            navigation.navigate('Tabs', {
              screen: 'Profile',
              params: {screen: 'ProfilesScreen'},
            });
          }}>
          {getUser.data.photoUrl ? (
            <Image
              source={{uri: getUser.data.photoUrl}}
              style={[styles.avatar]}
            />
          ) : (
            <View style={[styles.avatar, {backgroundColor: appColors.gray_1}]}>
              <TextComponent
                text={
                  getUser.data && getUser.data.fullname
                    ? (() => {
                        const parts = 'Nguyen Thong'.split(' ');
                        console.log(parts);

                        const lastName = parts[parts.length - 1];
                        console.log(lastName);

                        return lastName.substring(0, 1).toUpperCase();
                      })()
                    : ''
                }
                color={appColors.white}
                font={fontFamilies.medium}
                size={16}
              />
            </View>
          )}
          <TextComponent
            text={getUser.data.fullname || 'undefined'}
            font={fontFamilies.medium}
            size={18}
          />
        </TouchableOpacity>
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        data={profileMenu}
        style={{flex: 1, paddingVertical: 20}}
        renderItem={({item, index}) => {
          return (
            <RowComponent
              styles={[styles.listItem]}
              onPress={() =>
                item.key === 'SignOut'
                  ? handleSignOut()
                  : () => {
                      navigation.closeDrawer();
                      navigation.navigate('Tabs', {});
                    }
              }>
              {item.icon}
              <TextComponent text={item.title} styles={[styles.listItemText]} />
            </RowComponent>
          );
        }}
      />

      <RowComponent justify="flex-start">
        <TouchableOpacity
          style={[
            globalStyle.button,
            {backgroundColor: '#00F8FF22', height: 'auto'},
          ]}>
          <MaterialCommunityIcons name="crown" size={26} color="#00F8FF" />
          <SpaceComponent width={8} />
          <TextComponent
            text="Upgrade Pro"
            color="#00F8FF"
            font={fontFamilies.medium}
            size={16}
          />
        </TouchableOpacity>
      </RowComponent>
    </View>
  );
};

export default DrawerCustomComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingVertical: Platform.OS === 'android' ? StatusBar.currentHeight : 48,
  },

  avatar: {
    width: 52,
    height: 52,
    borderRadius: 100,
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },

  listItem: {
    paddingVertical: 12,
    justifyContent: 'flex-start',
  },

  listItemText: {
    paddingLeft: 12,
  },
});
