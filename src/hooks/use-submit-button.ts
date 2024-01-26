import { useState } from 'react';

type UseSubmitButtonProps = {
	disable?: boolean;
	runSpinner?: boolean;
};

export const useSubmitButton = (params?: UseSubmitButtonProps) => {
	const [runSpinner, setRunSpinner] = useState(params?.runSpinner ?? false);
	const [disable, setDisable] = useState(params?.disable ?? false);

	const submitButton = Object.freeze({
		buttonState: { runSpinner, disable },
		submitButton: {
			runSpinner: () => setRunSpinner(true),
			interruptSpinner: () => setRunSpinner(false),
			disable: () => setDisable(true),
			enable: () => setDisable(false),
		},
		stateHandler: {
			setRunSpinner,
			setDisable,
		},
	});

	return submitButton;
};
