import { useCallback, useEffect, useRef, useState } from 'react';
import AuthForm from '../../components/AuthForm/AuthForm';
import Button from '../../components/Button/Button';
import Container from '../../components/Container/Container';
import Loader from '../../components/Loader/Loader';
import Modal from '../../components/Modal/Modal';
import TeacherList from '../../components/TeacherList/TeacherList';
import useAuth from '../../hooks/useAuth';
import useFavorites from '../../hooks/useFavorites';
import { getTeachersPage } from '../../services/teachers';
import styles from './Teachers.module.css';

function Teachers() {
  const { user } = useAuth();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [teachers, setTeachers] = useState([]);
  const [nextKey, setNextKey] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoginRequired, setIsLoginRequired] = useState(false);
  const isMounted = useRef(true);

  const closeLoginPrompt = useCallback(() => setIsLoginRequired(false), []);

  const handleToggleFavorite = (teacherId) => {
    if (!user) {
      setIsLoginRequired(true);
      return;
    }

    toggleFavorite(teacherId);
  };

  useEffect(() => {
    let active = true;
    isMounted.current = true;

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
      isMounted.current = false;
    };
  }, []);

  const handleLoadMore = () => {
    setIsLoading(true);
    setError(null);

    getTeachersPage(nextKey)
      .then((page) => {
        if (!isMounted.current) {
          return;
        }

        setTeachers((loaded) => [...loaded, ...page.teachers]);
        setNextKey(page.nextKey);
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
  };

  return (
    <section className={styles.section}>
      <Container>
        <div className={styles.content}>
          <h1 className={styles.title}>Teachers</h1>

          {teachers.length > 0 && (
            <TeacherList
              teachers={teachers}
              isFavorite={isFavorite}
              onToggleFavorite={handleToggleFavorite}
            />
          )}

          {isLoading && (
            <Loader
              inline={teachers.length > 0}
              label={
                teachers.length === 0
                  ? 'Loading teachers'
                  : 'Loading more teachers'
              }
            />
          )}

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

          {!error && nextKey && (
            <Button
              onClick={handleLoadMore}
              disabled={isLoading}
              className={styles.action}
            >
              Load more
            </Button>
          )}
        </div>
      </Container>

      {isLoginRequired && (
        <Modal
          title="Log In"
          description="Adding teachers to favorites is available to logged-in users only. Log in to keep your picks and find them on the Favorites page."
          onClose={closeLoginPrompt}
        >
          <AuthForm mode="login" onSuccess={closeLoginPrompt} />
        </Modal>
      )}
    </section>
  );
}

export default Teachers;
