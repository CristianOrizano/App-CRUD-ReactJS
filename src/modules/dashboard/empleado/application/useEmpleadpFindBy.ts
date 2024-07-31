import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { EmpleadoResponse } from '../domain/EmpleadoResponse';
import { EMPLEADO_FIND_BY_ID } from './QueryKey';
import { EmpleadoRepository } from '../infraestructure';

const useEmpleadpFindBy = (id?: number): UseQueryResult<EmpleadoResponse, Error> => {
	const response = useQuery({
		queryKey: [EMPLEADO_FIND_BY_ID, id],
		queryFn: async () => await EmpleadoRepository.findById(id as number),
		enabled: !(id == null),
		retry: 0,
		refetchOnWindowFocus: false,
	});

	return response;
};

export default useEmpleadpFindBy;
