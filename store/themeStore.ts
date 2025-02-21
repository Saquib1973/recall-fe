import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ThemeType {
  theme: 'light' | 'dark'
  setTheme: () => void
}

const useStore = create<ThemeType,[['zustand/persist', unknown]]>(
  persist(
    (set, get) => ({
      theme: 'dark',
      setTheme: () =>
        set((state) => ({
          ...state,
          theme: get().theme === 'dark' ? 'light' : 'dark',
        })),
    }),
    {
      name: 'theme',
    }
  )
)

export const useTheme = () => useStore((state) => state.theme)
export const useSetTheme = () => useStore((state) => state.setTheme)
