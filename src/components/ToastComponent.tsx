import {Danger, TickCircle, Warning2} from 'iconsax-react-native';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {fontFamilies} from '../constants/fontFamilies';

const iconMap: Record<
  string,
  {
    Icon: React.ElementType;
    color: string;
    background: string;
  }
> = {
  success: {
    Icon: TickCircle,
    color: '#4CAF50',
    background: '#E8F5E9',
  },
  error: {
    Icon: Danger,
    color: '#F44336',
    background: '#FDECEA',
  },
  warning: {
    Icon: Warning2,
    color: '#FF9800',
    background: '#FFF8E1',
  },
};

const ToastComponent = ({text1, text2, type = 'success'}: any) => {
  const {Icon, color, background} = iconMap[type] || iconMap.success;

  return (
    <View style={[styles.container, {backgroundColor: background}]}>
      <Icon size={24} color={color} variant="Bold" style={styles.icon} />
      <View style={styles.textContainer}>
        <Text style={[styles.text1, {color}]}>{text1}</Text>
        {!!text2 && <Text style={styles.text2}>{text2}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    alignSelf: 'center',
    marginTop: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
  },
  icon: {
    marginRight: 12,
    marginTop: 2,
  },
  textContainer: {
    flex: 1,
  },
  text1: {
    fontSize: 14,
    fontFamily: fontFamilies.semiBold,
  },
  text2: {
    fontSize: 14,
    fontFamily: fontFamilies.regular,
    color: '#555',
    marginTop: 4,
  },
});

export default ToastComponent;
