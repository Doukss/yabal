import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { login as loginService, register as registerService, getMe } from '../../services/api/auth.service';
import type { RegisterData, User } from '../../services/api/auth.service';
import { 
  setToken, 
  removeToken, 
  setUser, 
  getUser, 
  getToken, 
  isAuthenticated
} from '../../utils/storage';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
}

type AuthAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGIN_FAILURE'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'SET_USER'; payload: User };

const initialState: AuthState = {
  user: getUser(), // Charger depuis localStorage au démarrage
  isLoading: false,
  isAuthenticated: isAuthenticated(),
  error: null,
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, isLoading: true, error: null };
    case 'LOGIN_SUCCESS':
      return { 
        ...state, 
        isLoading: false, 
        isAuthenticated: true, 
        user: action.payload 
      };
    case 'LOGIN_FAILURE':
      return { ...state, isLoading: false, error: action.payload };
    case 'LOGOUT':
      return { 
        ...state, 
        isAuthenticated: false, 
        user: null,
        error: null 
      };
    case 'SET_USER':
      return { ...state, isAuthenticated: true, user: action.payload };
    default:
      return state;
  }
};

interface AuthContextType {
  state: AuthState;
  login: (email: string, password: string) => Promise<User>;
  register: (data: RegisterData) => Promise<User>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Vérifier et restaurer la session au chargement
  useEffect(() => {
    const initAuth = async () => {
      const token = getToken();
      const savedUser = getUser();
      
      if (token && savedUser && !state.user) {
        if (token.startsWith('local-')) {
          dispatch({ type: 'SET_USER', payload: savedUser });
          return;
        }

        try {
          // Optionnel: vérifier que le token est encore valide
          const user = await getMe();
          dispatch({ type: 'SET_USER', payload: user });
          setUser(user);
        } catch (error) {
          // Token invalide, on déconnecte
          removeToken();
          dispatch({ type: 'LOGOUT' });
        }
      }
    };
    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    dispatch({ type: 'LOGIN_START' });
    try {
      const { token, user } = await loginService(email, password);
      
      // Stocker dans localStorage
      setToken(token);
      setUser(user);
      
      dispatch({ type: 'LOGIN_SUCCESS', payload: user });
      return user;
    } catch (error: any) {
      dispatch({ 
        type: 'LOGIN_FAILURE', 
        payload: error.response?.data?.message || error.message || 'Erreur de connexion' 
      });
      throw error;
    }
  };

  const register = async (data: RegisterData) => {
    dispatch({ type: 'LOGIN_START' });
    try {
      const { token, user } = await registerService(data);
      
      // Stocker dans localStorage
      setToken(token);
      setUser(user);
      
      dispatch({ type: 'LOGIN_SUCCESS', payload: user });
      return user;
    } catch (error: any) {
      dispatch({ 
        type: 'LOGIN_FAILURE', 
        payload: error.response?.data?.message || error.message || "Erreur d'inscription" 
      });
      throw error;
    }
  };

  const logout = () => {
    removeToken();
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider value={{ state, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
