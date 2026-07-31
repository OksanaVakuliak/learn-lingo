import { object, string } from 'yup';
import { email, name } from './fieldSchemas';

const password = string()
  .required('Password is required')
  .min(6, 'Password must be at least 6 characters long');

export const loginSchema = object({ email, password });

export const registrationSchema = object({ name, email, password });
