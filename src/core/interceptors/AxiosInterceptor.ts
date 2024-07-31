import axios, { InternalAxiosRequestConfig } from 'axios';
import { LocalStorageSession } from '../storage';
import LoginResponse from '@/modules/auth/sign-in/domain/LoginResponse';

const AxiosInterceptor = (): void => {
	// Add a request interceptor
	axios.interceptors.request.use(
		async (value: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
			const config: InternalAxiosRequestConfig = { ...value };

			config.headers.Accept = 'application/json';
			if (config.data instanceof FormData) {
				config.headers['Content-Type'] = 'multipart/form-data';
			} else {
				config.headers['Content-Type'] = 'application/json';
			}

			const isValidAuth = LocalStorageSession.isValidAuthorization();

			// console.log('Interceptor', isValidAuth);

			if (isValidAuth) {
				const user: LoginResponse | null = LocalStorageSession.getAuthorization();

				config.headers.Authorization = `Bearer ${user?.token}`;
			}

			return config;
		},
		async error => await Promise.reject(error),
	);

	// Add a response interceptor
	axios.interceptors.response.use(
		response => response,
		async error => await Promise.reject(error),
	);
};

export default AxiosInterceptor;
