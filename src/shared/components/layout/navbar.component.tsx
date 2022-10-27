import {
  ActionIcon,
  Anchor,
  Container,
  createStyles,
  Group,
  Header
} from '@mantine/core';
import React from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { IconLogout } from '@tabler/icons';

import { useSession } from 'modules/auth';
import { IAppRoute } from 'shared/interfaces';
import { ToggleDark } from 'shared/components';

const DEFAULT_HEIGHT = 80;

const useStyles = createStyles((theme) => {
  const isDarkMode = theme.colorScheme === 'dark';
  const orange =
    theme.colorScheme === 'dark'
      ? theme.colors.orange[7]
      : theme.colors.orange[5];
  return {
    logo: {
      position: 'relative',
      color: orange,
      '::after': {
        content: '""',
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '1px',
        backgroundColor: orange,
        transform: 'scaleX(0)',
        transformOrigin: 'left',
        transition: '0.1s ease-out'
      },
      ':hover': {
        '::after': {
          transform: 'scaleX(1)'
        }
      }
    },
    container: {
      display: 'flex',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    list: {
      display: 'flex',
      margin: 0,
      padding: 0,
      columnGap: theme.spacing.md
    },
    listItem: {
      listStyle: 'none',
      a: {
        color: theme.colors.dark[2]
      },
      'a.active': {
        color: isDarkMode ? theme.colors.gray[2] : theme.colors.gray[7]
      },
      'a:hover': {
        color: isDarkMode ? theme.colors.dark[0] : theme.colors.dark[9]
      }
    }
  };
});

export interface INavbarProps {
  height?: number | string;
  width?: number;
  links?: IAppRoute[];
}

export const Navbar = (props: INavbarProps) => {
  const { classes } = useStyles();
  const router = useRouter();
  const { session, logout } = useSession();

  const handleLogout = () => {
    logout();
  };

  return (
    <Header height={props.height || DEFAULT_HEIGHT}>
      <Container className={classes.container} size={props.width}>
        <nav>
          <NextLink href="/" passHref>
            <Anchor className={classes.logo} underline={false}>
              nextjs-mantine-template
            </Anchor>
          </NextLink>
          <ul className={classes.list}>
            {props.links?.map((link, i) => {
              const key = `link-${i}`;
              const displayNav =
                link.displayNav instanceof Function
                  ? link.displayNav({ router, session })
                  : link.displayNav;
              if (!displayNav)
                return <React.Fragment key={key}></React.Fragment>;
              return (
                <li key={key} className={classes.listItem}>
                  <NextLink href={link.path} passHref>
                    <Anchor
                      className={router.pathname === link.path ? 'active' : ''}
                      underline={false}
                    >
                      {link.label}
                    </Anchor>
                  </NextLink>
                </li>
              );
            })}
          </ul>
        </nav>
        <Group>
          <ToggleDark />
          {session.status === 'authenticated' && (
            <ActionIcon
              onClick={handleLogout}
              variant="filled"
              radius="xl"
              size="lg"
              color="orange"
            >
              <IconLogout size={18} style={{ marginRight: '-3px' }} />
            </ActionIcon>
          )}
        </Group>
      </Container>
    </Header>
  );
};
