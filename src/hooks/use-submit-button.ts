import { useState } from 'react';



type UseSubmitButtonProps = {
	disable?: boolean;
	runSpinner?: boolean;
}


export const useSubmitButton = (params?: UseSubmitButtonProps) => {

	const [runSpinner, setRunSpinner] = useState(params?.runSpinner ?? false);
	const [disable, setDisable] = useState(params?.disable ?? false);


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