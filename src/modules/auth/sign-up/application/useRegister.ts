import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { UsuarioResponse } from '../domain/UsuarioResponse';
import { UsuarioRequest } from '../domain/UsuarioRequest';
import { ResgisterRepository } from '../infraestructure';

const useRegister = (): UseMutationResult<UsuarioResponse, Error, UsuarioRequest> => {
	const response = useMutation({
		mutationFn: async (login: UsuarioRequest) => await ResgisterRepository.Resgister(login),
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

export default useRegister;
