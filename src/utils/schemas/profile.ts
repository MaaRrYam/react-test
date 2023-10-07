import * as Yup from 'yup';

export const basicInfoSchema = Yup.object().shape({
  name: Yup.string(),
  about: Yup.string(),
  tagline: Yup.string(),
  country: Yup.string(),
  state: Yup.string(),
  city: Yup.string(),
});

export const careerSchema = Yup.object().shape({
  companyName: Yup.string().required('Company name is required'),
  role: Yup.string().required('Role is required'),
  startYear: Yup.string().required('Start year is required'),
  endYear: Yup.string(),
});
