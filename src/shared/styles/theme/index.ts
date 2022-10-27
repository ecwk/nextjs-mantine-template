import { ContainerProps, MantineTheme } from '@mantine/core';

const ContainerDefaultProps: Partial<ContainerProps> = {
  size: 1000
};

export const theme: Partial<MantineTheme> = {
  colorScheme: 'dark',
  components: {
    Container: {
      defaultProps: ContainerDefaultProps,
    }
  }
};
