import React from 'react';
import {
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
import {useSelector} from 'react-redux';
import {authSelector} from '../redux/reducers/authReducers';
import {Image} from 'react-native';

const DrawerCustomComponent = ({navigation}: any) => {
  const getUser = useSelector(authSelector);

  return (
    <View style={[styles.container]}>
      <View>
        {getUser.data.photoUrl ? (
          <Image
            source={{uri: getUser.data.photoUrl}}
            style={[styles.avatar]}
          />
        ) : (
          <Image
            source={require('../assets/images/avatar-default.png')}
            style={[styles.avatar]}
          />
        )}
        <TextComponent
          text={getUser.data.fullname || 'undefined'}
          font={fontFamilies.medium}
          size={18}
        />
      </View>

      <View style={{flex: 1, paddingVertical: 20}}>
        <Text>Menu Container</Text>
      </View>

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
  },
});
