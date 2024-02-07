import React from 'react';

import { ThemeContext } from './ThemeProvider';

export function useTheme() {
  return React.useContext(ThemeContext);
}
