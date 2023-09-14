import * as Yup from 'yup';

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

export const getStartedSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  city: Yup.string().required('City is required'),
  state: Yup.string().required('State is required'),
});

export const addEducationSchema = Yup.object().shape({
  instituteName: Yup.string().required('Institute Name is required'),
  degree: Yup.string().required('Degree is required'),
  cgpa: Yup.string(),
  startingYear: Yup.number()
    .min(1950, 'Start Year should be greater than 1950')
    .max(
      new Date().getFullYear(),
      'Start Year should be less than current year',
    )
    .required('Start Year is required'),
  endingYear: Yup.number()
    .min(1950, 'Ending Year should be greater than 1950')
    .max(
      new Date().getFullYear(),
      'Ending Year should be equal or less than current year',
    ),
  currentlyWorking: Yup.boolean(),
});

export const addExperienceSchema = Yup.object().shape({
  currentCompany: Yup.string().required('Current Company is Required'),
  designation: Yup.string().required('Designation is Required'),
  startingYear: Yup.number()
    .min(1950, 'Start Year should be greater than 1950')
    .max(
      new Date().getFullYear(),
      'Start Year should be less than current year',
    )
    .required('Start Year is required'),
  endingYear: Yup.number()
    .min(1950, 'Ending Year should be greater than 1950')
    .max(
      new Date().getFullYear(),
      'Ending Year should be equal or less than current year',
    ),
  currentlyWorking: Yup.boolean(),
});