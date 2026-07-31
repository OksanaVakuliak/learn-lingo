import { useEffect, useRef, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import styles from './Layout.module.css';

const PAGE_NAMES = {
  '/': 'Home',
  '/teachers': 'Teachers',
  '/favorites': 'Favorites',
};

function Layout() {
  const location = useLocation();
  const mainRef = useRef(null);
  const previousPath = useRef(location.pathname);
  const [announcement, setAnnouncement] = useState('');

  const pageName = PAGE_NAMES[location.pathname] ?? 'Page not found';

  useEffect(() => {
    document.title = `${pageName} | LearnLingo`;
  }, [pageName]);

  useEffect(() => {
    if (location.pathname === previousPath.current) {
      return;
    }

    previousPath.current = location.pathname;
    mainRef.current.focus();
    setAnnouncement(`${pageName} page`);
  }, [location.pathname, pageName]);

  return (
    <>
      <Header />

      <main ref={mainRef} className={styles.main} tabIndex={-1}>
        <ErrorBoundary resetKey={location.key}>
          <Outlet />
        </ErrorBoundary>
      </main>

      <p className={styles.announcer} role="status">
        {announcement}
      </p>
    </>
  );
}

export default Layout;
