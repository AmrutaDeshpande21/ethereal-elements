/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'pastel-pink': '#FFB3D9',
                'pastel-purple': '#D4A5E8',
                'pastel-blue': '#A8D8EA',
                'pastel-lavender': '#E6E6FA',
                'gradient-pink': '#FF9ECD',
                'gradient-purple': '#C084FC',
                'gradient-blue': '#93C5FD',
                'dark-grey': '#6B7280',
            },
            backgroundImage: {
                'gradient-pastel': 'linear-gradient(135deg, #FFB3D9 0%, #D4A5E8 50%, #A8D8EA 100%)',
                'gradient-pink-purple': 'linear-gradient(135deg, #FFB3D9 0%, #D4A5E8 100%)',
                'gradient-purple-blue': 'linear-gradient(135deg, #D4A5E8 0%, #A8D8EA 100%)',
                'gradient-soft': 'linear-gradient(135deg, #E6E6FA 0%, #FFB3D9 50%, #A8D8EA 100%)',
            },
            borderRadius: {
                'wavy': '30% 70% 70% 30% / 30% 30% 70% 70%',
                'wavy-alt': '70% 30% 30% 70% / 70% 70% 30% 30%',
            },
            boxShadow: {
                'pastel': '0 4px 20px rgba(255, 179, 217, 0.3)',
                'pastel-lg': '0 10px 40px rgba(212, 165, 232, 0.4)',
                'glow': '0 0 20px rgba(168, 216, 234, 0.5)',
            },
            backdropBlur: {
                'xs': '2px',
            },
            animation: {
                'wave': 'wave 3s ease-in-out infinite',
                'float': 'float 6s ease-in-out infinite',
                'fade-in': 'fadeIn 0.8s ease-in',
                'slide-up': 'slideUp 0.6s ease-out',
            },
            keyframes: {
                wave: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(30px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
            },
        },
    },
    plugins: [],
}
