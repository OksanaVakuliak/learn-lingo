import { useState } from 'react';
import BookingModal from '../BookingModal/BookingModal';
import TeacherCard from '../TeacherCard/TeacherCard';
import styles from './TeacherList.module.css';

function TeacherList({ teachers, isFavorite, onToggleFavorite }) {
  const [bookedTeacher, setBookedTeacher] = useState(null);

  return (
    <>
      <ul className={styles.list}>
        {teachers.map((teacher) => (
          <li key={teacher.id}>
            <TeacherCard
              teacher={teacher}
              isFavorite={isFavorite(teacher.id)}
              onToggleFavorite={() => onToggleFavorite(teacher.id)}
              onBookTrial={() => setBookedTeacher(teacher)}
            />
          </li>
        ))}
      </ul>

      {bookedTeacher && (
        <BookingModal
          teacher={bookedTeacher}
          onClose={() => setBookedTeacher(null)}
        />
      )}
    </>
  );
}

export default TeacherList;
