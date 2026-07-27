import {
  get,
  limitToFirst,
  orderByKey,
  query,
  ref,
  startAt,
} from 'firebase/database';
import { database } from './firebase';

const TEACHERS_PATH = 'teachers';

export const TEACHERS_PAGE_SIZE = 4;

function normalizeTeacher(snapshot) {
  return { ...snapshot.val(), id: snapshot.key };
}

function collectTeachers(snapshot) {
  const teachers = [];

  snapshot.forEach((child) => {
    teachers.push(normalizeTeacher(child));
  });

  return teachers;
}

function toLoadError(error) {
  return new Error('Failed to load teachers. Please try again later.', {
    cause: error,
  });
}

export async function getTeachers() {
  let snapshot;

  try {
    snapshot = await get(ref(database, TEACHERS_PATH));
  } catch (error) {
    throw toLoadError(error);
  }

  return collectTeachers(snapshot);
}

export async function getTeachersPage(startKey) {
  const constraints = [orderByKey(), limitToFirst(TEACHERS_PAGE_SIZE + 1)];

  if (startKey) {
    constraints.push(startAt(startKey));
  }

  let snapshot;

  try {
    snapshot = await get(query(ref(database, TEACHERS_PATH), ...constraints));
  } catch (error) {
    throw toLoadError(error);
  }

  const teachers = collectTeachers(snapshot);
  const hasMore = teachers.length > TEACHERS_PAGE_SIZE;

  return {
    teachers: hasMore ? teachers.slice(0, TEACHERS_PAGE_SIZE) : teachers,
    nextKey: hasMore ? teachers[TEACHERS_PAGE_SIZE].id : null,
  };
}
