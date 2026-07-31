import { useId } from 'react';
import Icon from '../Icon/Icon';
import styles from './Select.module.css';

function Select({ label, value, options, placeholder, onChange, className }) {
  const selectId = useId();

  return (
    <div className={[styles.field, className].filter(Boolean).join(' ')}>
      <label className={styles.label} htmlFor={selectId}>
        {label}
      </label>

      <div className={styles.control}>
        <select
          id={selectId}
          className={styles.select}
          value={value}
          onChange={(event) => onChange(event.target.value)}
        >
          <option value="">{placeholder}</option>

          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <Icon name="chevron-down" size={20} className={styles.icon} />
      </div>
    </div>
  );
}

export default Select;
