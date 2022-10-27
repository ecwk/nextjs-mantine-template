import * as yup from 'yup';

export const exampleSchema = yup.object({
  email: yup.string().email('Invalid email').max(255).required('Required'),
  password: yup
    .string()
    .matches(/(?=.*[a-z]).*/, {
      message: 'At least 1 lowercase letter'
    })
    .matches(/(?=.*[A-Z]).*/, {
      message: 'At least 1 uppercase letter'
    })
    .matches(/(?=.*[0-9]).*/, {
      message: 'At least 1 number'
    })
    .matches(/(?=.*[!@#$%^&*]).*/, {
      message: 'At least 1 special character (!@#$%^&*)'
    })
    .test('minimumLength', 'At least 8 characters', (value) => {
      if (value) {
        return value.length >= 8;
      }
      return true;
    })
    .required('Required')
});
