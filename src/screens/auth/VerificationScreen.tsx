import {View, Text} from 'react-native';
import React from 'react';

const VerificationScreen = ({navigation, route}: any) => {
  const {code, fullname, email, password} = route.params;
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>{`${code}`}</Text>
      <Text>{`${fullname}`}</Text>
      <Text>{`${email}`}</Text>
      <Text>{`${password}`}</Text>
    </View>
  );
};

export default VerificationScreen;
