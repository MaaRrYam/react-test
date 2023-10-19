import StorageService from '@/services/Storage';
import API from './API';
import {isInDevelopment, UNAUTHENTICATED, UNAUTHORIZED} from '@/constants';

export const API_GET = async (url: string, headers = {}, params = {}) => {
  try {
    if (isInDevelopment) {
      console.log(`Trying to GET Data at ${url}`);
    }
    const {data} = await API.get(url, {headers, params});
    if (isInDevelopment) {
      // console.log(`GET Data at ${url}`, data);
    }

    return data;
  } catch (error: any) {
    if (isInDevelopment) {
      console.log(`Error while GET Request at${url}`, error.response.data);
    }
    if (
      error.response?.status === UNAUTHENTICATED ||
      error.response?.status === UNAUTHORIZED
    ) {
      await StorageService.nuke();
    }
    throw new Error(JSON.stringify(error.response.data.error.message));
  }
};

export const API_POST = async (
  url: string,
  payload: any,
  headers?: {headers: {}},
) => {
  try {
    if (isInDevelopment) {
      console.log(`Trying to POST  Data at ${url} with payload`, payload);
    }
    const res = await API.post(url, payload, headers);
    if (isInDevelopment) {
      console.log(`POST Data at ${url}`, res.data);
    }
    return res.data;
  } catch (error: any) {
    if (isInDevelopment) {
      console.log(
        `Error while POST Request at${url} with Data `,
        payload,
        error.response.data,
      );
    }

    if (
      error.response?.status === UNAUTHENTICATED ||
      error.response?.status === UNAUTHORIZED
    ) {
      await StorageService.nuke();
    }
    throw new Error(JSON.stringify(error.response.data.error.message));
  }
};

export const API_PATCH = async (
  url: string,
  id: string | number,
  payload: object,
  headers?: object,
) => {
  try {
    if (isInDevelopment) {
      console.log(`Trying to PATCH  Data at ${url} with payload`, payload);
    }
    const res = await API.patch(`${url}/${id}`, payload, headers);
    if (isInDevelopment) {
      console.log(`PATCH Data at ${url}`, res.data);
    }

    return res.data;
  } catch (error: any) {
    if (isInDevelopment) {
      console.log(
        `Error while PATCH Request at${url} with Data `,
        payload,
        error.response.data,
      );
    }
    if (
      error.response?.status === UNAUTHENTICATED ||
      error.response?.status === UNAUTHORIZED
    ) {
      await StorageService.nuke();
    }
    throw new Error(JSON.stringify(error.response.data.error.message));
  }
};

export const API_PUT = async (
  url: string,
  id: string | number,
  payload: object,
  headers?: object,
) => {
  try {
    if (isInDevelopment) {
      console.log(`Trying to PUT  Data at ${url} with payload`, payload);
    }
    const {data} = await API.put(`${url}/${id}`, payload, headers);
    if (isInDevelopment) {
      console.log(`PUT Data at ${url}`, data);
    }

    return data;
  } catch (error: any) {
    if (isInDevelopment) {
      console.log(
        `Error while PUT Request at${url} with Data `,
        payload,
        error.response.data,
      );
    }
    if (
      error.response?.status === UNAUTHENTICATED ||
      error.response?.status === UNAUTHORIZED
    ) {
      await StorageService.nuke();
    }
    throw new Error(JSON.stringify(error.response.data.error.message));
  }
};

export const API_DELETE = async (
  url: string,
  id: string | number,
  headers?: object,
) => {
  try {
    if (isInDevelopment) {
      console.log(`Trying to DELETE  Request at ${url} with id`, id);
    }
    const {data} = await API.delete(`${url}/${id}`, headers);
    if (isInDevelopment) {
      console.log(`DELETE Request at ${url}`, data);
    }

    return data;
  } catch (error: any) {
    if (isInDevelopment) {
      console.log(
        `Error while DELETE Request at${url} with Data `,
        error.response.data,
      );
    }
    if (
      error.response?.status === UNAUTHENTICATED ||
      error.response?.status === UNAUTHORIZED
    ) {
      await StorageService.nuke();
    }
    throw new Error(JSON.stringify(error.response.data.error.message));
  }
};
