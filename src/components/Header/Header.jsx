import { useCallback, useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Container from '../Container/Container';
import Icon from '../Icon/Icon';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import AuthForm from '../AuthForm/AuthForm';
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const authRef = useRef(null);
  const toggleRef = useRef(null);
  const menuRef = useRef(null);
  const modalReturnRef = useRef(null);

  const closeModal = useCallback(() => setActiveModal(null), []);
  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  useEffect(() => {
    const breakpoint = getComputedStyle(document.documentElement)
      .getPropertyValue('--menu-breakpoint')
      .trim();
    const desktop = window.matchMedia(`(min-width: ${breakpoint})`);
    const handleChange = (event) => event.matches && closeMenu();

    desktop.addEventListener('change', handleChange);

    return () => desktop.removeEventListener('change', handleChange);
  }, [closeMenu]);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const initialOverflow = document.body.style.overflow;
    const main = document.querySelector('main');

    document.body.style.overflow = 'hidden';

    if (main) {
      main.inert = true;
    }

    const focusFrame = requestAnimationFrame(() =>
      menuRef.current?.querySelector('a, button')?.focus()
    );

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeMenu();
        toggleRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      cancelAnimationFrame(focusFrame);
      document.body.style.overflow = initialOverflow;

      if (main) {
        main.inert = false;
      }

      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMenuOpen, closeMenu]);

  const handleLogout = async () => {
    setLogoutError('');
    closeMenu();

    try {
      await logout();
    } catch (error) {
      setLogoutError(error.message);
    }
  };

  const openModal = (mode) => {
    modalReturnRef.current = isMenuOpen ? toggleRef.current : authRef.current;
    closeMenu();
    setActiveModal(mode);
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

        <button
          ref={toggleRef}
          type="button"
          className={styles.toggle}
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-expanded={isMenuOpen}
          aria-controls="header-menu"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        >
          <Icon name={isMenuOpen ? 'close' : 'menu'} size={28} />
        </button>

        {isMenuOpen && <div className={styles.backdrop} onClick={closeMenu} />}

        <div
          id="header-menu"
          ref={menuRef}
          className={isMenuOpen ? `${styles.menu} ${styles.open}` : styles.menu}
        >
          <nav onClick={closeMenu}>
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

          <div className={styles.auth} ref={authRef}>
            <ThemeSwitcher className={styles.themes} />

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
                    onClick={() => openModal('login')}
                  >
                    <Icon
                      name="log-in"
                      size={20}
                      className={styles.loginIcon}
                    />
                    Log in
                  </button>
                  <Button variant="dark" onClick={() => openModal('register')}>
                    Registration
                  </Button>
                </>
              ))}
          </div>
        </div>
      </Container>

      {activeModal && (
        <Modal
          title={AUTH_MODALS[activeModal].title}
          description={AUTH_MODALS[activeModal].description}
          onClose={closeModal}
          returnFocusRef={modalReturnRef}
        >
          <AuthForm mode={activeModal} onSuccess={closeModal} />
        </Modal>
      )}
    </header>
  );
}

export default Header;
