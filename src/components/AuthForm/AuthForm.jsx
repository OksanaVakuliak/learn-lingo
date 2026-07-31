import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from '../Button/Button';
import Input from '../Input/Input';
import useAuth from '../../hooks/useAuth';
import { loginSchema, registrationSchema } from '../../utils/authSchemas';
import styles from './AuthForm.module.css';

const MODES = {
  login: {
    resolver: yupResolver(loginSchema),
    submitLabel: 'Log In',
    pendingLabel: 'Signing in…',
  },
  register: {
    resolver: yupResolver(registrationSchema),
    submitLabel: 'Sign Up',
    pendingLabel: 'Signing up…',
  },
};

function AuthForm({ mode, onSuccess }) {
  const { login, register: registerUser } = useAuth();
  const [submitError, setSubmitError] = useState('');

  const { resolver, submitLabel, pendingLabel } = MODES[mode];
  const isRegistration = mode === 'register';

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver });

  const onSubmit = async (credentials) => {
    setSubmitError('');

    try {
      await (isRegistration ? registerUser(credentials) : login(credentials));
      onSuccess();
    } catch (error) {
      setSubmitError(error.message);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      {isRegistration && (
        <Input
          placeholder="Name"
          autoComplete="name"
          error={errors.name?.message}
          {...register('name')}
        />
      )}

      <Input
        type="email"
        placeholder="Email"
        autoComplete="email"
        error={errors.email?.message}
        {...register('email')}
      />

      <Input
        type="password"
        placeholder="Password"
        autoComplete={isRegistration ? 'new-password' : 'current-password'}
        error={errors.password?.message}
        {...register('password')}
      />

      {submitError && (
        <p className={styles.submitError} role="alert">
          {submitError}
        </p>
      )}

      <Button type="submit" className={styles.submit} disabled={isSubmitting}>
        {isSubmitting ? pendingLabel : submitLabel}
      </Button>
    </form>
  );
}

export default AuthForm;
