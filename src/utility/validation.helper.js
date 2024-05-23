import * as Yup from 'yup';

export function isEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

export const emailOrPhoneSchema = Yup.string()
  .required()
  .test(
    'email-or-phone',
    'Must be a valid Email or Phone Number',
    function (value) {
      const { path, createError } = this;

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^(\+?\d{1,3}[- ]?)?\d{10}$/;

      if (emailRegex.test(value) || phoneRegex.test(value)) {
        return true;
      }

      return createError({
        path,
        message: 'Must be a valid Email or Phone Number',
      });
    },
  );
