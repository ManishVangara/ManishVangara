import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                // We can add custom colors here later if needed for the "premium" look
            },
            fontFamily: {
                // We can add custom fonts here
            }
        },
    },
    plugins: [
        typography,
    ],
}
