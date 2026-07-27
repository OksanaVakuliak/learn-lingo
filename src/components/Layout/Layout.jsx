import { Outlet, useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

function Layout() {
  const location = useLocation();

  return (
    <>
      <Header />
      <main>
        <ErrorBoundary resetKey={location.key}>
          <Outlet />
        </ErrorBoundary>
      </main>
    </>
  );
}

export default Layout;
