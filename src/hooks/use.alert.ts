'use client';

import { useState } from 'react';

type AlertType =
	| 'primary'
	| 'secondary'
	| 'success'
	| 'danger'
	| 'warning'
	| 'info'
	| 'light'
	| 'dark';

type ConfigAlertProps = {
	alertType: AlertType;
	alertMessage: string;
};

const useAlert = () => {
	const [alertType, setAlertType] = useState<AlertType>();
	const [alertMessage, setAlertMessage] = useState<string>();
	const [showAlert, setShowAlert] = useState(false);

	const alert = {
		config: ({ alertType, alertMessage }: ConfigAlertProps) => {
			setAlertType(alertType);
			setAlertMessage(alertMessage);

			return {
				show: () => setShowAlert(true),
			};
		},
		hide: () => {
			setShowAlert(false);
		},
		show(alertType: AlertType, alertMessage: string) {
			this.config({ alertType, alertMessage }).show();
		},
	};

	return {
		alertType,
		alertMessage,
		showAlert,
		alert,
	};
};

export default useAlert;
