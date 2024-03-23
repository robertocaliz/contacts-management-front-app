//
export const MZPhoneNumber = {
    format: (phoneNumber: string) => {
        const chunks = [];
        chunks[0] = '+258';
        chunks[1] = phoneNumber.slice(0, 2);
        chunks[2] = phoneNumber.slice(2, 5);
        chunks[3] = phoneNumber.slice(5, 9);
        return chunks.join(' ');
    },
    normalize: (phoneNumber: string) => {
        const chunks = phoneNumber.split(/\s/);
        chunks.shift();
        return chunks.join('');
    },
};
