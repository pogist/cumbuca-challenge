import React from 'react';

import lightTheme from './light';
import { Theme } from './types';

export const ThemeContext = React.createContext<Theme>(lightTheme);

interface Props {
  theme: Theme;
}

export function ThemeProvider({
  theme,
  children,
}: React.PropsWithChildren<Props>) {
  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
}
