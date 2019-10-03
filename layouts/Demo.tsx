import Head from 'next/head';
import styled from 'styled-components';

import Jarvis from '@/components/demo/Jarvis';
import GlobalStyles from '@/themes/GlobalStyles';
import DemoThemeProvider from '@/themes/DemoThemeProvider';
import NormalizeStyles from '@/themes/NormalizeStyles';
import { SITE_TITLE } from '@/constants';

const Main = styled.main`
  width: 100vw;
  height: 100vh;
  padding: 0;
  overflow: hidden;
`;

type TProps = {
  title?: string;
  children: React.ReactNode;
};

const DemoLayout: React.FunctionComponent<TProps> = ({
  children,
  title = SITE_TITLE,
}) => {
  return (
    <DemoThemeProvider>
      <Main>
        <Head>
          <title>{title}</title>
        </Head>
        <Jarvis size={20} />
        {children}
        <NormalizeStyles />
        <GlobalStyles />
      </Main>
    </DemoThemeProvider>
  );
};

export default DemoLayout;
