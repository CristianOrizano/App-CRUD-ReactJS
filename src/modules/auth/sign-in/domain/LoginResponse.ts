import { UsuarioResponse } from '../../sign-up/domain/UsuarioResponse';

export default interface LoginResponse {
	token: string;
	usuario: UsuarioResponse;
	expiresAt: string;
}
