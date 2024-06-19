/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            height: {
                "calc-100vh-200px": "calc(100vh - 150px)",
            },
        },
    },
    plugins: [],
};
