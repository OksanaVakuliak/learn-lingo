import { useCallback, useMemo, useState } from 'react';
import { readFavorites, writeFavorites } from '../services/favorites';
import useAuth from '../hooks/useAuth';
import { FavoritesContext } from './FavoritesContext';

function FavoritesProvider({ children }) {
  const { user } = useAuth();
  const uid = user?.uid ?? null;
  const [favorites, setFavorites] = useState(() => readFavorites(uid));
  const [loadedUid, setLoadedUid] = useState(uid);

  if (loadedUid !== uid) {
    setLoadedUid(uid);
    setFavorites(readFavorites(uid));
  }

  const toggleFavorite = useCallback(
    (id) => {
      if (!uid) {
        return;
      }

      const next = favorites.includes(id)
        ? favorites.filter((favoriteId) => favoriteId !== id)
        : [...favorites, id];

      setFavorites(next);
      writeFavorites(uid, next);
    },
    [uid, favorites]
  );

  const value = useMemo(
    () => ({
      favorites,
      isFavorite: (id) => favorites.includes(id),
      toggleFavorite,
    }),
    [favorites, toggleFavorite]
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export default FavoritesProvider;
