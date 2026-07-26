import { useId, useState } from 'react';
import Icon from '../Icon/Icon';
import styles from './Input.module.css';

function Input({ type = 'text', error, className, ...props }) {
  const errorId = useId();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const isPassword = type === 'password';
  const classes = [
    styles.input,
    isPassword && styles.withToggle,
    error && styles.invalid,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={styles.field}>
      <div className={styles.control}>
        <input
          type={isPassword && isPasswordVisible ? 'text' : type}
          className={classes}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            className={styles.toggle}
            onClick={() => setIsPasswordVisible((visible) => !visible)}
            aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
          >
            <Icon name={isPasswordVisible ? 'eye' : 'eye-off'} size={20} />
          </button>
        )}
      </div>

      {error && (
        <p id={errorId} className={styles.error}>
          {error}
        </p>
      )}
    </div>
  );
}

export default Input;
