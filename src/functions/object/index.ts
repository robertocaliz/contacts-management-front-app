/* eslint-disable @typescript-eslint/no-explicit-any */

type ObjectChangedProps = {
	originalObj: Record<string, any>;
	newObj: Record<string, any>;
};

export const objChanged = ({ originalObj, newObj }: ObjectChangedProps) => {
	const keys = Object.keys(originalObj);
	for (const key of keys) {
		if (originalObj[key] !== newObj[key]) {
			return true;
		}
	}
	return false;
};
