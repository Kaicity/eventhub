import ToastComponent from '../components/ToastComponent';

const toastConfig = {
  success: (props: any) => <ToastComponent {...props} />,
  error: (props: any) => <ToastComponent {...props} />,
  info: (props: any) => <ToastComponent {...props} />,
};

export default toastConfig;
