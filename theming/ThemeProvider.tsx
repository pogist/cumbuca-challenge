import React from 'react';

import { ThemeContext } from './ThemeContext';
import { Theme } from './types';

type Props = {
  value: Theme;
  children: React.ReactNode;
};

export function ThemeProvider({ value, children }: Props) {
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
