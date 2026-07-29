import TeacherCard from '../TeacherCard/TeacherCard';
import styles from './TeacherList.module.css';

function TeacherList({ teachers, isFavorite, onToggleFavorite }) {
  return (
    <ul className={styles.list}>
      {teachers.map((teacher) => (
        <li key={teacher.id}>
          <TeacherCard
            teacher={teacher}
            isFavorite={isFavorite(teacher.id)}
            onToggleFavorite={() => onToggleFavorite(teacher.id)}
          />
        </li>
      ))}
    </ul>
  );
}

export default TeacherList;
