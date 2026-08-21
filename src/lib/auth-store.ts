import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  isAuthenticated: boolean;
  user: {
    name: string;
    email: string;
    role: string;
  } | null;
  login: (email: string, pass: string) => boolean;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,

      login: (email: string, pass: string) => {
        // Default Admin login credentials or custom check
        // User can log in with admin@paypos.com.tr / admin123 or any credentials
        if ((email === 'admin@paypos.com.tr' || email === 'admin') && (pass === 'admin123' || pass === 'paypos2026')) {
          set({
            isAuthenticated: true,
            user: {
              name: 'PAYPOS Sistem Yöneticisi',
              email: email.includes('@') ? email : 'admin@paypos.com.tr',
              role: 'Super Admin',
            },
          });
          return true;
        }

        // Allow instant login for demo/testing with any non-empty input
        if (email.trim().length > 0 && pass.trim().length > 0) {
          set({
            isAuthenticated: true,
            user: {
              name: email.split('@')[0].toUpperCase(),
              email,
              role: 'Yönetici',
            },
          });
          return true;
        }

        return false;
      },

      logout: () => {
        set({ isAuthenticated: false, user: null });
      },
    }),
    {
      name: 'paypos-admin-auth',
    }
  )
);
