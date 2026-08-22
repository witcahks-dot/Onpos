import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useCMSStore } from './cms-store';

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
        const cleanEmail = email.trim().toLowerCase();
        const cleanPass = pass.trim();

        // 1. Dynamic Check from CMS Store Admin Users
        const cmsUsers = useCMSStore.getState().adminUsers || [];
        const foundUser = cmsUsers.find(
          (u) =>
            (u.email.toLowerCase() === cleanEmail || u.name.toLowerCase() === cleanEmail) &&
            u.status === 'Aktif' &&
            (!u.password || u.password === cleanPass)
        );

        if (foundUser) {
          set({
            isAuthenticated: true,
            user: {
              name: foundUser.name,
              email: foundUser.email,
              role: foundUser.role,
            },
          });
          return true;
        }

        // 2. Default Fallback Admin Credentials
        if (
          (cleanEmail === 'admin@paypos.com.tr' || cleanEmail === 'admin') &&
          (cleanPass === 'admin123' || cleanPass === 'paypos2026')
        ) {
          set({
            isAuthenticated: true,
            user: {
              name: 'PAYPOS Sistem Yöneticisi',
              email: 'admin@paypos.com.tr',
              role: 'Super Admin',
            },
          });
          return true;
        }

        // 3. Fallback for demo input
        if (cleanEmail.length > 0 && cleanPass.length > 0) {
          set({
            isAuthenticated: true,
            user: {
              name: cleanEmail.split('@')[0].toUpperCase(),
              email: cleanEmail.includes('@') ? cleanEmail : `${cleanEmail}@paypos.com.tr`,
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
