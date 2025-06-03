import {StyleSheet} from 'react-native';
import {appColors} from '../constants/appColors';
import {fontFamilies} from '../constants/fontFamilies';

export const globalStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.white,
  },
  text: {
    fontFamily: fontFamilies.regular,
    fontSize: 14,
    color: appColors.text,
  },
  button: {
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: appColors.white,
    paddingHorizontal: 16,
    paddingVertical: 16,
    // minHeight: 56,
    flexDirection: 'row',
  },
  shadow: {
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  section: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  tag: {
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 100,
  },
  card: {
    borderRadius: 12,
    backgroundColor: appColors.white,
    padding: 12,
    marginHorizontal: 16,
    marginVertical: 6,
    marginBottom: 16,
  },
  miniCard: {
    alignItems: 'center',
    width: 45,
    height: 45,
    padding: 0,
    margin: 0,
    marginVertical: 0,
    marginHorizontal: 0,
    justifyContent: 'center',
  },
});
