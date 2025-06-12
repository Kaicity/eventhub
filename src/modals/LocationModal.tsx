import Geolocation from '@react-native-community/geolocation';
import MapboxGL from '@rnmapbox/maps';
import axios from 'axios';
import {Pointer, SearchNormal} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import mapAPI from '../apis/mapApi';
import {
  ButtonComponent,
  CircleComponent,
  InputComponent,
  RowComponent,
  SpaceComponent,
  TextComponent,
} from '../components';
import {appColors} from '../constants/appColors';
import {appInfo} from '../constants/appInfos';
import {LocationModel} from '../models/location-model';
import {globalStyle} from '../styles/globalStyles';

MapboxGL.setAccessToken(
  'sk.eyJ1Ijoia2FpY2l0eTIwMDIiLCJhIjoiY21idGM5NmFhMDFwbzJpczNkYno2a2F0YiJ9._YpIUAUgypRi2KG_3SNvxQ',
);

interface Props {
  visible: boolean;
  onClose: () => void;
  onSelect: (val: string) => void;
}

const LocationModal = (props: Props) => {
  const {visible, onClose, onSelect} = props;
  const [searchKey, setSearchKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [locations, setLocations] = useState<LocationModel[]>([]);
  const [addressSelected, setAddressSelected] = useState('');
  const [selectedCoordinate, setSelectedCoordinate] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  useEffect(() => {
    if (addressSelected) {
      geocodeByAddress(addressSelected);
    }
  }, [addressSelected]);

  useEffect(() => {
    handleGetCurrentLocation();
  }, []);

  useEffect(() => {
    if (!searchKey) {
      setLocations([]);
    }
  }, [searchKey]);

  const handleGetCurrentLocation = () => {
    Geolocation.getCurrentPosition(position => {
      if (position.coords) {
        setSelectedCoordinate({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      }
    });
  };

  const geocodeByAddress = async (address: string) => {
    try {
      const res = await mapAPI.HandleMaps(
        'https://geocode.search.hereapi.com/v1/geocode',
        {q: address},
        undefined,
      );

      if (res.data.items.length > 0) {
        setSelectedCoordinate({
          latitude: res.data.items[0].position.lat,
          longitude: res.data.items[0].position.lng,
        });
      }
    } catch (error) {
      console.error('Geocode error:', error);
    }
  };

  const handleSearchLocation = async () => {
    const api = `https://autocomplete.search.hereapi.com/v1/autocomplete?q=${searchKey}&limit=10&lang=vi-VI&apiKey=oiJF4fKlzuOGMijKSRRw9DE54-6S-p0UZFUbyQt21Ts`;
    try {
      setIsLoading(true);
      const res: any = await axios.get(api);
      if (res && res.items) {
        setLocations(res.items);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    onClose();
    handleGetCurrentLocation();
  };

  return (
    <Modal animationType="slide" visible={visible} style={{flex: 1}}>
      <View style={{paddingVertical: 20, paddingHorizontal: 14}}>
        <RowComponent justify="flex-end" styles={{marginBottom: 16}}>
          <View style={{flex: 1}}>
            <InputComponent
              affix={<SearchNormal color={appColors.gray_3} size={20} />}
              placeholder="Search"
              value={searchKey}
              onchange={val => setSearchKey(val)}
              styles={{marginBottom: 0}}
              allowClear
              onEnter={handleSearchLocation}
            />
          </View>

          <View
            style={[
              {
                position: 'absolute',
                top: 70,
                right: 0,
                left: 0,
                backgroundColor: appColors.white,
                zIndex: 1,
                padding: 20,
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
              },
              globalStyle.shadow,
            ]}>
            {isLoading ? (
              <ActivityIndicator />
            ) : locations.length > 0 ? (
              <FlatList
                data={locations}
                renderItem={({item}) => (
                  <TouchableOpacity
                    style={{
                      marginBottom: 12,
                    }}
                    onPress={() => {
                      setAddressSelected(item.address.label);
                      setSearchKey('');
                    }}>
                    <TextComponent text={item.address.label} />
                  </TouchableOpacity>
                )}
              />
            ) : (
              <View>
                <TextComponent
                  text={searchKey ? `Location not found` : 'Search Location'}
                />
              </View>
            )}
          </View>

          <SpaceComponent width={12} />
          <ButtonComponent text="Cancel" type="link" onpress={handleCancel} />
        </RowComponent>
      </View>

      <MapboxGL.MapView
        style={{flex: 1}}
        styleURL="mapbox://styles/mapbox/streets-v12"
        zoomEnabled={true}
        rotateEnabled={true}>
        <MapboxGL.Camera
          zoomLevel={15}
          animationMode="flyTo"
          centerCoordinate={
            selectedCoordinate
              ? [
                  selectedCoordinate.longitude as number,
                  selectedCoordinate.latitude as number,
                ]
              : undefined
          } // [lng, lat]
        />
        <MapboxGL.PointAnnotation
          id="marker"
          coordinate={[
            selectedCoordinate?.longitude as number,
            selectedCoordinate?.latitude as number,
          ]}>
          <View style={[styles.pointer, globalStyle.shadow]}></View>
        </MapboxGL.PointAnnotation>
      </MapboxGL.MapView>

      <ButtonComponent
        text="Submit"
        type="primary"
        styles={{
          position: 'absolute',
          bottom: 10,
          left: appInfo.sizes.WIDTH * 0.1,
          right: 0,
        }}
      />

      <CircleComponent
        onpress={handleGetCurrentLocation}
        size={50}
        color={appColors.white}
        styles={[
          {
            position: 'absolute',
            bottom: 120,
            right: 20,
          },
          globalStyle.shadow,
        ]}>
        <Pointer size={26} color={appColors.primary} />
      </CircleComponent>
    </Modal>
  );
};

const styles = StyleSheet.create({
  pointer: {
    width: 22,
    height: 22,
    backgroundColor: appColors.blue,
    borderWidth: 4,
    borderColor: appColors.white,
    borderRadius: 20,
  },
});

export default LocationModal;
