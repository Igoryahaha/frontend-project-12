import * as yup from 'yup';

export const loginSchema = yup.object().shape({
  username: yup.string().required('login.required_field'),
  password: yup.string().required('login.required_field'),
});

export const validateName = (existNames) => {
  const channelSchema = yup.object().shape({
    name: yup.string().notOneOf(existNames, 'registration.should_be_uniq')
      .required('login.required_field'),
  });
  return channelSchema;
};

export const registrationSchema = yup.object().shape({
  username: yup.string('login.required_field').min(3, 'registration.incorrect_symbols_count').max(20, 'registration.incorrect_symbols_count').required('registration.incorrect_symbols_count'),
  password: yup.string('login.required_field').min(6, 'registration.min_6_symbols').required('registration.min_6_symbols'),
  passwordConfirmation: yup.string().oneOf(
    [yup.ref('password')],
    'registration.same_password',
  ),
});
