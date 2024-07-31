import Swal from 'sweetalert2';

export const showDeleteConfirmation = async () => {
	const result = await Swal.fire({
		title: 'Estas Seguro?',
		text: 'Los datos no se restableceran!',
		icon: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		confirmButtonText: 'SI, Eliminar!',
	});

	return result.isConfirmed;
};

export const showDeletedSuccess = async () => {
	await Swal.fire({
		title: 'Eliminado!',
		text: 'El registro has sido eliminado.',
		icon: 'success',
	});
};
