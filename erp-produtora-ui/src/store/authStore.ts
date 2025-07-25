import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '../services/api';

interface User {
  id: number;
  nome: string;
  email: string;
  perfil: 'Admin' | 'Financeiro' | 'Produtor' | 'Artista';
}

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, senha: string) => Promise<boolean>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      login: async (email, senha) => {
        try {
          const response = await api.post('/auth/login', { email, senha });
          const { token, usuario } = response.data;
          set({ token, user: usuario, isAuthenticated: true });
          localStorage.setItem('erp_token', token);
          return true;
        } catch (error) {
          console.error("Falha no login:", error);
          set({ isAuthenticated: false });
          return false;
        }
      },
      logout: () => {
        set({ token: null, user: null, isAuthenticated: false });
        localStorage.removeItem('erp_token');
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);