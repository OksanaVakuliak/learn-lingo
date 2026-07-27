import { useEffect, useState } from 'react';
import Button from '../../components/Button/Button';
import Container from '../../components/Container/Container';
import TeacherCard from '../../components/TeacherCard/TeacherCard';
import { getTeachersPage } from '../../services/teachers';
import styles from './Teachers.module.css';

function Teachers() {
  const [teachers, setTeachers] = useState([]);
  const [nextKey, setNextKey] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;

    getTeachersPage()
      .then((page) => {
        if (!active) {
          return;
        }

        setTeachers(page.teachers);
        setNextKey(page.nextKey);
      })
      .catch((loadError) => {
        if (active) {
          setError(loadError);
        }
      })
      .finally(() => {
        if (active) {
          setIsLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  const handleLoadMore = () => {
    setIsLoading(true);
    setError(null);

    getTeachersPage(nextKey)
      .then((page) => {
        setTeachers((loaded) => [...loaded, ...page.teachers]);
        setNextKey(page.nextKey);
      })
      .catch(setError)
      .finally(() => setIsLoading(false));
  };

  return (
    <section className={styles.section}>
      <Container>
        <div className={styles.content}>
          <h1 className={styles.title}>Teachers</h1>

          {teachers.length > 0 && (
            <ul className={styles.list}>
              {teachers.map((teacher) => (
                <li key={teacher.id}>
                  <TeacherCard teacher={teacher} />
                </li>
              ))}
            </ul>
          )}

          {isLoading && <p className={styles.status}>Loading teachers…</p>}

          {error && (
            <div className={styles.error} role="alert">
              <p className={styles.errorMessage}>{error.message}</p>
              <Button onClick={handleLoadMore} className={styles.action}>
                Try again
              </Button>
            </div>
          )}

          {!isLoading && !error && teachers.length === 0 && (
            <p className={styles.status}>No teachers to show yet.</p>
          )}

          {!isLoading && !error && nextKey && (
            <Button onClick={handleLoadMore} className={styles.action}>
              Load more
            </Button>
          )}
        </div>
      </Container>
    </section>
  );
}

export default Teachers;
