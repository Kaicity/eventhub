import React from 'react';
import {Text, View} from 'react-native';
import ButtonComponent from '../../components/ButtonComponent';
import {globalStyle} from '../../styles/globalStyles';

const LoginScreen = () => {
  return (
    <View style={[globalStyle.container, {padding: 16}]}>
      <Text>LoginScreen</Text>
      {/* <Button
        title="Login"
        onPress={async () => {
          await AsyncStorage.setItem('accessToken', 'itmix');
        }}
      /> */}

      <ButtonComponent
        type="link"
        text="Forget password"
        icon={<Text>N</Text>}
        onpress={() => console.log('LOGIN HERE')}
      />
    </View>
  );
};

export default LoginScreen;
