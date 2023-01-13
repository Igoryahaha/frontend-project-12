import * as yup from 'yup';

export const loginSchema = yup.object().shape({
  username: yup.string().required('required_field'),
  password: yup.string().required('required_field'),
});

export const validateName = (existNames) => {
  const channelSchema = yup.object().shape({
    name: yup.string().notOneOf(existNames, 'should_be_uniq')
      .required('required_field'),
  });
  return channelSchema;
};
