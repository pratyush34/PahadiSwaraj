<<<<<<< HEAD
const TOKEN_KEY = 'pahadiSwarajToken';
=======
const TOKEN_KEY = 'pahadiAuthToken';
>>>>>>> 6a3d0ab (Added backend auth files: User.js, auth.js, verifyToken.js, passport.js)

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token) {
  return localStorage.setItem(TOKEN_KEY, token);
}

<<<<<<< HEAD
export function removeToken() {
=======
export function clearToken() {
>>>>>>> 6a3d0ab (Added backend auth files: User.js, auth.js, verifyToken.js, passport.js)
  return localStorage.removeItem(TOKEN_KEY);
}

export function isAuthenticated() {
  return Boolean(getToken());
}
<<<<<<< HEAD
=======

export function getAuthHeaders() {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
>>>>>>> 6a3d0ab (Added backend auth files: User.js, auth.js, verifyToken.js, passport.js)
