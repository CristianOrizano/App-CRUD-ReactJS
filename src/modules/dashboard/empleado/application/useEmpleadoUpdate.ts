import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { EmpleadoRequest } from '../domain/EmpleadoRequest';
import { EmpleadoResponse } from '../domain/EmpleadoResponse';
import { EmpleadoRepository } from '../infraestructure';
import { EMPLEADO_FIND_ALL } from './QueryKey';

interface EmpleadoUpdateProps {
	id: number;
	categoria: EmpleadoRequest;
}

const useEmpleadoUpdate = (): UseMutationResult<EmpleadoResponse, Error, EmpleadoUpdateProps> => {
	const queryClient = useQueryClient();
	const response = useMutation({
		mutationFn: async (empleado: EmpleadoUpdateProps) =>
			await EmpleadoRepository.update(empleado.id, empleado.categoria),
		onSuccess: () => {
			void queryClient.invalidateQueries({
				queryKey: [EMPLEADO_FIND_ALL],
			});
		},
	});

	return response;
};

export default useEmpleadoUpdate;
