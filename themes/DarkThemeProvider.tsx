import { FC } from 'react';
import { ThemeProvider } from 'styled-components';

const DarkThemeProvider: FC = ({ children }) => (
  <ThemeProvider
    theme={theme => {
      // black theme
      theme.color = theme.colors.white;
      theme.backgroundColor = theme.colors.black;

      return theme;
    }}
  >
    <>{children}</>
  </ThemeProvider>
);

export default DarkThemeProvider;
