import { redirect } from 'react-router-dom';

export function getAuthToken() {
  return localStorage.getItem('token');
}

export function setAuthToken(token) {
  return getAuthToken();
}

export function checkAuthLoader() {
  const token = getAuthToken();
  if (!token) {
    throw redirect('/auth');
  }
  return null;
}