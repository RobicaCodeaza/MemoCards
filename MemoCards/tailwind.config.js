/** @type {import('tailwindcss').Config} */

import tailwindcssAnimate from 'tailwindcss-animate'
export default {
    content: [
        './pages/**/*.{ts,tsx}',
        './components/**/*.{ts,tsx}',
        './app/**/*.{ts,tsx}',
        './src/**/*.{ts,tsx}',
    ],
    prefix: '',
    theme: {
        fontFamily: {
            sans: 'K2D, sans-serif',
        },
        gridTemplateColumns: {
            decks: 'repeat(auto-fit,35rem)',
        },
        gridTemplateRows: {
            decks: 'repeat(auto-fit,max-content)',
        },
        colors: {
            'neon-carrot': {
                50: '#fff7ed',
                100: '#ffeed4',
                200: '#ffd9a9',
                300: '#ffbd72',
                400: '#fe902d',
                500: '#fd7812',
                600: '#ee5c08',
                700: '#c54409',
                800: '#9c3610',
                900: '#7e2f10',
                950: '#441406',
                'dark-1': '#331d09',
                'dark-2': '#190e04',
            },
            'chateau-green': {
                50: '#f2fbf5',
                100: '#e1f7e8',
                200: '#c5edd1',
                300: '#98ddad',
                400: '#63c582',
                500: '#45bb6a',
                600: '#2e8b4b',
                700: '#276e3e',
                800: '#235834',
                900: '#1f482d',
                950: '#0c2716',
                'dark-1': '#07130b',
            },
            'picton-blue': {
                50: '#f0f9ff',
                75: '#e8f6fc',
                90: '#e5f6fd',
                100: '#e1f2fd',
                150: '#d3effc',
                200: '#bce5fb',
                300: '#81d1f8',
                400: '#50c0f3',
                500: '#15a1e2',
                600: '#0881c1',
                700: '#08679c',
                800: '#0b5781',
                900: '#0f486b',
                950: '#0a2f47',
                'dark-1': '#102631',
                'dark-2': '#081318',
            },
            'mako-grey': {
                50: '#f5f6f6',
                100: '#e5e7e8',
                150: '#d9dadb',
                200: '#cdd0d4',
                250: '#c7c8c9',
                300: '#aab0b6',
                400: '#808890',
                500: '#656d75',
                600: '#565c64',
                700: '#4a4e54',
                800: '#43464b',
                900: '#393b40',
                950: '#242528',
                'dark-1': '#0d0e0f',
                'dark-2': '#070707',
            },
            'backdrop-color': { 50: '#ffffff1a' },
            danger: {
                50: '#fef2f3',
                100: '#ffe1e3',
                200: '#ffc9cc',
                300: '#fea3a9',
                400: '#fb6e77',
                500: '#f3404b',
                600: '#e0222e',
                700: '#c91a25',
                800: '#9c1820',
                900: '#811b21',
                950: '#46090d',
            },
        },

        extend: {
            backgroundImage: {
                'recap-gradient': 'linear-gradient(135deg, #ffe1e3, #ffc9cc)',
            },
            boxShadow: {
                'custom-inset': 'inset 0 2px 4px 0 rgba(31, 38, 135, 0.37)',
                'interior-glow':
                    'inset 0 0 10px 5px rgba(255, 255, 255, 0.3), inset 0 0 20px 10px rgba(255, 255, 255, 0.2), inset 0 0 30px 15px rgba(255, 255, 255, 0.1)',
                'colored-glow':
                    '0 0 20px 0 rgba(67, 185, 105, 0.8), 0 0 40px 0 rgba(67, 185, 105, 0.6), 0 0 60px 0 rgba(67, 185, 105, 0.4), 0 0 80px 0 rgba(67, 185, 105, 0.2)',
                'glow-1': '0 0 15px 5px rgba(251, 110, 119, 0.6)',
                'inset-glow-1': 'inset 0 0 15px 5px rgba(251, 110, 119, 0.6)',
            },
            spacing: {
                'half-minus-arrows': 'calc(50% - 2.5rem)',
            },

            screens: {
                phone: '37.5em',
                'tab-port': '56.25em',
                'tab-land': '75em',
                'particular-small-laptop': '98.5em',
                laptop: '112.5em',
                'big-desktop': '120em',
            },
            keyframes: {
                'accordion-down': {
                    from: { height: '0' },
                    to: { height: 'var(--radix-accordion-content-height)' },
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: '0' },
                },
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
            },
        },
    },

    plugins: [tailwindcssAnimate],
}
