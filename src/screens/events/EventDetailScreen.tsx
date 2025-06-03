import {View, Text} from 'react-native';
import React from 'react';

const EventDetailScreen = ({navigation, route}: any) => {
  console.log(route.params);

  return (
    <View>
      <Text>EventDetailScreen</Text>
    </View>
  );
};

export default EventDetailScreen;
