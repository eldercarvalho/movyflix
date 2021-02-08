import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

import { signIn, Store } from '../../store';

import Button from '../Button';
import TextField from '../TextField';

import { Form } from './styles';

const schema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
});

interface SignInFormData {
  username: string;
  password: string;
}

const SignInForm: React.FC = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, errors } = useForm<SignInFormData>({
    resolver: yupResolver(schema),
  });
  const isFetching = useSelector((state: Store) => state.auth.isFetching);

  const onSubmit = (data: SignInFormData) => {
    const urlParams = new URLSearchParams(window.location.search);
    const request_token = urlParams.get('request_token') || '';
    dispatch(signIn({ ...data, request_token }));
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        ref={register}
        label="Username"
        type="text"
        name="username"
        error={errors.username?.message}
        autoComplete="off"
      />

      <TextField
        ref={register}
        label="Password"
        type="password"
        name="password"
        error={errors.password?.message}
      />

      <Button type="submit" full loading={isFetching} disabled={isFetching}>
        Sign In
      </Button>
    </Form>
  );
};

export default SignInForm;
