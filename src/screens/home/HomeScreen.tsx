import {HambergerMenu, Notification} from 'iconsax-react-native';
import React from 'react';
import {
  Platform,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';
import {CircleComponent, RowComponent, TextComponent} from '../../components';
import {appColors} from '../../constants/appColors';
import {authSelector} from '../../redux/reducers/authReducers';
import {globalStyle} from '../../styles/globalStyles';
import {fontFamilies} from '../../constants/fontFamilies';
import {MenuIcon} from '../../assets/svg';

const HomeScreen = ({navigation}: any) => {
  const auth = useSelector(authSelector);

  return (
    <View style={[globalStyle.container]}>
      <StatusBar barStyle="light-content" />

      <View style={[styles.barContainer]}>
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

          <CircleComponent color="#524CE0" size={36} onpress={() => {}}>
            <View>
              <Notification size={20} color={appColors.white} />
              <View style={[styles.dotNotification]}></View>
            </View>
          </CircleComponent>
        </RowComponent>
      </View>

      <View style={[{flex: 1}]}></View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  barContainer: {
    backgroundColor: appColors.primary,
    height: 179,
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 52,
    paddingHorizontal: 16,
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
});
