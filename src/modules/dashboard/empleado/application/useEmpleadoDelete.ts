import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { EmpleadoResponse } from '../domain/EmpleadoResponse';
import { EmpleadoRepository } from '../infraestructure';
import { EMPLEADO_FIND_ALL } from './QueryKey';

const useEmpleadoDelete = (): UseMutationResult<EmpleadoResponse, Error, number> => {
	const queryClient = useQueryClient();
	const response = useMutation({
		mutationFn: async (id: number) => await EmpleadoRepository.deleteById(id),
		onSuccess: () => {
			void queryClient.invalidateQueries({
				queryKey: [EMPLEADO_FIND_ALL],
			});
		},
	});

	return response;
};

export default useEmpleadoDelete;
