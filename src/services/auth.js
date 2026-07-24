import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { auth } from './firebase';
import { getAuthErrorMessage } from '../utils/authErrors';

function normalizeUser(user) {
  if (!user) {
    return null;
  }

  return {
    uid: user.uid,
    name: user.displayName ?? '',
    email: user.email ?? '',
  };
}

function toAuthError(error) {
  return new Error(getAuthErrorMessage(error), { cause: error });
}

export async function register({ name, email, password }) {
  try {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(user, { displayName: name });

    return normalizeUser(user);
  } catch (error) {
    throw toAuthError(error);
  }
}

export async function login({ email, password }) {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);

    return normalizeUser(user);
  } catch (error) {
    throw toAuthError(error);
  }
}

export async function logout() {
  try {
    await signOut(auth);
  } catch (error) {
    throw toAuthError(error);
  }
}

export function subscribeToAuthChanges(callback) {
  return onAuthStateChanged(auth, (user) => callback(normalizeUser(user)));
}
