import axios, { AxiosResponse } from 'axios';
import { UsuarioRequest } from '../../domain/UsuarioRequest';
import { UsuarioResponse } from '../../domain/UsuarioResponse';
import { API_BASE_URL } from '@/core/constantes/env';

export const Resgister = async (login: UsuarioRequest): Promise<UsuarioResponse> => {
	const response: AxiosResponse<UsuarioResponse> = await axios.post(
		`${API_BASE_URL}/api/register`,

		login,
	);

	return response.data;
};
