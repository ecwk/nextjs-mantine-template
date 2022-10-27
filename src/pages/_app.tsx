import {
  ColorSchemeProvider,
  MantineProvider,
  ColorScheme
} from '@mantine/core';
import { useState } from 'react';
import { DefaultSeo } from 'next-seo';
import { getCookie, setCookie } from 'cookies-next';
import NextApp, { AppProps, AppContext } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import 'shared/styles/globals.css';
import { theme } from 'shared/styles/theme';
import { NextPageWithLayout } from 'shared/types';
import { Layout } from 'shared/components/layout';
import { SEOConfig, appRoutes } from 'shared/config';
import { getSessionSSR, SessionProvider, Session } from 'modules/auth';

const { colorScheme: DEFAULT_COLOR_SCHEME, ...rest } = theme;

const queryClient = new QueryClient();

type GetInitialPropsReturn = {
  colorScheme: ColorScheme;
  session: Session;
};

type AppPropsWithLayout = AppProps &
  GetInitialPropsReturn & {
    Component: NextPageWithLayout;
  };

function App(props: AppPropsWithLayout) {
  const [colorScheme, setColorScheme] = useState<ColorScheme>(
    props.colorScheme
  );

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme =
      value || (colorScheme === 'dark' ? 'light' : 'dark');
    setColorScheme(nextColorScheme);
    setCookie('colorScheme', nextColorScheme, { maxAge: 60 * 60 * 24 * 365 });
  };

  const { Component, pageProps } = props;

  const getLayout =
    Component.getLayout ??
    ((page) => (
      <Layout
        navbar={{
          links: Object.values(appRoutes)
        }}
      >
        {page}
      </Layout>
    ));

  return (
    <SessionProvider session={props.session}>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          withNormalizeCSS
          withGlobalStyles
          theme={{
            colorScheme,
            ...rest
          }}
        >
          <QueryClientProvider client={queryClient}>
            <DefaultSeo {...SEOConfig} />
            {getLayout(<Component {...pageProps} />)}
          </QueryClientProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </SessionProvider>
  );
}

App.getInitialProps = async (
  appContext: AppContext
): Promise<GetInitialPropsReturn> => {
  const { ctx } = appContext;
  const appInitialProps = await NextApp.getInitialProps(appContext);
  const colorScheme = getCookie('colorScheme', ctx) || DEFAULT_COLOR_SCHEME;
  const session = await getSessionSSR(ctx);

  return {
    colorScheme: colorScheme as ColorScheme,
    session,
    ...appInitialProps
  };
};

export default App;
