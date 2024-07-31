import login from '@/core/imagenes/login.png';
import '../view/style/login.css';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import LoginRequest from '../domain/LoginRequest';
import * as Yup from 'yup';
import useLogin from '../application/useLogin';
import LoginResponse from '../domain/LoginResponse';
import { AxiosError } from 'axios';
import Swal from 'sweetalert2';
import { LocalStorageSession } from '@/core/storage';
import { SyncLoader } from 'react-spinners';
import { useState } from 'react';

interface DataMessage {
	error: string;
}
const Index = () => {
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const formik = useFormik<LoginRequest>({
		initialValues: {
			email: '',
			password: '',
		},
		validationSchema: Yup.object({
			email: Yup.string()
				.email('Email no es válido')
				.matches(/^[^\s@]+@[^\s@]+\.(com)$/, 'El email debe terminar en .com')
				.required('email es requerido'),
			password: Yup.string().required('Password es requerido'),
		}),
		onSubmit: (values: LoginRequest) => {
			console.log('Values: ', values);
			void loginAuth(values);
		},
	});
	// React Query
	const { mutateAsync } = useLogin();
	// Methods
	const loginAuth = async (payload: LoginRequest): Promise<void> => {
		try {
			const response: LoginResponse = await mutateAsync(payload);

			LocalStorageSession.saveAuthorization(response);
			setLoading(true);
			setTimeout(() => {
				setLoading(false);
				navigate('/home');
			}, 3000); // Esperar 3 segundos
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
			<div className="container d-flex align-items-center justify-content-center min-vh-100">
				<div className="row justify-content-center ">
					<div className="col-md-8">
						<div className="card shadow-lg p-3 mb-5 bg-body rounded ">
							<div className="row g-0 ">
								<div className="col-md-6 bg-gradient-custom d-none d-lg-block">
									<img
										src={login}
										className="img-fluid rounded-start"
										alt="Login"
										style={{
											width: '1000px',
											height: '500px',
										}}
									/>
								</div>
								<div className="col-md-6 ">
									<div className="card-body ">
										<h1 className="card-title fw-bold text-center mb-4 gradient-text">Sign In</h1>
										<div className="form-floating mb-3">
											<input
												type="email"
												className="form-control"
												id="floatingInput"
												name="email"
												placeholder="name@example.com"
												value={formik.values.email}
												onChange={formik.handleChange}
											/>
											<label htmlFor="floatingInput">Email</label>
											{(formik.touched.email ?? false) && formik.errors.email != null && (
												<small className="text-danger">{formik.errors.email}</small>
											)}
										</div>
										<div className="form-floating  mb-4">
											<input
												type="password"
												name="password"
												className="form-control"
												id="floatingPassword"
												placeholder="Password"
												value={formik.values.password}
												onChange={formik.handleChange}
											/>
											<label htmlFor="floatingPassword">Password</label>
											{(formik.touched.password ?? false) && formik.errors.password != null && (
												<small className="text-danger">{formik.errors.password}</small>
											)}
										</div>
										<div className="d-grid gap-2">
											<button
												className="btn btn-primary"
												onClick={() => {
													formik.handleSubmit();
												}}
												type="button"
											>
												Iniciar sesion
											</button>
										</div>

										<p className="text-center mt-4">
											¿No tienes una cuenta?{' '}
											<a
												style={{ cursor: 'pointer' }}
												onClick={() => navigate('/sign-up')}
												className="link-primary"
											>
												Regístrate aquí
											</a>
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				{loading && (
					<div className="spinner-overlay">
						<SyncLoader size={25} color="#F0F3F4" loading={loading} />
					</div>
				)}
			</div>
		</>
	);
};

export default Index;
