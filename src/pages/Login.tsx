import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import InputError from '../components/Form/InputError';
import useAuth from '../context/AuthContext/AuthProvider';

interface ILoginForm {
  email: string;
  password: string;
}

export default function Login() {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForm>();

  const onSubmit: SubmitHandler<ILoginForm> = () => {
    setIsLoggedIn(true);
    navigate('/todos');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-input">
        <input
          placeholder="Enter your e-mail address"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: 'Email format is invalid',
            },
          })}
        />
        <InputError field={errors.email} />
      </div>

      <div className="form-input">
        <input
          type="password"
          placeholder="Enter your password"
          {...register('password', {
            required: 'Password is required',
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/i,
              message: 'Password requires A-z, 0-9 and 6 characters',
            },
          })}
        />
        <InputError field={errors.password} />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}
