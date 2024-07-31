import { LocalStorageSession } from '@/core/storage';
import { faCpanel } from '@fortawesome/free-brands-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink, useNavigate } from 'react-router-dom';

const Navbar = () => {
	const navigate = useNavigate();
	const cerrarSesion = (e: { preventDefault: () => void }): void => {
		e.preventDefault();
		LocalStorageSession.removeAuthorization();
		navigate('/login');
	};

	return (
		<>
			<header>
				<div className="px-3 py-2 bg-dark text-white">
					<div className="container">
						<div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
							<a
								href="/"
								className="d-flex align-items-center my-2 my-lg-0 me-lg-auto text-white text-decoration-none"
							>
								<FontAwesomeIcon icon={faCpanel} size="4x" />
								<span className="fw-bolder">Kiss</span>
							</a>

							<ul className="nav col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small">
								<li>
									<NavLink
										to="/home"
										className={({ isActive }) =>
											isActive ? 'nav-link text-info active-link' : 'nav-link text-white'
										}
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="24"
											height="24"
											fill="currentColor" // Use currentColor for inheriting text color
											className="bi d-block mx-auto mb-1"
											viewBox="0 0 16 16"
										>
											<path d="M7.293 1.5a1 1 0 0 1 1.414 0L11 3.793V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v3.293l2.354 2.353a.5.5 0 0 1-.708.708L8 2.207l-5 5V13.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 2 13.5V8.207l-.646.647a.5.5 0 1 1-.708-.708z" />
											<path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m1.679-4.493-1.335 2.226a.75.75 0 0 1-1.174.144l-.774-.773a.5.5 0 0 1 .708-.707l.547.547 1.17-1.951a.5.5 0 1 1 .858.514" />
										</svg>
										Inicio
									</NavLink>
								</li>
								<li>
									<NavLink
										to="/empleado"
										className={({ isActive }) =>
											isActive ? 'nav-link text-info active-link' : 'nav-link text-white'
										}
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="24"
											height="24"
											fill="currentColor"
											className="bi d-block mx-auto mb-1"
											viewBox="0 0 16 16"
										>
											<path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5" />
										</svg>
										Empleado
									</NavLink>
								</li>
								<li>
									<a href="#" className="nav-link text-white">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="24"
											height="24"
											fill="currentColor"
											className="bi d-block mx-auto mb-1"
											viewBox="0 0 16 16"
										>
											<path d="M3 2v4.586l7 7L14.586 9l-7-7zM2 2a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 2 6.586z" />
											<path d="M5.5 5a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1m0 1a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3M1 7.086a1 1 0 0 0 .293.707L8.75 15.25l-.043.043a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 0 7.586V3a1 1 0 0 1 1-1z" />
										</svg>
										Categoria
									</a>
								</li>
								<li>
									<button
										type="button"
										className="btn btn-outline-danger mt-3 mx-5"
										onClick={e => cerrarSesion(e)}
									>
										Logout
									</button>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</header>
		</>
	);
};

export default Navbar;
