// Clés pour localStorage
const STORAGE_KEYS = {
  TOKEN: 'loxo_token',
  USER: 'loxo_user',
  ROLE: 'loxo_role',
};

// Stocker le token
export const setToken = (token: string): void => {
  localStorage.setItem(STORAGE_KEYS.TOKEN, token);
};

// Récupérer le token
export const getToken = (): string | null => {
  return localStorage.getItem(STORAGE_KEYS.TOKEN);
};

// Supprimer le token
export const removeToken = (): void => {
  localStorage.removeItem(STORAGE_KEYS.TOKEN);
  localStorage.removeItem(STORAGE_KEYS.USER);
  localStorage.removeItem(STORAGE_KEYS.ROLE);
};

// Stocker l'utilisateur complet
export const setUser = (user: any): void => {
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  localStorage.setItem(STORAGE_KEYS.ROLE, user.role);
};

// Récupérer l'utilisateur
export const getUser = (): any | null => {
  const user = localStorage.getItem(STORAGE_KEYS.USER);
  return user ? JSON.parse(user) : null;
};

// Récupérer le rôle
export const getRole = (): string | null => {
  return localStorage.getItem(STORAGE_KEYS.ROLE);
};

// Vérifier si l'utilisateur est connecté
export const isAuthenticated = (): boolean => {
  return getToken() !== null;
};