import { Link } from 'react-router-dom';
import Container from '../../components/Container/Container';
import Button from '../../components/Button/Button';
import Highlight from '../../components/Highlight/Highlight';
import styles from './NotFound.module.css';

function NotFound() {
  return (
    <section className={styles.section}>
      <Container>
        <div className={styles.panel}>
          <p className={styles.code}>404</p>

          <h1 className={styles.title}>
            This page took an <Highlight>unplanned</Highlight> vacation
          </h1>

          <p className={styles.description}>
            The page you are looking for does not exist or has been moved. Head
            back home and keep learning.
          </p>

          <Button as={Link} to="/" className={styles.cta}>
            Go home
          </Button>
        </div>
      </Container>
    </section>
  );
}

export default NotFound;
