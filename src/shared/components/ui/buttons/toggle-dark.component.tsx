import { IconMoon, IconSun } from '@tabler/icons';
import { ActionIcon, useMantineColorScheme } from '@mantine/core';

export const ToggleDark = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <ActionIcon
      onClick={() => toggleColorScheme()}
      variant="filled"
      radius="xl"
      size="lg"
    >
      {colorScheme === 'dark' ? <IconMoon size={18} /> : <IconSun size={20} />}
    </ActionIcon>
  );
};
