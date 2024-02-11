import React from 'react';

import { ThemeContext } from './ThemeContext';

export function useTheme() {
  return React.useContext(ThemeContext);
}
