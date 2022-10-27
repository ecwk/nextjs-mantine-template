import {
  Button,
  Container,
  createStyles,
  Group,
  Stack,
  Tabs,
  Text
} from '@mantine/core';
import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useSession } from 'modules/auth';
import { UserCard, useUsers } from 'modules/users';
import { ExampleForm, exampleSchema } from 'modules/example';

const useStyles = createStyles((theme) => {
  return {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: '2rem',
      paddingBottom: '2rem',
      minHeight: 'calc(100vh - 80px)'
    },
    usersContainer: {
      background: '#141517',
      borderRadius: theme.radius.md,
      maxHeight: '400px',
      overflowY: 'auto',
      '& > div': {
        height: 'max-content'
      },
      '&::-webkit-scrollbar': {
        display: 'none'
      }
    },
    userCard: {
      height: 'max-content'
    }
  };
});

const Examples: NextPage = () => {
  const { classes } = useStyles();

  const router = useRouter();
  const { isFetching, data: usersData, refetch } = useUsers();
  const exampleFormMethods = useForm({ resolver: yupResolver(exampleSchema) });

  const { login, logout, session } = useSession();

  return (
    <>
      <NextSeo title="Examples" />
      <Container className={classes.container}>
        <Tabs
          variant="outline"
          defaultValue="form"
          value={router.query.tab as string}
          color="orange"
          style={{
            maxWidth: '500px',
            width: '100%'
          }}
          onTabChange={(value) => router.push(`/examples?tab=${value}`)}
        >
          <Tabs.List>
            <Tabs.Tab value="form">Form</Tabs.Tab>
            <Tabs.Tab value="auth">Auth</Tabs.Tab>
            <Tabs.Tab value="query">Query</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="form" pt="2rem">
            <ExampleForm methods={exampleFormMethods as any} />
          </Tabs.Panel>

          <Tabs.Panel value="auth" pt="2rem">
            <UserCard user={session.data.user} />
            <Group>
              <Button
                mt="lg"
                style={{
                  flexGrow: 1
                }}
                color="orange"
                onClick={() => login('test@internal.com', 'test')}
              >
                Login
              </Button>
              <Button
                mt="lg"
                style={{
                  flexGrow: 1
                }}
                color="orange"
                onClick={() => login('root@internal.com', 'root')}
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
              disabled={session.status !== 'authenticated'}
            >
              Logout
            </Button>
          </Tabs.Panel>

          <Tabs.Panel value="query" pt="2rem">
            <section className={classes.usersContainer}>
              <Stack>
                {isFetching ? (
                  <Text align="center" color="dimmed" py="lg">
                    Loading...
                  </Text>
                ) : usersData ? (
                  usersData.data.users.map((user, i) => (
                    <UserCard
                      user={user}
                      key={`user-${i}`}
                      className={classes.userCard}
                    />
                  ))
                ) : (
                  <Text align="center" color="dimmed" py="lg">
                    No users have been fetched...
                  </Text>
                )}
              </Stack>
            </section>
            <Button color="orange" mt="lg" fullWidth onClick={() => refetch()}>
              Fetch
            </Button>
            <Text size="sm" color="dimmed" align="end" mt="sm">
              Found {usersData?.data.users.length || 0} users
            </Text>
          </Tabs.Panel>
        </Tabs>
      </Container>
    </>
  );
};

export default Examples;
