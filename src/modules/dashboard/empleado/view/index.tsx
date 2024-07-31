import Navbar from '@/modules/shared/navbar/Navbar';
import { EmpleadoResponse } from '../domain/EmpleadoResponse';
import { createColumnHelper } from '@tanstack/react-table';
import ModalSaveEmpleado, { ModalSaveEmpleadoRef } from './components/ModalSaveEmpleado';
import { useRef } from 'react';
import useEmpleadoFindAll from '../application/useEmpleadoFindAll';
import LoadingTable from '@/core/components/loading/LoadingTable';
import TableCoreSelectPaginated from '@/core/components/table/TableCoreSelectPaginated';
import { formatDate } from '@/core/helpers/DayJsHelper';
import { showDeleteConfirmation, showDeletedSuccess } from '@/core/helpers/SweatAlert';
import useEmpleadoDelete from '../application/useEmpleadoDelete';
import './styles/empleado.css';

const Index = () => {
	// Hooks
	const { data: docData, isFetching: isFetchingEmpleado } = useEmpleadoFindAll();
	const { mutateAsync: mutateAsyncEmpleado } = useEmpleadoDelete();

	const modalRef = useRef<ModalSaveEmpleadoRef>(null);
	//definir-columnas
	const columnHelper = createColumnHelper<EmpleadoResponse>();

	const deleteEmpleado = async (id: number) => {
		const isConfirmed = await showDeleteConfirmation();

		if (isConfirmed) {
			await mutateAsyncEmpleado(id);
			await showDeletedSuccess();
		}
	};

	const columns = [
		columnHelper.accessor('id', {
			header: 'ID',
			cell: info => info.getValue(),
		}),
		columnHelper.accessor('nombre', {
			header: 'Nombre',
			cell: info => info.getValue(),
		}),
		columnHelper.accessor('apellido', {
			header: 'Apellido',
			cell: info => info.getValue(),
		}),
		columnHelper.accessor('sueldo', {
			header: 'Sueldo',
			cell: info => info.getValue(),
		}),
		columnHelper.accessor('fecha_nacimiento', {
			header: 'Fecha Nacimiento',
			cell: info => {
				const date = info.getValue();
				return formatDate(date);
			},
		}),
		columnHelper.accessor('telefono', {
			header: 'telefono',
			cell: info => info.getValue(),
		}),

		columnHelper.display({
			id: 'acciones',
			header: () => <span className="d-block text-center text-nowrap">Acciones</span>,
			cell: ({ row }) => {
				return (
					<span className="d-flex align-items-center justify-content-center">
						<button
							type="button"
							className="btn btn-info mx-2"
							onClick={() => modalRef.current?.openModal(row.original.id)}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								fill="currentColor"
								className="bi bi-pencil-square"
								viewBox="0 0 16 16"
							>
								<path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
								<path
									fillRule="evenodd"
									d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
								/>
							</svg>
						</button>
						<button
							type="button"
							className="btn btn-danger mx-2"
							onClick={() => deleteEmpleado(row.original.id)}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								fill="currentColor"
								className="bi bi-trash"
								viewBox="0 0 16 16"
							>
								<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
								<path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
							</svg>
						</button>
					</span>
				);
			},
		}),
	];
	return (
		<>
			<Navbar />
			<div className="container">
				<div className="mt-5">
					<h1 className="text-center fw-bold gradi-text">
						Listado Empleados ({docData?.length ?? 0})
					</h1>
					<button
						onClick={() => modalRef.current?.openModal()}
						type="button"
						className="btn btn-primary mb-3"
					>
						Registrar
					</button>

					{isFetchingEmpleado ? (
						<LoadingTable />
					) : (
						<TableCoreSelectPaginated<EmpleadoResponse> columns={columns} data={docData} />
					)}
				</div>
			</div>
			<ModalSaveEmpleado ref={modalRef} />
		</>
	);
};

export default Index;
