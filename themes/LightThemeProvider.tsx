import { FC } from 'react';
import { ThemeProvider } from 'styled-components';

const LightThemeProvider: FC = ({ children }) => (
  <ThemeProvider
    theme={theme => {
      // light theme
      theme.color = theme.colors.lightBlack;
      theme.backgroundColor = theme.colors.white;

      return theme;
    }}
  >
    <>{children}</>
  </ThemeProvider>
);

export default LightThemeProvider;
