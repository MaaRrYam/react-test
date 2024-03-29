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
  id: Yup.string(),
  companyName: Yup.string().required('Company name is required'),
  role: Yup.string().required('Role is required'),
  startYear: Yup.string().required('Start year is required'),
  endYear: Yup.string(),
});

export const educationSchema = Yup.object().shape({
  id: Yup.string(),
  instituteName: Yup.string().required('Institute name is required'),
  degreeName: Yup.string().required('Degree name is required'),
  startYear: Yup.string().required('Start year is required'),
  endYear: Yup.string(),
});
