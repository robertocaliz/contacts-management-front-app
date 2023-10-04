import { ToastOptions, toast } from 'react-toastify';


const toastOptions: ToastOptions = {
	position: 'top-right',
	autoClose: 5000,
	hideProgressBar: true,
	closeOnClick: true,
	pauseOnHover: true,
	draggable: true,
	progress: undefined,
};


function success(message: string) {
	return toast.success(message, {
		theme: 'light',
		...toastOptions
	});
}


function error(message: string) {
	return toast.error(message, {
		theme: 'colored',
		...toastOptions
	});
}

const Alerts = {
	success,
	error
};

export default Alerts; 