import {
  ActionIcon,
  Avatar,
  Card,
  CardProps,
  Group,
  Text
} from '@mantine/core';
import { IconMail, IconUserPlus } from '@tabler/icons';

import { IUser } from 'modules/users';

type Props = Omit<CardProps, 'children'> & {
  user?: IUser;
};

export const UserCard = (props: Props) => {
  const { user, ...cardProps } = props;

  return (
    <Card {...cardProps}>
      <Group position="apart">
        <section>
          <Group>
            <Avatar size="lg">{user?.name[0].toUpperCase()}</Avatar>
            <Text weight="500">{user?.name}</Text>
          </Group>
        </section>
        <section>
          <Group>
            <ActionIcon variant="filled" radius="xl" size="lg">
              <IconMail size={20} />
            </ActionIcon>
            <ActionIcon variant="filled" radius="xl" size="lg">
              <IconUserPlus size={20} />
            </ActionIcon>
          </Group>
        </section>
      </Group>
      <Text mt="sm" color="dimmed">
        {user?.bio}
      </Text>
    </Card>
  );
};
