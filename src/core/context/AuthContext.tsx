import React, { createContext, useContext, useReducer, useEffect } from "react";
import {
  login as loginService,
  register as registerService,
  getMe,
} from "../../services/api/auth.service";
import type { LoginResponse, RegisterData } from "../../services/api/auth.service";
import { getToken, setToken, removeToken } from "../../utils/storage";

type User = LoginResponse["user"];

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
}

type AuthAction =
  | { type: "LOGIN_START" }
  | { type: "LOGIN_SUCCESS"; payload: User }
  | { type: "LOGIN_FAILURE"; payload: string }
  | { type: "LOGOUT" }
  | { type: "SET_USER"; payload: User };

const initialState: AuthState = {
  user: null,
  isLoading: false,
  isAuthenticated: false,
  error: null,
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN_START":
      return { ...state, isLoading: true, error: null };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload,
      };
    case "LOGIN_FAILURE":
      return { ...state, isLoading: false, error: action.payload };
    case "LOGOUT":
      return { ...state, isAuthenticated: false, user: null };
    case "SET_USER":
      return { ...state, isAuthenticated: true, user: action.payload };
    default:
      return state;
  }
};

const AuthContext = createContext<{
  state: AuthState;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
} | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const initAuth = async () => {
      const token = getToken();
      if (token) {
        try {
          const user = await getMe();
          dispatch({ type: "SET_USER", payload: user });
        } catch {
          removeToken();
        }
      }
    };
    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    dispatch({ type: "LOGIN_START" });
    try {
      const { token, user } = await loginService(email, password);
      setToken(token);
      dispatch({ type: "LOGIN_SUCCESS", payload: user });
    } catch (error: any) {
      const message = error.response?.data?.message || "Erreur de connexion";
      dispatch({
        type: "LOGIN_FAILURE",
        payload: message,
      });
      throw error;
    }
  };

  const logout = () => {
    removeToken();
    dispatch({ type: "LOGOUT" });
  };

  // Dans AuthContext.tsx, ajoute cette fonction
  const register = async (data: RegisterData) => {
    dispatch({ type: "LOGIN_START" });
    try {
      const { token, user } = await registerService(data);
      setToken(token);
      dispatch({ type: "LOGIN_SUCCESS", payload: user });
    } catch (error: any) {
      dispatch({
        type: "LOGIN_FAILURE",
        payload: error.response?.data?.message || "Erreur d'inscription",
      });
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ state, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
