import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Container from '../../components/Container/Container';
import Loader from '../../components/Loader/Loader';
import TeacherList from '../../components/TeacherList/TeacherList';
import useFavorites from '../../hooks/useFavorites';
import { getTeachers } from '../../services/teachers';
import styles from './Favorites.module.css';

function Favorites() {
  const { favorites, isFavorite, toggleFavorite } = useFavorites();
  const [hasSavedTeachers] = useState(() => favorites.length > 0);
  const [teachers, setTeachers] = useState([]);
  const [isLoading, setIsLoading] = useState(hasSavedTeachers);
  const [error, setError] = useState(null);
  const isMounted = useRef(true);

  const load = useCallback(() => {
    getTeachers()
      .then((loaded) => {
        if (isMounted.current) {
          setTeachers(loaded);
        }
      })
      .catch((loadError) => {
        if (isMounted.current) {
          setError(loadError);
        }
      })
      .finally(() => {
        if (isMounted.current) {
          setIsLoading(false);
        }
      });
  }, []);

  useEffect(() => {
    isMounted.current = true;

    if (hasSavedTeachers) {
      load();
    }

    return () => {
      isMounted.current = false;
    };
  }, [hasSavedTeachers, load]);

  const handleRetry = () => {
    setIsLoading(true);
    setError(null);
    load();
  };

  const savedTeachers = useMemo(() => {
    const byId = new Map(teachers.map((teacher) => [teacher.id, teacher]));

    return favorites.map((id) => byId.get(id)).filter(Boolean);
  }, [teachers, favorites]);

  return (
    <section className={styles.section}>
      <Container>
        <div className={styles.content}>
          <h1 className={styles.title}>Favorites</h1>

          {savedTeachers.length > 0 && (
            <TeacherList
              teachers={savedTeachers}
              isFavorite={isFavorite}
              onToggleFavorite={toggleFavorite}
            />
          )}

          {isLoading && <Loader label="Loading favorites" />}

          {error && (
            <div className={styles.error} role="alert">
              <p className={styles.errorMessage}>{error.message}</p>
              <Button onClick={handleRetry} className={styles.action}>
                Try again
              </Button>
            </div>
          )}

          {!isLoading && !error && savedTeachers.length === 0 && (
            <div className={styles.empty}>
              <p className={styles.status}>
                You have no favorite teachers yet. Add the ones you like and
                they will wait for you here.
              </p>
              <Button as={Link} to="/teachers" className={styles.action}>
                Find a teacher
              </Button>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}

export default Favorites;
