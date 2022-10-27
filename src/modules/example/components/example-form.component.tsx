import { Prism } from '@mantine/prism';
import { createStyles, Text } from '@mantine/core';

import { clientUsersAPI } from 'modules/users';
import { Form, FormProps } from 'shared/components';
import { useMutation } from '@tanstack/react-query';

const useStyles = createStyles((theme) => {
  return {
    form: {
      display: 'flex',
      flexDirection: 'column',
      rowGap: '1rem'
    }
  };
});

interface IFormData {
  email: string;
  password: string;
}

type Props = FormProps<IFormData>;

export const ExampleForm = (props: Props) => {
  const { classes } = useStyles();

  const mutation = useMutation(
    (data: IFormData) => {
      return clientUsersAPI.create(data);
    },
    {
      onSuccess: (res) => {
        if (res.status === 'fail') {
          const validationErrors = res.data.errors;
          validationErrors.forEach((error) => {
            methods?.setError(error.field as keyof IFormData, {
              message: error.message
            });
          });
        }
      }
    }
  );

  const { methods } = props;
  const errors = methods?.formState.errors;
  const values = methods?.watch();

  const onSubmit = async (data: IFormData) => {
    mutation.mutate(data);
  };

  return (
    <>
      <Text>Output</Text>
      <Text color="dimmed" size="sm">
        Note - there is an intentional 50% chance that the request will fail.
      </Text>
      <Prism language="yaml" mb="xl" noCopy colorScheme="dark">
        {`isSuccess: ${mutation.data?.status === 'success'}${Object.entries(
          values || {}
        )
          .map(([key, value]) => `\n${key}: ${value || 'empty'}`)
          .join('')}`}
      </Prism>

      <Form className={classes.form} methods={methods} onSubmit={onSubmit}>
        <Form.TextInput
          name="email"
          label="Email"
          error={errors?.email?.message}
        />
        <Form.PasswordInput
          name="password"
          label="Password"
          error={errors?.password?.message}
        />
        <Form.Button type="submit" mt="xl" color="orange">
          Create Account
        </Form.Button>
      </Form>
    </>
  );
};
