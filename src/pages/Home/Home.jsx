import { Link } from 'react-router-dom';
import Container from '../../components/Container/Container';
import Button from '../../components/Button/Button';
import Highlight from '../../components/Highlight/Highlight';
import styles from './Home.module.css';

const STATS = [
  { value: '32,000 +', label: 'Experienced tutors' },
  { value: '300,000 +', label: '5-star tutor reviews' },
  { value: '120 +', label: 'Subjects taught' },
  { value: '200 +', label: 'Tutor nationalities' },
];

function Home() {
  return (
    <>
      <section>
        <Container className={styles.heroGrid}>
          <div className={styles.intro}>
            <h1 className={styles.title}>
              Unlock your potential with the best{' '}
              <Highlight>language</Highlight> tutors
            </h1>

            <p className={styles.description}>
              Embark on an Exciting Language Journey with Expert Language
              Tutors: Elevate your language proficiency to new heights by
              connecting with highly qualified and experienced tutors.
            </p>

            <Button as={Link} to="/teachers" className={styles.cta}>
              Get started
            </Button>
          </div>

          <div className={styles.illustration}>
            <img
              className={styles.sticker}
              src={`${import.meta.env.BASE_URL}hero-sticker.webp`}
              alt=""
              width={339}
              height={339}
            />
            <img
              className={styles.mac}
              src={`${import.meta.env.BASE_URL}hero-mac.svg`}
              alt=""
              width={391}
              height={176}
            />
          </div>
        </Container>
      </section>

      <section className={styles.benefits} aria-label="LearnLingo in numbers">
        <Container>
          <div className={styles.stats}>
            <svg className={styles.frame} aria-hidden="true" focusable="false">
              <rect className={styles.frameOutline} width="100%" height="100%" />
            </svg>

            <ul className={styles.list}>
              {STATS.map(({ value, label }) => (
                <li key={label} className={styles.stat}>
                  <span className={styles.statValue}>{value}</span>
                  <span className={styles.statLabel}>{label}</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>
    </>
  );
}

export default Home;
