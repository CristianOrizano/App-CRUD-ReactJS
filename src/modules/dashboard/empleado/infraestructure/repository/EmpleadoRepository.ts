import axios, { AxiosResponse } from 'axios';
import { EmpleadoRequest } from '../../domain/EmpleadoRequest';
import { EmpleadoResponse } from '../../domain/EmpleadoResponse';
import { API_BASE_URL } from '@/core/constantes/env';

export const findAll = async (): Promise<EmpleadoResponse[]> => {
	const response: AxiosResponse<EmpleadoResponse[]> = await axios.get(
		`${API_BASE_URL}/api/empleado`,
	);

	return response.data;
};

export const create = async (empleado: EmpleadoRequest): Promise<EmpleadoResponse> => {
	const response: AxiosResponse<EmpleadoResponse> = await axios.post(
		`${API_BASE_URL}/api/empleado`,
		empleado,
	);

	return response.data;
};

export const update = async (id: number, empleado: EmpleadoRequest): Promise<EmpleadoResponse> => {
	const response: AxiosResponse<EmpleadoResponse> = await axios.put(
		`${API_BASE_URL}/api/empleado/${id}`,
		empleado,
	);

	return response.data;
};

export const deleteById = async (id: number): Promise<EmpleadoResponse> => {
	const response: AxiosResponse<EmpleadoResponse> = await axios.delete(
		`${API_BASE_URL}/api/empleado/${id}`,
	);

	return response.data;
};

export const findById = async (id: number): Promise<EmpleadoResponse> => {
	const response: AxiosResponse<EmpleadoResponse> = await axios.get(
		`${API_BASE_URL}/api/empleado/${id}`,
	);

	return response.data;
};
