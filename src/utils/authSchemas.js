import { object, string } from 'yup';

const email = string()
  .trim()
  .required('Email is required')
  .email('Please enter a valid email address');

const password = string()
  .required('Password is required')
  .min(6, 'Password must be at least 6 characters long');

export const loginSchema = object({ email, password });

export const registrationSchema = object({
  name: string().trim().required('Name is required'),
  email,
  password,
});
