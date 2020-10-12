import App from 'next/app';
import React from 'react';
import { ThemeProvider } from 'styled-components';

import DemoStateProvider from '@/contexts/DemoStateProvider';
import GlobalStateProvider from '@/contexts/GlobalStateProvider';
import { appWithTranslation } from '@/i18n';
import theme from '@/themes/theme';

class MyApp extends App {
  static async getInitialProps({ Component, ctx }: any) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps, isStartJarvis: ctx.pathname.includes('/demo') };
  }

  render() {
    // @ts-ignore
    const { Component, pageProps, isStartJarvis } = this.props;

    return (
      <ThemeProvider theme={theme}>
        <GlobalStateProvider>
          {isStartJarvis ? (
            <DemoStateProvider>
              <Component {...pageProps} />
            </DemoStateProvider>
          ) : (
            <Component {...pageProps} />
          )}
        </GlobalStateProvider>
      </ThemeProvider>
    );
  }
}

export default appWithTranslation(MyApp);
