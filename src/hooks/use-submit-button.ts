import { useState } from 'react';


export const useSubmitButton = () => {

	const [runSpinner, setRunSpinner] = useState(false);
	const [disable, setDisable] = useState(false);


	return {
		spinner: {
			runSpinner,
			setRunSpinner
		},
		button: {
			disable,
			setDisable
		}
	};

};