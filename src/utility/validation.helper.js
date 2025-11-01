import * as Yup from 'yup';

export function isEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

export const emailOrPhoneSchema = Yup.string()
  .required()
  .test(
    'email-or-phone',
    'Must be a valid Email',
    function (value) {
      const { path, createError } = this;

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^(\+?\d{1,3}[- ]?)?\d{10}$/;

      if (emailRegex.test(value) || phoneRegex.test(value)) {
        return true;
      }

      return createError({
        path,
        message: 'Must be a valid Email',
      });
    },
  );

// Validation schema for RecycleScreen
export const recycleValidationSchema = Yup.object().shape({
  preferred_pick_date: Yup.string().required('Pickup date is required'),
  preferred_pick_time: Yup.string().required('Pickup time is required'),
  //state: Yup.object().required('State is required'),
  //city: Yup.object().required('City is required'),
  //postal_code: Yup.string().required('Postal code is required'),
  street_address: Yup.string().required('Street address is required'),
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Valid email is required').required('Email is required'),
  // phone: Yup.string()
  //   .matches(/^(\+?\d{1,3}[- ]?)?\d{10}$/, 'Valid phone number is required')
  //   .required('Phone number is required'),
  note: Yup.string(),
});

// Default export for backward compatibility
export default recycleValidationSchema;
