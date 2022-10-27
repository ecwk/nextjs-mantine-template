import {
  Code,
  Container,
  createStyles,
  Text,
  Title,
  Tooltip,
  Image,
  Group,
  Button,
  useMantineColorScheme,
  Badge
} from '@mantine/core';
import { NextPage } from 'next';
import NextLink from 'next/link';
import { NextSeo } from 'next-seo';

const useStyles = createStyles((theme) => {
  return {
    container: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: '4rem',
      minHeight: 'calc(100vh - 80px)'
    },
    badgeLinkContainer: {
      flexWrap: 'wrap',
      maxWidth: '450px',
      justifyContent: 'center',
      a: {
        cursor: 'pointer'
      }
    }
  };
});

const Home: NextPage = () => {
  const { classes } = useStyles();
  const { colorScheme } = useMantineColorScheme();

  return (
    <>
      <NextSeo title="Home" />
      <Container className={classes.container} size="sm">
        <Title order={1} size="2.5rem" align="center">
          nextjs-mantine-template
        </Title>
        <Text color="dimmed">
          Get started by editing <Code>pages/index.tsx</Code>
        </Text>

        <Text mt="4rem" color="dimmed">
          Powered by
        </Text>
        <Group mt="sm">
          <Tooltip label="NextJS" position="bottom-start">
            <Image
              src={`/nextjs-${colorScheme}-logo.svg`}
              alt="NextJS"
              width={28}
            />
          </Tooltip>
          <Tooltip label="Mantine UI" position="bottom-start">
            <Image src="/mantine-logo.svg" alt="Mantine UI" width={28} />
          </Tooltip>
          <Tooltip label="Typescript" position="bottom-start">
            <Image src="/typescript-logo.svg" alt="Typescript" width={28} />
          </Tooltip>
        </Group>

        <Group mt="lg" className={classes.badgeLinkContainer}>
          <NextLink href="https://commitlint.js.org" passHref>
            <Badge component="a">commitlint</Badge>
          </NextLink>
          <NextLink href="https://github.com/garmeeh/next-seo" passHref>
            <Badge component="a">next-seo</Badge>
          </NextLink>
          <NextLink href="https://github.com/jquense/yup" passHref>
            <Badge component="a">yup</Badge>
          </NextLink>
          <NextLink href="https://react-hook-form.com" passHref>
            <Badge component="a">react-hook-form</Badge>
          </NextLink>
          <NextLink href="https://tanstack.com/query/v4" passHref>
            <Badge component="a">react-query</Badge>
          </NextLink>
        </Group>

        <Group mt="4rem" mb="10rem">
          <Button
            component="a"
            href="https://github.com/cNoside/nextjs-mantine-template/generate"
            color="gray"
            radius="xl"
            size="xs"
            styles={{ inner: { color: 'white' } }}
          >
            Use This Template
          </Button>
          <Button
            component="a"
            href="https://github.com/cNoside/nextjs-mantine-template"
            color="gray"
            radius="xl"
            size="xs"
            styles={{ inner: { color: 'white' } }}
          >
            Open in Github
          </Button>
        </Group>
      </Container>
    </>
  );
};

export default Home;
