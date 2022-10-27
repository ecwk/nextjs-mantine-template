import NextLink from 'next/link';
import { Badge, createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => {
  return {
    badge: {
      ':hover': {
        backgroundColor: theme.fn.rgba(theme.colors.blue[8], 0.4)
      }
    }
  };
});

type Props = {
  href: string;
  label: string;
};

export const BadgeLink = (props: Props) => {
  const { href, label } = props;
  const { classes } = useStyles();

  return (
    <NextLink href={href} passHref>
      <Badge className={classes.badge} component="a">
        {label}
      </Badge>
    </NextLink>
  );
};
