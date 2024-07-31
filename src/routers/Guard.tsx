import { toastInfo } from '@/core/helpers/ToastHelper';
import { existsAuthorization, isValidAuthorization } from '@/core/storage/LocalStorageSession';
import { ReactElement, useEffect } from 'react';

import { Navigate } from 'react-router-dom';

interface BaseProps {
	children: ReactElement;
}
export const PrivateOutlet = ({ children }: BaseProps): JSX.Element => {
	const auth = isValidAuthorization();
	const exist = existsAuthorization();

	useEffect(() => {
		if (!auth && exist) {
			toastInfo('Sesion caducada, vuelve a iniciar!');
		}
	}, [auth, exist]);

	if (!exist) return <Navigate to="/login" replace />;
	if (!auth) {
		return <Navigate to="/login" replace />;
	}
	return children;
};
