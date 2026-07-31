import Select from '../Select/Select';
import styles from './TeacherFilters.module.css';

function TeacherFilters({ filters, options, onChange }) {
  const toOptions = (values, format) =>
    values.map((value) => ({
      value: String(value),
      label: format ? format(value) : value,
    }));

  return (
    <div className={styles.filters}>
      <Select
        label="Languages"
        placeholder="All languages"
        className={styles.language}
        value={filters.language}
        options={toOptions(options.languages)}
        onChange={(value) => onChange('language', value)}
      />

      <Select
        label="Level of knowledge"
        placeholder="All levels"
        className={styles.level}
        value={filters.level}
        options={toOptions(options.levels)}
        onChange={(value) => onChange('level', value)}
      />

      <Select
        label="Price / 1 hour"
        placeholder="Any price"
        className={styles.price}
        value={filters.price}
        options={toOptions(options.prices, (price) => `${price} $`)}
        onChange={(value) => onChange('price', value)}
      />
    </div>
  );
}

export default TeacherFilters;
