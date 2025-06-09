import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Modal, View} from 'react-native';
import {
  ButtonComponent,
  InputComponent,
  RowComponent,
  SpaceComponent,
  TextComponent,
} from '../components';
import {SearchNormal} from 'iconsax-react-native';
import {appColors} from '../constants/appColors';
import axios from 'axios';
import {LocationModel} from '../models/location-model';

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

  useEffect(() => {
    if (!searchKey) {
      setLocations([]);
    }
  }, []);

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
          <SpaceComponent width={12} />
          <ButtonComponent text="Cancel" type="link" onpress={onClose} />
        </RowComponent>

        <View>
          {isLoading ? (
            <ActivityIndicator />
          ) : locations.length > 0 ? (
            <FlatList
              data={locations}
              renderItem={({item}) => (
                <TextComponent text={item.address.label} />
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
      </View>
    </Modal>
  );
};

export default LocationModal;
