import { object, string } from 'yup';
import { email, name } from './fieldSchemas';

export const BOOKING_REASONS = [
  'Career and business',
  'Lesson for kids',
  'Living abroad',
  'Exams and coursework',
  'Culture, travel or hobby',
];

export const bookingSchema = object({
  reason: string()
    .required('Please choose a reason')
    .oneOf(BOOKING_REASONS, 'Please choose a reason'),
  name,
  email,
  phone: string()
    .trim()
    .required('Phone number is required')
    .matches(/^\+?[\d\s()-]{7,20}$/, 'Please enter a valid phone number')
    .test(
      'phone-digits',
      'Please enter a valid phone number',
      (value) => (value ?? '').replace(/\D/g, '').length >= 7
    ),
});
