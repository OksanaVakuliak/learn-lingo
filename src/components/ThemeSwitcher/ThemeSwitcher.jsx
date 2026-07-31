import useTheme from '../../hooks/useTheme';
import { THEMES } from '../../services/theme';
import styles from './ThemeSwitcher.module.css';

function ThemeSwitcher({ className }) {
  const { theme, changeTheme } = useTheme();

  return (
    <div
      className={[styles.switcher, className].filter(Boolean).join(' ')}
      role="group"
      aria-label="Color theme"
    >
      {THEMES.map(({ id, label }) => (
        <button
          key={id}
          type="button"
          className={styles.swatch}
          data-color={id}
          aria-pressed={id === theme}
          aria-label={`${label} theme`}
          onClick={() => changeTheme(id)}
        />
      ))}
    </div>
  );
}

export default ThemeSwitcher;
