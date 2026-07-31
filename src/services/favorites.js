const STORAGE_PREFIX = 'learn-lingo:favorites';

function storageKey(uid) {
  return `${STORAGE_PREFIX}:${uid}`;
}

export function readFavorites(uid) {
  if (!uid) {
    return [];
  }

  try {
    const stored = JSON.parse(localStorage.getItem(storageKey(uid)));

    return Array.isArray(stored)
      ? stored.filter((id) => typeof id === 'string')
      : [];
  } catch {
    return [];
  }
}

export function writeFavorites(uid, ids) {
  if (!uid) {
    return;
  }

  try {
    localStorage.setItem(storageKey(uid), JSON.stringify(ids));
  } catch {
    // Keep the current in-memory favorites when persistence is unavailable.
  }
}
