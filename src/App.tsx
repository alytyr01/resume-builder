import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { HomePage } from '@/pages/HomePage';
import { BuilderPage } from '@/pages/BuilderPage';
import { useThemeStore } from '@/store/themeStore';

function ThemeInitializer({ children }: { children: React.ReactNode }) {
  const applyTheme = useThemeStore((s) => s.applyTheme);
  useEffect(() => { applyTheme(); }, [applyTheme]);
  return <>{children}</>;
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeInitializer>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/builder" element={<BuilderPage />} />
        </Routes>
      </ThemeInitializer>
    </BrowserRouter>
  );
}