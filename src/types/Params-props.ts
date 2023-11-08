import { Id } from '.';

export type ParamsProps = {
	params: {
		id: Id;
		email: string;
		activationToken: string;
		recoveryToken: string;
	}
};