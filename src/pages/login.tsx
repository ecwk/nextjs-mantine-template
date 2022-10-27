import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { useMutation } from '@tanstack/react-query';
import { Button, Container, createStyles, Group, Title } from '@mantine/core';

import { useSession } from 'modules/auth';
import { NextPageWithLayout } from 'shared/types';

const useStyles = createStyles((theme) => {
  return {
    container: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      paddingTop: '4rem',
      paddingBottom: '10rem',
      minHeight: 'calc(100vh - 80px)',
      textAlign: 'center'
    }
  };
});

const Login: NextPageWithLayout = () => {
  const { login, logout } = useSession();
  const router = useRouter();
  const { classes } = useStyles();

  const mutation = useMutation(
    ({ email, password }: { email: string; password: string }) => {
      return login(email, password);
    },
    {
      onSuccess: () => {
        const redirectUrl = router.query['redirect-url'] as string;
        router.push(redirectUrl || '/');
      }
    }
  );

  const handleLogin = async () => {
    mutation.mutate({ email: 'test@internal.com', password: 'test' });
  };

  const handleAdminLogin = async () => {
    mutation.mutate({ email: 'root@internal.com', password: 'root' });
  };

  return (
    <>
      <NextSeo title="Login" />
      <Container className={classes.container} size="xs">
        <Title>Login Demo</Title>
        <Group>
          <Button
            mt="lg"
            style={{
              flexGrow: 1
            }}
            color="orange"
            onClick={handleLogin}
          >
            Login
          </Button>
          <Button
            mt="lg"
            style={{
              flexGrow: 1
            }}
            color="orange"
            onClick={handleAdminLogin}
          >
            Login as Admin
          </Button>
        </Group>
        <Button
          mt="sm"
          variant="outline"
          color="gray"
          onClick={() => logout()}
          fullWidth
        >
          Logout
        </Button>
      </Container>
    </>
  );
};

export default Login;
