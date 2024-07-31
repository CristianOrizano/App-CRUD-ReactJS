import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { EmpleadoResponse } from '../domain/EmpleadoResponse';
import { EmpleadoRequest } from '../domain/EmpleadoRequest';
import { EMPLEADO_FIND_ALL } from './QueryKey';
import { EmpleadoRepository } from '../infraestructure';

const useEmpleadoCreate = (): UseMutationResult<EmpleadoResponse, Error, EmpleadoRequest> => {
	const queryClient = useQueryClient();
	const response = useMutation({
		mutationFn: async (empleado: EmpleadoRequest) => await EmpleadoRepository.create(empleado),
		onSuccess: () => {
			void queryClient.invalidateQueries({
				queryKey: [EMPLEADO_FIND_ALL],
			});
		},
	});

	return response;
};

export default useEmpleadoCreate;
