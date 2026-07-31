const STORAGE_KEY = 'learn-lingo:theme';

export const THEMES = [
  { id: 'yellow', label: 'Yellow' },
  { id: 'green', label: 'Green' },
  { id: 'blue', label: 'Blue' },
  { id: 'rose', label: 'Rose' },
  { id: 'salmon', label: 'Salmon' },
];

export const DEFAULT_THEME = THEMES[0].id;

export function readTheme() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);

    return THEMES.some((theme) => theme.id === stored) ? stored : DEFAULT_THEME;
  } catch {
    return DEFAULT_THEME;
  }
}

export function writeTheme(id) {
  try {
    localStorage.setItem(STORAGE_KEY, id);
  } catch {
    // Keep the theme for this session when persistence is unavailable.
  }
}
