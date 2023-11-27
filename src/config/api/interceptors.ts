import {isInDevelopment} from '@/constants';
import {UNAUTHORIZED, UNAUTHENTICATED} from '@/constants';
import StorageService from '@/services/Storage';

export const onRequestSuccess = async (config: any) => {
  if (isInDevelopment) {
    // console.log('request success', config);
  }
  const token = await StorageService.getItem('accessToken');
  config.headers.Authorization = `Bearer ${token}`;
  return config;
};
export const onRequestFail = (error: any) => {
  if (isInDevelopment) {
    console.log('request error', error);
  }
  return Promise.reject(error);
};

export const onResponseSuccess = (response: any) => {
  if (isInDevelopment) {
    // console.log('response success', response);
  }
  return response;
};
export const onResponseFail = async (error: {
  status: any;
  response: {status: any};
}) => {
  if (isInDevelopment) {
    console.log('response error', error);
  }
  const status = error.status || error.response.status;
  if (status === UNAUTHENTICATED || status === UNAUTHORIZED) {
    if (isInDevelopment) {
      console.log(`Error ${UNAUTHENTICATED || UNAUTHORIZED}`);
    }
    await StorageService.nuke();
  }
  return Promise.reject(error);
};
