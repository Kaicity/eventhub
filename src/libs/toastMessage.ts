import Toast, {ToastType} from 'react-native-toast-message';

interface Props {
  type: ToastType;
  text1: string;
  text2?: string;
}

const showToastMessage = (props: Props) => {
  const {type, text1, text2} = props;

  Toast.show({
    type: type,
    text1: text1,
    text2: text2,
  });
};

export default showToastMessage;
