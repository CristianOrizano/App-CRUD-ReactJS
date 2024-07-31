import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faBackward,
	faBackwardFast,
	faForward,
	faForwardFast,
} from '@fortawesome/free-solid-svg-icons';

import {
	type ColumnDef,
	flexRender,
	getCoreRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table';

import { Table } from 'react-bootstrap';

interface TableCoreSelectPaginatedProps<T> {
	columns: Array<ColumnDef<T, any>>;
	data: any;
}

const TableCoreSelectPaginated = <T,>({
	columns,
	data,
}: TableCoreSelectPaginatedProps<T>): JSX.Element => {
	// const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

	const table = useReactTable<T>({
		columns: columns,
		data: data ?? [],
		getSortedRowModel: getSortedRowModel(),
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
	});

	return (
		<>
			<div className="shadow-lg p-3 mb-5 bg-body rounded">
				<Table responsive bordered hover size="">
					<thead>
						{table.getHeaderGroups().map(headerGroup => (
							<tr key={headerGroup.id}>
								{headerGroup.headers.map(header => (
									<th key={header.id} className="bg-secondary text-white">
										{header.isPlaceholder
											? null
											: flexRender(header.column.columnDef.header, header.getContext())}
									</th>
								))}
							</tr>
						))}
					</thead>
					<tbody>
						{table.getRowModel().rows.map(row => (
							<tr key={row.id}>
								{row.getVisibleCells().map(cell => (
									<td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
								))}
							</tr>
						))}
					</tbody>
				</Table>
				<div className="d-flex align-items-center ">
					<button
						className="btn btn-dark border rounded p-1"
						onClick={() => table.firstPage()}
						disabled={!table.getCanPreviousPage()}
					>
						<FontAwesomeIcon icon={faBackwardFast} />
					</button>
					<button
						className="btn btn-outline-dark border rounded p-1"
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
					>
						<FontAwesomeIcon icon={faBackward} />
					</button>
					<button
						className="btn btn-outline-dark border rounded p-1"
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
					>
						<FontAwesomeIcon icon={faForward} />
					</button>
					<button
						className="btn btn-dark border rounded p-1"
						onClick={() => table.lastPage()}
						disabled={!table.getCanNextPage()}
					>
						<FontAwesomeIcon icon={faForwardFast} />
					</button>

					<select
						className="form-select w-auto mx-4" // ms-auto
						value={table.getState().pagination.pageSize}
						onChange={e => {
							table.setPageSize(Number(e.target.value));
						}}
					>
						{[10, 20, 30, 40, 50].map(pageSize => (
							<option key={pageSize} value={pageSize}>
								Show {pageSize}
							</option>
						))}
					</select>
				</div>
			</div>
		</>
	);
};

export default TableCoreSelectPaginated;
