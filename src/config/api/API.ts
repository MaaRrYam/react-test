import axios from 'axios';
import {baseURL} from '@/constants';
import {
  onRequestSuccess,
  onRequestFail,
  onResponseSuccess,
  onResponseFail,
} from './interceptors';

const API = axios.create({
  baseURL,
});

API.interceptors.request.use(onRequestSuccess, onRequestFail);
API.interceptors.response.use(onResponseSuccess, onResponseFail);

export default API;
