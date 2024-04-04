/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
    content: ['./src/components/**/*.{ts,tsx}', './src/app/**/*.{ts,tsx}'],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                dark: '#232A3C',
                medium: '#293245',
            },
        },
    },
    plugins: [],
};
