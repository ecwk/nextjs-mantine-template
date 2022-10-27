import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { Container, Title, Text, createStyles } from '@mantine/core';

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

const NotFound: NextPage = () => {
  const { classes } = useStyles();

  return (
    <>
      <NextSeo title="Not Found" />
      <Container className={classes.container} size="sm" pb="10rem">
        <Title order={1} size="2.5rem" align="center">
          <Text color="orange">Not Found</Text>
          404
        </Title>
      </Container>
    </>
  );
};

export default NotFound;
