import { useFormik } from 'formik';

import { Col, Form, Row } from 'react-bootstrap';
import { UsuarioRequest } from '../domain/UsuarioRequest';
import * as Yup from 'yup';
import useRegister from '../application/useRegister';
import Swal from 'sweetalert2';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import sign from '@/core/imagenes/signup.png';

interface DataMessage {
	error: string;
}
const Index = () => {
	const navigate = useNavigate();
	const formik = useFormik<UsuarioRequest>({
		initialValues: {
			nombre: '',
			apellido: '',
			email: '',
			password: '',
		},
		validationSchema: Yup.object({
			nombre: Yup.string()
				.required('Nombre es requerido')
				.min(3, 'Nombre debe tener al menos 3 caracteres'),
			apellido: Yup.string()
				.required('Apellido es requerido')
				.min(3, 'Apellido debe tener al menos 3 caracteres'),
			email: Yup.string().email('Email no es válido').required('Email es requerido'),
			password: Yup.string().required('Password es requerido'),
		}),
		onSubmit: (values: UsuarioRequest) => {
			console.log('Values: ', values);
			void register(values);
		},
	});
	// React Query
	const { mutateAsync } = useRegister();
	const register = async (payload: UsuarioRequest): Promise<void> => {
		try {
			await mutateAsync(payload);

			navigate('/login');
			Swal.fire({
				icon: 'success',
				title: 'Correcto',
				text: 'Exito al registrar',
			});
		} catch (error) {
			const err = error as AxiosError;
			const data = err?.response?.data as DataMessage;

			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: `${data.error}`,
			});
		}
	};

	return (
		<>
			<div className="container">
				<div className="row justify-content-center mt-5 ">
					<div className="col-md-5">
						<div className="card shadow-lg p-3 mb-5 bg-body rounded">
							<div className="card-body">
								<img className="mx-auto d-block" src={sign} width={100} />

								<h1 className="text-center fw-bold">Sign Up</h1>
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
											<Form.Group className="mb-3" controlId="validationCustom02">
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
											<Form.Group className="mb-3" controlId="validationCustom03">
												<Form.Label>Email</Form.Label>
												<Form.Control
													type="text"
													placeholder="Ingrese Email"
													name="email"
													value={formik.values.email}
													onChange={formik.handleChange}
													isInvalid={formik.touched.email && !!formik.errors.email}
													isValid={formik.touched.email && !formik.errors.email}
												/>
												<Form.Control.Feedback type="invalid">
													{formik.errors.email}
												</Form.Control.Feedback>
											</Form.Group>
											<Form.Group className="mb-3" controlId="validationCustom04">
												<Form.Label>Password</Form.Label>
												<Form.Control
													type="password"
													placeholder="Ingrese Password"
													name="password"
													value={formik.values.password}
													onChange={formik.handleChange}
													isInvalid={formik.touched.password && !!formik.errors.password}
													isValid={formik.touched.password && !formik.errors.password}
												/>
												<Form.Control.Feedback type="invalid">
													{formik.errors.password}
												</Form.Control.Feedback>
											</Form.Group>
											<div className="d-grid gap-2 mt-5">
												<button className="btn btn-primary" type="submit">
													Registrar
												</button>
												<button
													className="btn btn-info"
													type="button"
													onClick={() => navigate('/login')}
												>
													Iniciar sesion
												</button>
											</div>
										</Col>
									</Row>
								</Form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Index;
