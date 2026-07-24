import { NavLink } from 'react-router-dom';
import Container from '../Container/Container';
import Icon from '../Icon/Icon';
import Button from '../Button/Button';
import useAuth from '../../hooks/useAuth';
import styles from './Header.module.css';

const navLinkClass = ({ isActive }) =>
  isActive ? `${styles.link} ${styles.active}` : styles.link;

function Header() {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.warn(error.message);
    }
  };

  return (
    <header className={styles.header}>
      <Container className={styles.inner}>
        <NavLink to="/" className={styles.logo}>
          <Icon name="book-open" size={28} className={styles.logoIcon} />
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
          {user ? (
            <>
              <span className={styles.userName}>{user.name || user.email}</span>
              <Button variant="dark" onClick={handleLogout}>
                Log out
              </Button>
            </>
          ) : (
            <>
              <button type="button" className={styles.loginButton}>
                <Icon name="log-in" size={20} className={styles.loginIcon} />
                Log in
              </button>
              <Button variant="dark">Registration</Button>
            </>
          )}
        </div>
      </Container>
    </header>
  );
}

export default Header;
