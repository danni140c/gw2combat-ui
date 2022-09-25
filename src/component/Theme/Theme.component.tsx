import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { DefaultTheme } from '@mui/system';
import CssBaseline from '@mui/material/CssBaseline';

type Props<Theme = DefaultTheme> = {
  children?: React.ReactNode;
  theme: Partial<Theme> | ((outerTheme: Theme) => Theme);
};

export const Theme: React.FC<Props> = (props: Props) => {
  const { children, theme } = props;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default Theme;
