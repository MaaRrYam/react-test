import * as Yup from 'yup';

export const basicInfoSchema = Yup.object().shape({
  name: Yup.string(),
  about: Yup.string(),
  tagline: Yup.string(),
  country: Yup.string(),
  state: Yup.string(),
  city: Yup.string(),
});
