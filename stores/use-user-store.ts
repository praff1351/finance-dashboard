import { create } from "zustand"
import { persist } from "zustand/middleware"

interface UserState {
  name: string
  email: string
  avatarUrl: string | null
  role: string
}

interface UserActions {
  updateUser: (data: Partial<UserState>) => void
  resetUser: () => void
}

type UserStore = UserState & UserActions

const DEFAULT_USER: UserState = {
  name: "Praful Lidhoo",
  email: "praful@lidhoo.com",
  role: "admin",
  avatarUrl: null,
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      ...DEFAULT_USER,
      updateUser: (data) => set((state) => ({ ...state, ...data })),
      resetUser: () => set(DEFAULT_USER),
    }),
    {
      name: "user-storage",
      skipHydration: false,
    }
  )
)
