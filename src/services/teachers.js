import { get, ref } from 'firebase/database';
import { database } from './firebase';

const TEACHERS_PATH = 'teachers';

function normalizeTeacher(snapshot) {
  return { id: snapshot.key, ...snapshot.val() };
}

export async function getTeachers() {
  let snapshot;

  try {
    snapshot = await get(ref(database, TEACHERS_PATH));
  } catch (error) {
    throw new Error('Failed to load teachers. Please try again later.', {
      cause: error,
    });
  }

  const teachers = [];

  snapshot.forEach((child) => {
    teachers.push(normalizeTeacher(child));
  });

  return teachers;
}
