import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import AuthForm from '../../components/AuthForm/AuthForm';
import Button from '../../components/Button/Button';
import Container from '../../components/Container/Container';
import Loader from '../../components/Loader/Loader';
import Modal from '../../components/Modal/Modal';
import TeacherFilters from '../../components/TeacherFilters/TeacherFilters';
import TeacherList from '../../components/TeacherList/TeacherList';
import useAuth from '../../hooks/useAuth';
import useFavorites from '../../hooks/useFavorites';
import { getTeachers } from '../../services/teachers';
import {
  EMPTY_FILTERS,
  buildFilterOptions,
  filterTeachers,
} from '../../utils/teacherFilters';
import styles from './Teachers.module.css';

const PAGE_SIZE = 4;

function Teachers() {
  const { user } = useAuth();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [teachers, setTeachers] = useState([]);
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
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
    load();

    return () => {
      isMounted.current = false;
    };
  }, [load]);

  const handleRetry = () => {
    setIsLoading(true);
    setError(null);
    load();
  };

  const handleFilterChange = (name, value) => {
    setFilters((current) => ({ ...current, [name]: value }));
    setVisibleCount(PAGE_SIZE);
  };

  const options = useMemo(() => buildFilterOptions(teachers), [teachers]);

  const matching = useMemo(
    () => filterTeachers(teachers, filters),
    [teachers, filters]
  );

  const visible = matching.slice(0, visibleCount);
  const hasMore = visibleCount < matching.length;
  const isFiltered = Object.values(filters).some(Boolean);

  return (
    <section className={styles.section}>
      <Container>
        <div className={styles.content}>
          <h1 className={styles.title}>Teachers</h1>

          {teachers.length > 0 && (
            <TeacherFilters
              filters={filters}
              options={options}
              onChange={handleFilterChange}
            />
          )}

          {visible.length > 0 && (
            <TeacherList
              teachers={visible}
              activeLevel={filters.level}
              isFavorite={isFavorite}
              onToggleFavorite={handleToggleFavorite}
            />
          )}

          {isLoading && <Loader label="Loading teachers" />}

          {error && (
            <div className={styles.error} role="alert">
              <p className={styles.errorMessage}>{error.message}</p>
              <Button onClick={handleRetry} className={styles.action}>
                Try again
              </Button>
            </div>
          )}

          {!isLoading && !error && matching.length === 0 && (
            <p className={styles.status} role="status">
              {isFiltered
                ? 'No teachers match the selected filters. Try a different combination.'
                : 'No teachers to show yet.'}
            </p>
          )}

          {hasMore && (
            <Button
              onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
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
