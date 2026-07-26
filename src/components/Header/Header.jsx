import { useCallback, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Container from '../Container/Container';
import Icon from '../Icon/Icon';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import AuthForm from '../AuthForm/AuthForm';
import useAuth from '../../hooks/useAuth';
import styles from './Header.module.css';

const navLinkClass = ({ isActive }) =>
  isActive ? `${styles.link} ${styles.active}` : styles.link;

const AUTH_MODALS = {
  login: {
    title: 'Log In',
    description:
      'Welcome back! Please enter your credentials to access your account and continue your search for a teacher.',
  },
  register: {
    title: 'Registration',
    description:
      'Thank you for your interest in our platform! In order to register, we need some information. Please provide us with the following information',
  },
};

function Header() {
  const { user, isLoading, logout } = useAuth();
  const [logoutError, setLogoutError] = useState('');
  const [activeModal, setActiveModal] = useState(null);

  const closeModal = useCallback(() => setActiveModal(null), []);

  const handleLogout = async () => {
    setLogoutError('');

    try {
      await logout();
    } catch (error) {
      setLogoutError(error.message);
    }
  };

  return (
    <header className={styles.header}>
      <Container className={styles.inner}>
        <NavLink to="/" className={styles.logo}>
          <img
            src={`${import.meta.env.BASE_URL}logo.svg`}
            alt=""
            width={28}
            height={28}
          />
          LearnLingo
        </NavLink>

        <nav>
          <ul className={styles.nav}>
            <li>
              <NavLink to="/" className={navLinkClass} end>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/teachers" className={navLinkClass}>
                Teachers
              </NavLink>
            </li>
            {user && (
              <li>
                <NavLink to="/favorites" className={navLinkClass}>
                  Favorites
                </NavLink>
              </li>
            )}
          </ul>
        </nav>

        <div className={styles.auth}>
          {!isLoading &&
            (user ? (
              <>
                {logoutError && (
                  <span className={styles.error} role="alert">
                    {logoutError}
                  </span>
                )}
                <span className={styles.userName}>
                  {user.name || user.email}
                </span>
                <Button variant="dark" onClick={handleLogout}>
                  Log out
                </Button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  className={styles.loginButton}
                  onClick={() => setActiveModal('login')}
                >
                  <Icon name="log-in" size={20} className={styles.loginIcon} />
                  Log in
                </button>
                <Button
                  variant="dark"
                  onClick={() => setActiveModal('register')}
                >
                  Registration
                </Button>
              </>
            ))}
        </div>
      </Container>

      {activeModal && (
        <Modal
          title={AUTH_MODALS[activeModal].title}
          description={AUTH_MODALS[activeModal].description}
          onClose={closeModal}
        >
          <AuthForm mode={activeModal} onSuccess={closeModal} />
        </Modal>
      )}
    </header>
  );
}

export default Header;
