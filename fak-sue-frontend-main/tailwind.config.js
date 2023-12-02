/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                'kanit': ['Kanit'],
                'noto-sans': ['Noto Sans Thai', 'sans-serif']
            }
        }
    },
    plugins: [require('tailwind-scrollbar-hide')]
}
