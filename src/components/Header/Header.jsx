import { NavLink } from 'react-router-dom';
import Container from '../Container/Container';
import Icon from '../Icon/Icon';
import useAuth from '../../hooks/useAuth';
import styles from './Header.module.css';

const navLinkClass = ({ isActive }) =>
  isActive ? `${styles.link} ${styles.active}` : styles.link;

function Header() {
  const { user } = useAuth();

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
      </Container>
    </header>
  );
}

export default Header;
