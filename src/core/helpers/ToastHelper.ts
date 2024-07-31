import { ToastOptions, toast } from 'react-toastify';

const config: ToastOptions = {
	position: 'top-right',
	autoClose: 5000,
	theme: 'dark',
	style: {
		//fontWeight: 'bold',
		color: 'white', // Establece la propiedad fontWeight en 'bold' para negrita
	},
};
const toastFire = (message: string, options: ToastOptions): void => {
	toast(message, options);
};

const toastInfo = (message: string, autoClose?: number): void => {
	const currentOptions = Object.assign(config, {});
	currentOptions.autoClose = autoClose ?? config.autoClose;

	toast.info(message, currentOptions);
};
export { toastFire, toastInfo };
