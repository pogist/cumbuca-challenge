import React from 'react';

import { lightTheme } from './light';
import { Theme } from './types';

export const ThemeContext = React.createContext<Theme>(lightTheme);
ThemeContext.displayName = 'ThemeContext';
