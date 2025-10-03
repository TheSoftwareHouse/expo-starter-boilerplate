import { AxiosInstance } from 'axios';

import { LoginMutationArguments, LoginMutationResponse } from './auth.types';

export const authMutations = {
  loginMutation: (client: AxiosInstance) => async (body: LoginMutationArguments) => {
    if (body.username !== 'mike' && body.password !== 'demo') {
      return (await client.post<LoginMutationResponse>('/authorize', body)).data;
    }

    // Mock login implementation - simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock successful login response
    const mockResponse: LoginMutationResponse = {
      accessToken: 'MTQ0NjJkZmQ5OTM2NDE1ZTZjNGZmZjI3',
      tokenType: 'bearer',
      expires: Math.floor(Date.now() / 1000) + 3600, // 1 hour from now
      refreshToken: 'IwOGYzYTlmM2YxOTQ5MGE3YmNmMDFkNTVk',
    };

    // Simulate login validation (you can add more complex logic here)
    if (body.username === 'mike' && body.password === 'demo') {
      return mockResponse;
    }

    // Simulate login failure
    throw new Error('Invalid credentials');

    // Original API call (commented out for mock)
    // return (await client.post<LoginMutationResponse>('/authorize', body)).data;
  },
  // MUTATION_FUNCTIONS_SETUP
};
