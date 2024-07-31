import axios, { AxiosResponse } from 'axios';
import LoginRequest from '../../domain/LoginRequest';
import LoginResponse from '../../domain/LoginResponse';
import { API_BASE_URL } from '../../../../../core/constantes/env';

export const login = async (login: LoginRequest): Promise<LoginResponse> => {
	const response: AxiosResponse<LoginResponse> = await axios.post(
		`${API_BASE_URL}/api/login`,

		login,
	);

	return response.data;
};
