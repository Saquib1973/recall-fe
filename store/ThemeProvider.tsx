// components/ThemeProvider.tsx
'use client';

import { useEffect, useState } from 'react';
import { useTheme } from '@/store/themeStore';

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = useTheme();
  const [currTheme, setCurrTheme] = useState<string | null>(null)
  useEffect(() => {
    // Apply the theme to the HTML element
    setCurrTheme(theme)
    document.documentElement.setAttribute('data-mode', theme);
    document.documentElement.className = theme;
  }, [theme]);

  return <>{children}</>;
}