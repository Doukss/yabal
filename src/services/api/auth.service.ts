import axiosInstance from './axiosInstance';

export type UserRole = 'CHARGEUR' | 'LIVREUR' | 'ADMIN';

export interface User {
  id: number;
  uuid: string;
  email: string;
  phone: string;
  nom: string;
  role: UserRole;
  credits: number;
  rating: number;
}

export interface RegisterData {
  nom: string;
  email: string;
  phone: string;
  password: string;
  role: Extract<UserRole, 'CHARGEUR' | 'LIVREUR'>;
}

export interface LoginResponse {
  token: string;
  user: User;
}

interface LocalAccount extends RegisterData {
  id: number;
  uuid: string;
  credits: number;
  rating: number;
}

const LOCAL_ACCOUNTS_KEY = 'yabal_local_accounts';

const isApiUnavailable = (error: unknown) => {
  const axiosError = error as {
    isAxiosError?: boolean;
    response?: { status?: number };
  };

  return Boolean(
    axiosError?.isAxiosError &&
      (!axiosError.response || (axiosError.response.status ?? 0) >= 500),
  );
};

const getLocalAccounts = (): LocalAccount[] => {
  const rawAccounts = localStorage.getItem(LOCAL_ACCOUNTS_KEY);
  if (!rawAccounts) return [];

  try {
    return JSON.parse(rawAccounts);
  } catch {
    localStorage.removeItem(LOCAL_ACCOUNTS_KEY);
    return [];
  }
};

const saveLocalAccounts = (accounts: LocalAccount[]) => {
  localStorage.setItem(LOCAL_ACCOUNTS_KEY, JSON.stringify(accounts));
};

const toUser = (account: LocalAccount): User => ({
  id: account.id,
  uuid: account.uuid,
  email: account.email,
  phone: account.phone,
  nom: account.nom,
  role: account.role,
  credits: account.credits,
  rating: account.rating,
});

const createLocalToken = (user: User) => {
  return `local-${user.uuid}-${Date.now()}`;
};

const normalizeAuthResponse = (payload: any): LoginResponse => {
  const data = payload?.data ?? payload;
  const user = data?.user ?? data?.utilisateur;
  const token = data?.token ?? data?.accessToken ?? data?.access_token ?? data?.jwt;

  if (!token || !user) {
    throw new Error('Réponse authentification invalide');
  }

  return { token, user };
};

const localRegister = (data: RegisterData): LoginResponse => {
  const accounts = getLocalAccounts();
  const email = data.email.trim().toLowerCase();

  if (accounts.some((account) => account.email.toLowerCase() === email)) {
    throw new Error('Un compte existe déjà avec cet email');
  }

  const account: LocalAccount = {
    ...data,
    email,
    id: Date.now(),
    uuid: crypto.randomUUID(),
    credits: data.role === 'CHARGEUR' ? 5 : 0,
    rating: 0,
  };

  saveLocalAccounts([...accounts, account]);
  const user = toUser(account);

  return {
    token: createLocalToken(user),
    user,
  };
};

const localLogin = (email: string, password: string): LoginResponse => {
  const account = getLocalAccounts().find(
    (item) => item.email.toLowerCase() === email.trim().toLowerCase(),
  );

  if (!account || account.password !== password) {
    throw new Error('Email ou mot de passe incorrect');
  }

  const user = toUser(account);

  return {
    token: createLocalToken(user),
    user,
  };
};

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await axiosInstance.post('/api/auth/login', { email, password });
    return normalizeAuthResponse(response.data);
  } catch (error) {
    if (isApiUnavailable(error)) {
      return localLogin(email, password);
    }
    throw error;
  }
};

export const register = async (data: RegisterData): Promise<LoginResponse> => {
  try {
    const response = await axiosInstance.post('/api/auth/register', data);
    return normalizeAuthResponse(response.data);
  } catch (error) {
    if (isApiUnavailable(error)) {
      return localRegister(data);
    }
    throw error;
  }
};

export const getMe = async (): Promise<User> => {
  const response = await axiosInstance.get('/api/auth/me');
  return response.data.data ?? response.data.user ?? response.data;
};
