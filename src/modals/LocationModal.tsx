import Geolocation from '@react-native-community/geolocation';
import MapboxGL from '@rnmapbox/maps';
import {
  CloseCircle,
  LocationTick,
  Pointer,
  SearchNormal,
} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Modal,
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
import AntDesign from 'react-native-vector-icons/AntDesign';

MapboxGL.setAccessToken(
  'sk.eyJ1Ijoia2FpY2l0eTIwMDIiLCJhIjoiY21idGM5NmFhMDFwbzJpczNkYno2a2F0YiJ9._YpIUAUgypRi2KG_3SNvxQ',
);

interface Props {
  visible: boolean;
  onClose: () => void;
  onSelect: (val: {
    address: string;
    position?: {
      lat: number;
      long: number;
    };
  }) => void;
}

const LocationModal = (props: Props) => {
  const {visible, onClose, onSelect} = props;
  const [searchKey, setSearchKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [locations, setLocations] = useState<LocationModel[]>([]);
  const [addressSelected, setAddressSelected] = useState('');
  const [currentLocation, setCurrentLocation] = useState<{
    lat: number;
    long: number;
  }>();

  useEffect(() => {
    if (addressSelected) {
      handleGeocodeByAddress(addressSelected);
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

  const handleGetCurrentLocation = async () => {
    Geolocation.getCurrentPosition(position => {
      if (position.coords) {
        setCurrentLocation({
          lat: position.coords.latitude,
          long: position.coords.longitude,
        });
      }
    });
  };

  const handleGeocodeByAddress = async (address: string) => {
    try {
      const res: any = await mapAPI.HandleMaps(
        'https://geocode.search.hereapi.com/v1/geocode',
        {q: address},
        undefined,
      );

      if (res.items.length > 0) {
        setCurrentLocation({
          lat: res.items[0].position.lat,
          long: res.items[0].position.lng,
        });
      }
    } catch (error) {
      console.error('Geocode error:', error);
    }
  };

  const handleSearchLocation = async () => {
    try {
      setIsLoading(true);
      const res: any = await mapAPI.HandleMaps(
        'https://autocomplete.search.hereapi.com/v1/autocomplete',
        {
          q: searchKey,
          limit: 10,
        },
        undefined,
      );

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
    // handleGetCurrentLocation();
  };

  return (
    <Modal animationType="slide" visible={visible} style={{flex: 1}}>
      <View style={{paddingVertical: 20, paddingHorizontal: 14}}>
        <RowComponent justify="flex-end" styles={{marginBottom: 16}}>
          <View style={{flex: 1}}>
            <InputComponent
              affix={<SearchNormal color={appColors.gray_3} size={20} />}
              placeholder="Tìm kiếm"
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
                borderRadius: 10,
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
                {!addressSelected ? (
                  <TextComponent
                    text={
                      searchKey
                        ? `Không tìm thấy địa điểm này`
                        : 'Tìm kiếm địa điểm'
                    }
                  />
                ) : (
                  <RowComponent justify="center">
                    <LocationTick
                      size={16}
                      color={appColors.green}
                      variant="Bold"
                    />
                    <SpaceComponent width={5} />
                    <TextComponent
                      text={addressSelected}
                      styles={{flex: 1}}
                      numberOfLine={1}
                    />
                    <TouchableOpacity
                      onPress={() => {
                        setAddressSelected('');
                      }}>
                      <AntDesign
                        name="close"
                        size={16}
                        color={appColors.text}
                      />
                    </TouchableOpacity>
                  </RowComponent>
                )}
              </View>
            )}
          </View>

          <SpaceComponent width={12} />
          <ButtonComponent text="Hủy" type="link" onpress={handleCancel} />
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
            currentLocation
              ? [currentLocation.long, currentLocation.lat]
              : undefined
          } // [lng, lat]
        />
        <MapboxGL.PointAnnotation
          id="current-location"
          coordinate={[
            currentLocation?.long as number,
            currentLocation?.lat as number,
          ]}>
          <View></View>
        </MapboxGL.PointAnnotation>
      </MapboxGL.MapView>

      {/* // LocationModal.tsx:123 10.76036, 106.68135 */}

      <ButtonComponent
        text="Submit"
        type="primary"
        styles={{
          position: 'absolute',
          bottom: 10,
          left: appInfo.sizes.WIDTH * 0.1,
          right: 0,
        }}
        onpress={() => {
          onSelect({
            address: addressSelected,
            position: currentLocation,
          });

          onClose();
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

export default LocationModal;
