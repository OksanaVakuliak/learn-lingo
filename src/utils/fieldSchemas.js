import { string } from 'yup';

export const email = string()
  .trim()
  .required('Email is required')
  .email('Please enter a valid email address');

export const name = string().trim().required('Name is required');
