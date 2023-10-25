import * as Yup from 'yup';

export const signInSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please Enter a valid Email')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters long')
    .max(24, 'Password must be less than 24 characters')
    .required('Password is required'),
});

export const signUpSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid Email')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters long')
    .max(24, 'Password must be less than 24 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

export const requestAccessSchema = Yup.object().shape({
  name: Yup.string().required('Name is Required'),
  linkedInUrl: Yup.string()
    .required('LinkedIn url is required')
    .matches(
      /^(?:(https?:\/\/)?(www\.)?)?linkedin\.com\/in\/[A-Za-z0-9_-]+\/?$/,
      'Please Enter a valid LinkedIn URL',
    ),
  email: Yup.string()
    .email('Please Enter a valid Email')
    .required('Email is required'),
  currentCompany: Yup.string().required('Current Company is Required'),
  currentDesignation: Yup.string().required('Designation is Required'),
  phoneNo: Yup.string()
    .required('Contact Number is required')
    .matches(
      /^(?:\+\d{1,3}\s?)?(?:\d{10}|\d{3}-\d{3}-\d{4}|\(\d{3}\)\s?\d{3}-\d{4})$/,
      'Please Enter a valid Phone Number',
    ),
});
