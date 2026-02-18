/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class', // Enable class-based dark mode
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                display: ['Outfit', 'system-ui', 'sans-serif'],
            },
            colors: {
                primary: {
                    50: '#A7EBF2',
                    100: '#A7EBF2',
                    200: '#54ACBF',
                    300: '#54ACBF',
                    400: '#26658C',
                    500: '#26658C',
                    600: '#023859',
                    700: '#023859',
                    800: '#011C40',
                    900: '#011C40',
                },

            },
            borderRadius: {
                '4xl': '2rem',
            },
        },
    },
    plugins: [],
}
