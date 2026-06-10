/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#154212',
          container: '#2d5a27',
          light: '#1a5415',
        },
        secondary: {
          DEFAULT: '#daa520',
          container: '#ffdc8c',
          light: '#795f1c',
        },
        surface: {
          DEFAULT: '#fbf9f5',
          'container-lowest': '#ffffff',
          'container-low': '#f5f3ef',
          'container': '#efede9',
          'container-high': '#eae8e4',
          'container-highest': '#e4e2de',
        },
        'on-surface': '#1b1c1a',
        'on-primary': '#ffffff',
        'on-secondary-container': '#795f1c',
        tertiary: '#2d3c3b',
        outline: {
          DEFAULT: '#73796e',
          variant: '#c2c9bb',
        },
      },
      fontFamily: {
        serif: ['Noto Serif', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-lg': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-md': ['2.8rem', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
        'headline-lg': ['2rem', { lineHeight: '1.3' }],
        'headline-md': ['1.75rem', { lineHeight: '1.35' }],
        'headline-sm': ['1.5rem', { lineHeight: '1.4' }],
        'title-lg': ['1.375rem', { lineHeight: '1.45' }],
        'title-md': ['1rem', { lineHeight: '1.5', letterSpacing: '0.01em' }],
        'body-lg': ['1rem', { lineHeight: '1.75' }],
        'body-md': ['0.875rem', { lineHeight: '1.7' }],
        'label-lg': ['0.875rem', { lineHeight: '1.4', letterSpacing: '0.05em' }],
        'label-md': ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.05em' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
      },
      borderRadius: {
        'DEFAULT': '0.25rem',
      },
      boxShadow: {
        'tincture': '0 10px 30px rgba(27, 28, 26, 0.05)',
        'tincture-lg': '0 15px 40px rgba(27, 28, 26, 0.08)',
        'ambient': '0 4px 20px rgba(27, 28, 26, 0.03)',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out',
        'slide-up': 'slideUp 0.8s ease-out',
        'slide-in-left': 'slideInLeft 0.8s ease-out',
        'slide-in-right': 'slideInRight 0.8s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
