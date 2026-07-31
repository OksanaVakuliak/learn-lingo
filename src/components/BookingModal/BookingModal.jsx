import { useEffect, useRef, useState } from 'react';
import Button from '../Button/Button';
import BookingForm from '../BookingForm/BookingForm';
import Modal from '../Modal/Modal';
import styles from './BookingModal.module.css';

const INTRO =
  'Our experienced tutor will assess your current language level, discuss your learning goals, and tailor the lesson to your specific needs.';

function BookingModal({ teacher, onClose }) {
  const [booking, setBooking] = useState(null);
  const confirmationRef = useRef(null);

  const fullName = `${teacher.name} ${teacher.surname}`;

  useEffect(() => {
    confirmationRef.current?.focus();
  }, [booking]);

  return (
    <Modal
      className={styles.dialog}
      title="Book trial lesson"
      description={booking ? undefined : INTRO}
      onClose={onClose}
    >
      <div className={styles.teacher}>
        <img
          className={styles.avatar}
          src={teacher.avatar_url}
          alt=""
          width="44"
          height="44"
        />

        <div>
          <p className={styles.label}>Your teacher</p>
          <p className={styles.name}>{fullName}</p>
        </div>
      </div>

      {booking ? (
        <div
          ref={confirmationRef}
          className={styles.confirmation}
          role="status"
          tabIndex={-1}
        >
          <p className={styles.message}>
            Thank you, {booking.name}. Your request for a trial lesson with{' '}
            {fullName} has been sent — the confirmation with the time will come
            to {booking.email}.
          </p>

          <Button onClick={onClose} className={styles.action}>
            Close
          </Button>
        </div>
      ) : (
        <BookingForm onBooked={setBooking} />
      )}
    </Modal>
  );
}

export default BookingModal;
