export const EMPTY_FILTERS = { language: '', level: '', price: '' };

export function buildFilterOptions(teachers) {
  const languages = new Set();
  const levels = new Set();
  const prices = new Set();

  for (const teacher of teachers) {
    (teacher.languages ?? []).forEach((language) => languages.add(language));
    (teacher.levels ?? []).forEach((level) => levels.add(level));

    if (teacher.price_per_hour != null) {
      prices.add(teacher.price_per_hour);
    }
  }

  return {
    languages: [...languages].sort(),
    levels: [...levels].sort(),
    prices: [...prices].sort((first, second) => first - second),
  };
}

export function filterTeachers(teachers, { language, level, price }) {
  return teachers.filter(
    (teacher) =>
      (!language || (teacher.languages ?? []).includes(language)) &&
      (!level || (teacher.levels ?? []).includes(level)) &&
      (!price || teacher.price_per_hour === Number(price))
  );
}
