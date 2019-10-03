import App from 'next/app';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { appWithTranslation } from '@/i18n';

import GlobalStateProvider from '@/contexts/GlobalStateProvider';
import theme from '@/themes/theme';

class MyApp extends App {
  static async getInitialProps({ Component, ctx }: any) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <GlobalStateProvider>
          <Component {...pageProps} />
        </GlobalStateProvider>
      </ThemeProvider>
    );
  }
}

export default appWithTranslation(MyApp);
