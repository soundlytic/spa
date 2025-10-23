import apiClient from './index';

export interface Token {
  token: string
}

export const login = async (data: {username: string, password: string}): Promise<Token> => {
  const response = await apiClient.post<Token>('/auth/login', data);

  return response.data;  
}

export const signup = async (data: {username: string, password: string, confirmpassword: string}): Promise<Token> => {
  const response = await apiClient.post<Token>('/auth/sign-up', data);

  return response.data;  
}