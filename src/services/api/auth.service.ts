import axiosInstance from './axiosInstance';

export interface RegisterData {
  nom: string;
  email: string;
  phone: string;
  password: string;
  role: 'CHARGEUR' | 'LIVREUR';
}

export interface LoginResponse {
  token: string;
  user: {
    id: number;
    uuid: string;
    email: string;
    phone: string;
    nom: string;
    role: string;
    credits: number;
    rating: number;
  };
}

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  const response = await axiosInstance.post('/api/auth/login', { email, password });
  return response.data.data;
};

export const register = async (data: RegisterData): Promise<LoginResponse> => {
  const response = await axiosInstance.post('/api/auth/register', data);
  return response.data.data;
};

export const getMe = async () => {
  const response = await axiosInstance.get('/api/auth/me');
  return response.data.data;
};