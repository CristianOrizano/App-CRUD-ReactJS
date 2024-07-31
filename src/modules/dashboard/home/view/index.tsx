import { LocalStorageSession } from '@/core/storage';
import LoginResponse from '@/modules/auth/sign-in/domain/LoginResponse';
import Navbar from '@/modules/shared/navbar/Navbar';

const index = () => {
	const usuario: LoginResponse = LocalStorageSession.getAuthorization();
	return (
		<>
			<Navbar />
			<div className="container">
				<div className="mt-5">
					<h1>
						<span className="fw-bold text-secondary">Bienvenido</span>: {usuario.usuario.nombre}{' '}
						{usuario.usuario.apellido}
					</h1>
					<h4>
						<span className="fw-bold text-secondary">Correo</span>: {usuario.usuario.email}
					</h4>
				</div>
			</div>
		</>
	);
};

export default index;
