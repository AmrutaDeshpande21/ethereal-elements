import React from 'react';

const WavyDivider = ({ color = 'pastel', flip = false }) => {
    const getGradient = () => {
        switch (color) {
            case 'pink-purple':
                return { start: '#FFB3D9', end: '#D4A5E8' };
            case 'purple-blue':
                return { start: '#D4A5E8', end: '#A8D8EA' };
            case 'pastel':
            default:
                return { start: '#E6E6FA', end: '#FFB3D9' };
        }
    };

    const gradient = getGradient();
    const transform = flip ? 'scaleY(-1)' : 'none';

    return (
        <div className="w-full overflow-hidden leading-none" style={{ transform }}>
            <svg
                className="relative block w-full h-12 md:h-16"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1200 120"
                preserveAspectRatio="none"
            >
                <defs>
                    <linearGradient id={`gradient-${color}`} x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" style={{ stopColor: gradient.start, stopOpacity: 1 }} />
                        <stop offset="100%" style={{ stopColor: gradient.end, stopOpacity: 1 }} />
                    </linearGradient>
                </defs>
                <path
                    d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                    fill={`url(#gradient-${color})`}
                />
            </svg>
        </div>
    );
};

export default WavyDivider;
