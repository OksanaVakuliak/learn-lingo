import { useCallback, useEffect, useMemo, useState } from 'react';
import { readTheme, writeTheme } from '../services/theme';
import { ThemeContext } from './ThemeContext';

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(readTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const changeTheme = useCallback((id) => {
    setTheme(id);
    writeTheme(id);
  }, []);

  const value = useMemo(() => ({ theme, changeTheme }), [theme, changeTheme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export default ThemeProvider;
