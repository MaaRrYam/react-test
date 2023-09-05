import * as Yup from 'yup';

export const getStartedSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  city: Yup.string().required('City is required'),
  state: Yup.string().required('State is required'),
});

export const signInSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please Enter a valid Email')
    .required('Email is required'),
  password: Yup.string()
    .min(3, 'Password must be at least 3 characters long')
    .max(24, 'Password must be less than 24 characters')
    .required('Password is required'),
});

export const salaryExpectationsSchema = Yup.object().shape({
  minimumSalary: Yup.number()
    .min(10, 'Minimum Salary should be greater than 10')
    .required('Minimum Salary is required'),
  baseSalary: Yup.number()
    .min(10, 'Base Salary should be greater than 10')
    .required('Base Salary is required'),
  totalCompensation: Yup.number()
    .min(10, 'Total Compensation should be greater than 10')
    .required('Total Compensation is required'),
});
