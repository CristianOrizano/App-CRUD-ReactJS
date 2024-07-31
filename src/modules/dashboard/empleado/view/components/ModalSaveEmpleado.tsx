import { forwardRef, ReactNode, useEffect, useImperativeHandle, useState } from 'react';

import { useFormik } from 'formik';
import { EmpleadoRequest } from '../../domain/EmpleadoRequest';
import * as Yup from 'yup';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import useEmpleadoCreate from '../../application/useEmpleadoCreate';
import Swal from 'sweetalert2';
import useEmpleadoUpdate from '../../application/useEmpleadoUpdate';
import useEmpleadpFindBy from '../../application/useEmpleadpFindBy';
import { formatDate } from '@/core/helpers/DayJsHelper';

interface ModalProps {
	children?: ReactNode;
}

export interface ModalSaveEmpleadoRef {
	openModal: (id?: number) => void;
	closeModal?: () => void;
}

const ModalSaveEmpleado = forwardRef<ModalSaveEmpleadoRef, ModalProps>((_, ref) => {
	// Attributes
	const [show, setShow] = useState<boolean>(false);
	const [id, setId] = useState<number>();
	//form - modal
	const formik = useFormik<EmpleadoRequest>({
		initialValues: {
			nombre: '',
			apellido: '',
			fechaNacimiento: '',
			sueldo: 0,
			telefono: 0,
		},
		validationSchema: Yup.object().shape({
			nombre: Yup.string()
				.trim()
				.nullable()
				.required('Nombre es requerido')
				.matches(/^[a-zA-Z\s]+$/, 'Nombre solo puede contener letras y espacios'),

			apellido: Yup.string()
				.trim()
				.required('Apellido es requerido')
				.matches(/^[a-zA-Z\s]+$/, 'Apellido solo puede contener letras y espacios'),
			fechaNacimiento: Yup.date()
				.nullable()
				.required('Fecha de nacimiento es requerida')
				.max(new Date(), 'La fecha de nacimiento no puede ser en el futuro'),
			sueldo: Yup.number()
				.required('Sueldo es requerido')
				.min(100, 'Sueldo no puede ser menor a 100')
				.max(10000, 'Sueldo no puede ser mayor a 10,000'),
			telefono: Yup.number()
				.required('Teléfono es requerido')
				.positive('Teléfono debe ser positivo')
				.integer('Teléfono debe ser un número entero')
				.min(100000000, 'Teléfono debe tener al menos 9 dígitos')
				.max(999999999, 'Teléfono no puede tener más de 9 dígitos'),
		}),
		onSubmit: values => {
			void saveEmpleado(values);
		},
	});

	//Hooks
	const { data: empleado } = useEmpleadpFindBy(id);
	const { mutateAsync: mutateAsyncCreate } = useEmpleadoCreate();
	const { mutateAsync: mutateAsyncUpdate } = useEmpleadoUpdate();

	// Methods
	const openModal = (id?: number): void => {
		setId(id);
		setShow(true);
	};
	const closeModal = (): void => {
		setShow(false);
		setId(undefined);
		formik.resetForm();
	};
	const saveEmpleado = async (payload: EmpleadoRequest) => {
		try {
			if (id != null) {
				await mutateAsyncUpdate({ id, categoria: payload });
			} else {
				await mutateAsyncCreate(payload);
			}
			Swal.fire({
				icon: 'success',
				title: 'Correcto',
				text: 'Exito al registrar',
			});
			closeModal();
		} catch (error) {
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Error al guardar',
			});
		}
	};

	useEffect(() => {
		if (empleado != null) {
			console.log('FEcha >>>', empleado);
			void formik.setValues({
				nombre: empleado.nombre,
				apellido: empleado.apellido,
				fechaNacimiento: formatDate(empleado.fecha_nacimiento),
				sueldo: empleado.sueldo,
				telefono: empleado.telefono,
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [empleado]);

	// ImperativeHandle
	useImperativeHandle(ref, () => {
		return {
			openModal,
			closeModal,
		};
	});

	return (
		<>
			<Modal show={show} onHide={closeModal} backdrop="static">
				<Modal.Header closeButton className="bg-danger">
					<Modal.Title className="text-white">Empleado </Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form noValidate onSubmit={formik.handleSubmit}>
						<Row className="g-3">
							<Col xs={12}>
								<Form.Group className="mb-3" controlId="validationCustom01">
									<Form.Label>Nombre</Form.Label>
									<Form.Control
										type="text"
										placeholder="Ingrese Nombre"
										name="nombre"
										value={formik.values.nombre}
										onChange={formik.handleChange}
										isInvalid={formik.touched.nombre && !!formik.errors.nombre}
										isValid={formik.touched.nombre && !formik.errors.nombre}
									/>
									<Form.Control.Feedback type="invalid">
										{formik.errors.nombre}
									</Form.Control.Feedback>
								</Form.Group>
								<Form.Group className="mb-3" controlId="validationCustom01">
									<Form.Label>Apellido</Form.Label>
									<Form.Control
										type="text"
										placeholder="Ingrese Apellido"
										name="apellido"
										value={formik.values.apellido}
										onChange={formik.handleChange}
										isInvalid={formik.touched.apellido && !!formik.errors.apellido}
										isValid={formik.touched.apellido && !formik.errors.apellido}
									/>
									<Form.Control.Feedback type="invalid">
										{formik.errors.apellido}
									</Form.Control.Feedback>
								</Form.Group>
								<Form.Group className="mb-3" controlId="validationCustom01">
									<Form.Label>Fecha Nacimiento</Form.Label>
									<Form.Control
										type="date"
										placeholder="Ingrese Fecha Nacimiento"
										name="fechaNacimiento"
										value={formik.values.fechaNacimiento}
										onChange={formik.handleChange}
										isInvalid={formik.touched.fechaNacimiento && !!formik.errors.fechaNacimiento}
										isValid={formik.touched.fechaNacimiento && !formik.errors.fechaNacimiento}
									/>
									<Form.Control.Feedback type="invalid">
										{formik.errors.fechaNacimiento}
									</Form.Control.Feedback>
								</Form.Group>
								<Form.Group className="mb-3" controlId="validationCustom01">
									<Form.Label>Sueldo</Form.Label>
									<Form.Control
										type="number"
										placeholder="Ingrese Sueldo"
										name="sueldo"
										value={formik.values.sueldo}
										onChange={formik.handleChange}
										isInvalid={formik.touched.sueldo && !!formik.errors.sueldo}
										isValid={formik.touched.sueldo && !formik.errors.sueldo}
									/>
									<Form.Control.Feedback type="invalid">
										{formik.errors.sueldo}
									</Form.Control.Feedback>
								</Form.Group>
								<Form.Group className="mb-3" controlId="validationCustom01">
									<Form.Label>Telefono</Form.Label>
									<Form.Control
										type="number"
										placeholder="Ingrese Telefono"
										name="telefono"
										value={formik.values.telefono}
										onChange={formik.handleChange}
										isInvalid={formik.touched.telefono && !!formik.errors.telefono}
										isValid={formik.touched.telefono && !formik.errors.telefono}
									/>
									<Form.Control.Feedback type="invalid">
										{formik.errors.telefono}
									</Form.Control.Feedback>
								</Form.Group>
							</Col>
						</Row>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button
						variant="primary"
						onClick={() => {
							formik.handleSubmit();
						}}
					>
						Guardar
					</Button>
					<Button variant="secondary" onClick={() => closeModal()}>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
});

export default ModalSaveEmpleado;
