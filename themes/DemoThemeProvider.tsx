import { FC } from 'react';
import { ThemeProvider } from 'styled-components';

const DemoThemeProvider: FC = ({ children }) => (
  <ThemeProvider
    theme={theme => {
      // black theme
      theme.color = theme.colors.smokyWhite;
      theme.backgroundColor = theme.colors.smokyBlack;

      return theme;
    }}
  >
    <>{children}</>
  </ThemeProvider>
);

export default DemoThemeProvider;
