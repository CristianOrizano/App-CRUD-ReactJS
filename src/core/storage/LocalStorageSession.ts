import LoginResponse from '@/modules/auth/sign-in/domain/LoginResponse';
import moment from 'moment';

const STORAGE_OF_AUTHORIZATION = 'STORAGE_OF_AUTHORIZATION_APP';

export const saveAuthorization = (payload: LoginResponse): void => {
	localStorage.setItem(STORAGE_OF_AUTHORIZATION, JSON.stringify(payload));
};

export const getAuthorization = (): LoginResponse => {
	const data = localStorage.getItem(STORAGE_OF_AUTHORIZATION);
	if (data == null) throw new Error('Required Login');
	return JSON.parse(data);
};

export const removeAuthorization = (): void => {
	localStorage.removeItem(STORAGE_OF_AUTHORIZATION);
};

export const existsAuthorization = (): boolean => {
	const data = localStorage.getItem(STORAGE_OF_AUTHORIZATION);
	if (data != null) return true;
	return false;
};

export const isValidAuthorization = (): boolean => {
	const data = localStorage.getItem(STORAGE_OF_AUTHORIZATION);

	if (data == null) return false;

	const user: LoginResponse = JSON.parse(data);

	if (user?.expiresAt.length === 0) return false;
	// Convierte la fecha al formato ISO
	const format = 'DD-MM-YYYY HH:mm:ss';
	const expireOn = moment(user.expiresAt, format).toDate();
	//const expireOn = new Date(user.expiresAt);
	const currentDate = new Date();
	return expireOn > currentDate;
};
