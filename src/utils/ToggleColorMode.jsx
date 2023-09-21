import React, { useState, createContext, useMemo } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

export const ColorModeContext = createContext();

const ToggleColorMode = ({ children }) => {
  const [mode, setMode] = useState('light');

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const theme = useMemo(
    () => createTheme({
      palette: {
        mode,
      },
    }),
    [mode],
  );

  const contextValue = useMemo(() => ({
    mode,
    setMode,
    toggleColorMode,
  }), [mode, setMode, toggleColorMode]);
  return (
    <ColorModeContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default ToggleColorMode;
