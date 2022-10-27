import { NextSeo } from 'next-seo';
import { GetServerSideProps, NextPage } from 'next';
import { Code, Container, createStyles, Text, Title } from '@mantine/core';

import { env } from 'shared/config';
import { getSessionSSR } from 'modules/auth';
import { APP_ROUTES } from 'shared/constants';

const useStyles = createStyles((theme) => {
  return {
    container: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: '4rem',
      minHeight: 'calc(100vh - 80px)',
      textAlign: 'center'
    }
  };
});

const Admin: NextPage = () => {
  const { classes } = useStyles();

  return (
    <>
      <NextSeo title="Admin" />
      <Container className={classes.container} size="sm" pb="4rem">
        <Title order={1} size="2.5rem" align="center">
          Admin Route
        </Title>
        <Code my="xs">/shared/config/app-routes.config.ts</Code>
        <Text color="dimmed" sx={{ maxWidth: '60ch' }}>
          This page will only be accessible and displayed on the navbar to
          authenticated admins.
        </Text>
      </Container>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const redirectUrl = encodeURIComponent(env.APP_URL + APP_ROUTES.ADMIN);
  const session = await getSessionSSR(ctx);

  if (session.status === 'unauthenticated') {
    return {
      redirect: {
        destination: `${APP_ROUTES.LOGIN}?redirect-url=${redirectUrl}`,
        permanent: false
      }
    };
  } else if (session.data.user?.role !== 'admin') {
    return {
      redirect: {
        destination: `${APP_ROUTES.UNAUTHORISED}`,
        permanent: false
      }
    };
  }
  return {
    props: {}
  };
};

export default Admin;
