import { useId } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from '../Button/Button';
import Input from '../Input/Input';
import { BOOKING_REASONS, bookingSchema } from '../../utils/bookingSchema';
import styles from './BookingForm.module.css';

function BookingForm({ onBooked }) {
  const reasonErrorId = useId();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(bookingSchema) });

  return (
    <form className={styles.form} onSubmit={handleSubmit(onBooked)} noValidate>
      <fieldset
        className={styles.reasons}
        aria-describedby={errors.reason ? reasonErrorId : undefined}
      >
        <legend className={styles.legend}>
          What is your main reason for learning English?
        </legend>

        <div className={styles.options}>
          {BOOKING_REASONS.map((reason) => (
            <label key={reason} className={styles.option}>
              <input
                type="radio"
                value={reason}
                className={styles.radio}
                {...register('reason')}
              />
              {reason}
            </label>
          ))}
        </div>

        {errors.reason && (
          <p id={reasonErrorId} className={styles.error} role="alert">
            {errors.reason.message}
          </p>
        )}
      </fieldset>

      <div className={styles.fields}>
        <Input
          placeholder="Full Name"
          autoComplete="name"
          error={errors.name?.message}
          {...register('name')}
        />

        <Input
          type="email"
          placeholder="Email"
          autoComplete="email"
          error={errors.email?.message}
          {...register('email')}
        />

        <Input
          type="tel"
          placeholder="Phone number"
          autoComplete="tel"
          error={errors.phone?.message}
          {...register('phone')}
        />
      </div>

      <Button type="submit" className={styles.submit}>
        Book
      </Button>
    </form>
  );
}

export default BookingForm;
