import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeState {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  resolvedTheme: 'light' | 'dark';
  applyTheme: () => void;
}

function getSystemTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      mode: 'system',
      resolvedTheme: getSystemTheme(),
      setMode: (mode) => {
        set({ mode });
        get().applyTheme();
      },
      applyTheme: () => {
        const mode = get().mode;
        const resolved = mode === 'system' ? getSystemTheme() : mode;
        set({ resolvedTheme: resolved });
        if (typeof document !== 'undefined') {
          document.documentElement.classList.toggle('dark', resolved === 'dark');
        }
      },
    }),
    {
      name: 'resume-builder-theme',
      onRehydrateStorage: () => (state) => {
        state?.applyTheme();
      },
    }
  )
);
