import React from 'react';
import {
  Button as MantineButton,
  ButtonProps,
  TextInput as MantineTextInput,
  TextInputProps,
  PasswordInput as MantinePasswordInput,
  PasswordInputProps
} from '@mantine/core';
import {
  useForm,
  UseFormRegister,
  UseFormReturn,
  FieldValues
} from 'react-hook-form';

export type FormProps<T extends FieldValues> = Omit<
  React.FormHTMLAttributes<HTMLFormElement>,
  'onSubmit'
> & {
  children?: React.ReactNode;
  onSubmit?: (data: any) => any;
  methods?: UseFormReturn<T>;
};

const Form = (props: FormProps<any>) => {
  const defaultMethods = useForm();
  const {
    children,
    methods = defaultMethods,
    onSubmit = () => {},
    ...formProps
  } = props;
  const { handleSubmit } = methods;

  return (
    <form onSubmit={handleSubmit(onSubmit)} {...formProps}>
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) {
          return child;
        }

        return child.props.name
          ? React.createElement(child.type, {
              ...{
                ...child.props,
                register: methods.register,
                key: child.props.name
              }
            })
          : child;
      })}
    </form>
  );
};

type InputProps = {
  name: string;
  register?: UseFormRegister<any>;
};

Form.TextInput = function TextInput(props: InputProps & TextInputProps) {
  const { name, register, ...textInputProps } = props;

  return (
    <MantineTextInput
      {...(register && { ...register(name) })}
      {...textInputProps}
    />
  );
};

Form.PasswordInput = function PasswordInput(
  props: InputProps & PasswordInputProps
) {
  const { name, register, ...passwordInputProps } = props;

  return (
    <MantinePasswordInput
      {...(register && { ...register(name) })}
      {...passwordInputProps}
    />
  );
};

Form.Button = function Button(props: ButtonProps) {
  return <MantineButton type="submit" {...props} />;
};

export { Form };
