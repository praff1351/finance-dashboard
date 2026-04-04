import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState {
  name: string;
  email: string;
  avatarUrl: string;
  role: string;
}

interface UserActions {
  updateUser: (data: Partial<UserState>) => void;
  resetUser: () => void;
}

type UserStore = UserState & UserActions;

const DEFAULT_USER: UserState = {
  name: 'Praful Liddho',
  email: 'praful@liddho.com',
  role: 'admin',
  avatarUrl: 'https://github.com/shadcn.png',
};

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      ...DEFAULT_USER,
      name: DEFAULT_USER.name,
      email: DEFAULT_USER.email,
      updateUser: (data) => set((state) => ({ ...state, ...data })),
      resetUser: () => set(DEFAULT_USER),
    }),
    {
      name: 'user-storage',
    }
  )
);
