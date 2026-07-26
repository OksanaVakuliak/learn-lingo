import styles from './Highlight.module.css';

function Highlight({ children }) {
  return <em className={styles.highlight}>{children}</em>;
}

export default Highlight;
