import Head from 'next/head';
import styled from 'styled-components';

import GlobalStyles from '@/themes/GlobalStyles';
import DarkThemeProvider from '@/themes/DarkThemeProvider';
import LightThemeProvider from '@/themes/LightThemeProvider';
import NormalizeStyles from '@/themes/NormalizeStyles';
import { SITE_TITLE } from '@/constants';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Main = styled.main`
  width: 100vw;
  padding: 0;
`;

type TProps = {
  mode?: 'light' | 'dark';
  title?: string;
  children: React.ReactNode;
  footer?: boolean;
};

const HomeLayout: React.FunctionComponent<TProps> = ({
  mode = 'light',
  children,
  title = SITE_TITLE,
  footer = true,
}) => {
  const ThemeProvider =
    mode === 'light' ? LightThemeProvider : DarkThemeProvider;
  return (
    <ThemeProvider>
      <Main>
        <Head>
          <title>{title}</title>
        </Head>
        <Header mode={mode} />
        {children}
        {footer && <Footer mode={mode} />}
        <NormalizeStyles />
        <GlobalStyles />
      </Main>
    </ThemeProvider>
  );
};

export default HomeLayout;
