import { Env } from '@/env';

export const BASE_URL = Env.EXPO_PUBLIC_API_URL;
export const REFRESH_TOKEN_URL = `${BASE_URL}/users/refresh-token`;
