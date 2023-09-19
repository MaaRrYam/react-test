import {isInDevelopment} from '@/constants';
import {UNAUTHORIZED, UNAUTHENTICATED} from '@/constants';
import StorageService from '@/services/Storage';

export const onRequestSuccess = async (config: any) => {
  if (isInDevelopment) {
    console.log('request success', config);
  }
  const token =
    (await StorageService.getItem('accessToken')) ||
    'eyJhbGciOiJSUzI1NiIsImtpZCI6ImM2MGI5ZGUwODBmZmFmYmZjMTgzMzllY2Q0NGFjNzdmN2ZhNGU4ZDMiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiVXphaXIgQXNpZiIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BR05teXhaX2dYUmhuT2IwQnBiQ2ZpalE5aVJnS252WlF6cmpqd21PcE9kX3ZBPXM5Ni1jIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL2NhcmVlcm5ldHdvcmtwcm9kIiwiYXVkIjoiY2FyZWVybmV0d29ya3Byb2QiLCJhdXRoX3RpbWUiOjE2OTM0MDI0NzUsInVzZXJfaWQiOiIzTWRDU2txb0pTY2tpSlhvVUxnS3N1dDJSd2cyIiwic3ViIjoiM01kQ1NrcW9KU2NraUpYb1VMZ0tzdXQyUndnMiIsImlhdCI6MTY5MzQwMjQ3NSwiZXhwIjoxNjkzNDA2MDc1LCJlbWFpbCI6InV6YWlyYXNpZjcyOUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJnb29nbGUuY29tIjpbIjEwNTAxMzU1NTU0MzMwMzg5NDExNyJdLCJlbWFpbCI6WyJ1emFpcmFzaWY3MjlAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9fQ.npLPrObl0ZPqY-F1mxoxbiCYw3hR8MHL2L2HW7PoZSMlKMO4CHNyQxYDKya_FRsV3EpSsuWN2Y1AoxVHmTp0ZtCa0slM1yTR0rP7Hgqw3X0VBXqPK9dzfm2Dd3KiIE6BkS0JVyKCCf2LPVd7iErfq0pez6oR2mN1mtKecgsp4Qpts-xqI2EsMe8XWdn75CJ62ZGpqsFro2_NMh6N7CDkIQKpnM0Lk47Lv7CpLjSN63iJOg_LS8LRsg4Rxq-nXL1ljzUd42rKVoMbHRBpya5wWOxWnvdVEMmR-2fSD0GbkpI3W4eyplhTtbjHnte5PDrAIN-4Vs0JSRl3s4oxYBjazw';
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
    console.log('response success', response);
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
