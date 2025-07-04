/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        'primary': '#2563EB', // Deep blue (primary) - blue-600
        'primary-50': '#EFF6FF', // Light blue (50-level shade) - blue-50
        'primary-100': '#DBEAFE', // Light blue (100-level shade) - blue-100
        'primary-500': '#3B82F6', // Medium blue (500-level shade) - blue-500
        'primary-700': '#1D4ED8', // Dark blue (700-level shade) - blue-700
        'primary-900': '#1E3A8A', // Darker blue (900-level shade) - blue-900

        // Secondary Colors
        'secondary': '#64748B', // Sophisticated slate gray (secondary) - slate-500
        'secondary-50': '#F8FAFC', // Light slate (50-level shade) - slate-50
        'secondary-100': '#F1F5F9', // Light slate (100-level shade) - slate-100
        'secondary-200': '#E2E8F0', // Light slate (200-level shade) - slate-200
        'secondary-300': '#CBD5E1', // Light slate (300-level shade) - slate-300
        'secondary-400': '#94A3B8', // Medium slate (400-level shade) - slate-400
        'secondary-600': '#475569', // Dark slate (600-level shade) - slate-600
        'secondary-700': '#334155', // Darker slate (700-level shade) - slate-700
        'secondary-800': '#1E293B', // Darkest slate (800-level shade) - slate-800

        // Accent Colors
        'accent': '#059669', // Confident emerald green (accent) - emerald-600
        'accent-50': '#ECFDF5', // Light emerald (50-level shade) - emerald-50
        'accent-100': '#D1FAE5', // Light emerald (100-level shade) - emerald-100
        'accent-500': '#10B981', // Medium emerald (500-level shade) - emerald-500
        'accent-700': '#047857', // Dark emerald (700-level shade) - emerald-700

        // Background Colors
        'background': '#FAFAFA', // Warm off-white background - gray-50
        'surface': '#FFFFFF', // Pure white surface - white

        // Text Colors
        'text-primary': '#1E293B', // Rich charcoal primary text - slate-800
        'text-secondary': '#64748B', // Medium gray secondary text - slate-500

        // Status Colors
        'success': '#059669', // Success green - emerald-600
        'success-50': '#ECFDF5', // Light success (50-level shade) - emerald-50
        'success-100': '#D1FAE5', // Light success (100-level shade) - emerald-100

        'warning': '#D97706', // Warm amber warning - amber-600
        'warning-50': '#FFFBEB', // Light warning (50-level shade) - amber-50
        'warning-100': '#FEF3C7', // Light warning (100-level shade) - amber-100

        'error': '#DC2626', // Clear red error - red-600
        'error-50': '#FEF2F2', // Light error (50-level shade) - red-50
        'error-100': '#FEE2E2', // Light error (100-level shade) - red-100

        // Border Colors
        'border': '#E2E8F0', // Neutral border color - slate-200
        'border-light': '#F1F5F9', // Light border color - slate-100
      },
      fontFamily: {
        'sans': ['Inter', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '112': '28rem',
        '128': '32rem',
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'elevation': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
      transitionDuration: {
        '200': '200ms',
        '300': '300ms',
      },
      transitionTimingFunction: {
        'ease-out': 'cubic-bezier(0, 0, 0.2, 1)',
      },
      zIndex: {
        '90': '90',
        '100': '100',
        '200': '200',
        '1000': '1000',
        '1100': '1100',
      },
    },
  },
  plugins: [],
}