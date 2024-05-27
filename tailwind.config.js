/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors: {
      main: {
        DEFAULT: '#3B4A96',
        text: '#373530',
      },
      secondary: {
        DEFAULT: '#244F92',
        text: '#A8B7CC',
        gray: '#7D7C78',
      },
      white: '#FFFFFF',
      lightGray: '#E6E6E6',
      gray: '#BFBFBF',
      semiDarkGray: '#F9FAFB',
      darkGray: '#808080',
      error: '#FF4444',
      link: '#007AC5',
      blue: '#EDEFF3',
    },
    extend: {
      fontFamily: {
        'hse-sans': 'HSESans',
        'hse-slab': 'HSESlab',
      },
    },
  },
  plugins: [],
};
