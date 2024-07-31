import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { EmpleadoResponse } from '../domain/EmpleadoResponse';
import { EMPLEADO_FIND_ALL } from './QueryKey';
import { EmpleadoRepository } from '../infraestructure';

const useEmpleadoFindAll = (): UseQueryResult<EmpleadoResponse[], Error> => {
	const response = useQuery({
		queryKey: [EMPLEADO_FIND_ALL],
		queryFn: async () => await EmpleadoRepository.findAll(),
		retry: 0,
		refetchOnWindowFocus: false,
	});

	return response;
};

export default useEmpleadoFindAll;
