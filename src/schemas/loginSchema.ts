import * as Yup from 'yup';

const LoginSchema = Yup.object().shape({
  email: Yup.string().required('Please enter email'),
  password: Yup.string().required('Please enter password'),
});

export default LoginSchema;
