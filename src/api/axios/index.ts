import axios from 'axios';

import { requestSuccessInterceptor } from '@/context/apiClient/apiClientContextController/interceptors/requestInterceptors';
import {
  responseFailureInterceptor,
  responseSuccessInterceptor,
} from '@/context/apiClient/apiClientContextController/interceptors/responseInterceptors';

export const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export const axiosClient = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
  baseURL: BASE_URL,
});

axiosClient.interceptors.request.use(requestSuccessInterceptor);
axiosClient.interceptors.response.use(responseSuccessInterceptor, responseFailureInterceptor);
