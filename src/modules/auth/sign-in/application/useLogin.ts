import { useMutation, UseMutationResult } from '@tanstack/react-query';
import LoginRequest from '../domain/LoginRequest';
import LoginResponse from '../domain/LoginResponse';
import { LoginRepository } from '../infraestructure';

const useLogin = (): UseMutationResult<LoginResponse, Error, LoginRequest> => {
	const response = useMutation({
		mutationFn: async (login: LoginRequest) => await LoginRepository.login(login),
		onError: (error: Error) => {
			if ((error as any).response !== undefined) {
				console.log('error', (error as any).response.data.error);
				// toastWarning((error as any).response.data.Message);
			} else {
				console.log('error', error.message);
			}
		},
	});
	return response;
};

export default useLogin;
