export function getAuthToken() {
  return localStorage.getItem('token');
}

export function setAuthToken(token) {
  return getAuthToken();
}