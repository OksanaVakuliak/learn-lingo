import styles from './Loader.module.css';

function Loader({ label = 'Loading', inline = false }) {
  const classes = [styles.loader, inline && styles.inline]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} role="status">
      <span className={styles.spinner} />
      <span className={styles.label}>{label}</span>
    </div>
  );
}

export default Loader;
