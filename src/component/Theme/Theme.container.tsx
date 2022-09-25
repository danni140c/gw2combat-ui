import { createTheme } from '@mui/material';
import React from 'react';
import Theme from './Theme.component';

type Props = {
  children?: React.ReactNode;
};

export const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
});

export const ThemeContainer: React.FC<Props> = (props: Props) => {
  const { children } = props;

  const [mode, setMode] = React.useState<boolean>(true);
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => setMode((prevMode) => !prevMode),
    }),
    []
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: mode ? 'dark' : 'light',
        },
      }),
    [mode]
  );

  const containerProps = {
    theme,
  };

  return (
    <ColorModeContext.Provider value={colorMode}>
      <Theme {...containerProps}>{children}</Theme>
    </ColorModeContext.Provider>
  );
};

export default ThemeContainer;
