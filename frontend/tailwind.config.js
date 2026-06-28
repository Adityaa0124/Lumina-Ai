import typography from '@tailwindcss/typography'

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/**/*.{ts,tsx,js,jsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      colors: {
        background: {
          DEFAULT: '#000000',
          secondary: '#0A0A0A',
          tertiary: '#111111',
        },
        surface: {
          DEFAULT: '#0A0A0A',
          elevated: '#111111',
          hover: '#1A1A1A',
        },
        border: {
          DEFAULT: 'rgba(255,255,255,0.08)',
          strong: 'rgba(255,255,255,0.15)',
        },
        accent: {
          DEFAULT: '#EDEDED',
          hover: '#FFFFFF',
          muted: 'rgba(255,255,255,0.05)',
          foreground: '#000000',
        },
        text: {
          primary: '#EDEDED',
          secondary: '#8A8F98',
          muted: '#52525A',
          disabled: '#333333',
        },
        destructive: {
          DEFAULT: '#E5484D',
          hover: '#FF6166',
          muted: 'rgba(229, 72, 77, 0.15)',
        },
        success: {
          DEFAULT: '#30A46C',
          muted: 'rgba(48, 164, 108, 0.15)',
        },
      },
      borderRadius: {
        sm: '4px',
        DEFAULT: '6px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        '2xl': '24px',
      },
      boxShadow: {
        'glow-accent': '0 0 20px rgba(255,255,255,0.1)',
        'glow-sm': '0 0 10px rgba(255,255,255,0.05)',
        'card': '0 4px 24px -12px rgba(0,0,0,1)',
        'card-hover': '0 8px 32px -12px rgba(0,0,0,1)',
        'dialog': '0 24px 48px rgba(0,0,0,0.8)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-mesh': 'radial-gradient(ellipse 80% 60% at 50% -20%, rgba(255,255,255,0.05), transparent)',
        'gradient-hero': 'radial-gradient(ellipse 100% 80% at 50% 0%, rgba(255,255,255,0.08), transparent 60%)',
        'shimmer': 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.03) 50%, transparent 100%)',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(4px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          from: { opacity: '0', transform: 'scale(0.98)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        'typing-dot': {
          '0%, 60%, 100%': { transform: 'translateY(0)' },
          '30%': { transform: 'translateY(-3px)' },
        },
      },
      animation: {
        shimmer: 'shimmer 2s infinite linear',
        'fade-in': 'fade-in 0.2s ease-out forwards',
        'scale-in': 'scale-in 0.15s ease-out forwards',
        'typing-dot': 'typing-dot 1s infinite ease-in-out',
      },
      typography: {
        invert: {
          css: {
            '--tw-prose-body': '#8A8F98',
            '--tw-prose-headings': '#EDEDED',
            '--tw-prose-lead': '#8A8F98',
            '--tw-prose-links': '#EDEDED',
            '--tw-prose-bold': '#FFFFFF',
            '--tw-prose-counters': '#52525A',
            '--tw-prose-bullets': '#52525A',
            '--tw-prose-hr': 'rgba(255,255,255,0.08)',
            '--tw-prose-quotes': '#EDEDED',
            '--tw-prose-quote-borders': 'rgba(255,255,255,0.15)',
            '--tw-prose-captions': '#52525A',
            '--tw-prose-code': '#EDEDED',
            '--tw-prose-pre-code': '#EDEDED',
            '--tw-prose-pre-bg': '#0A0A0A',
            '--tw-prose-th-borders': 'rgba(255,255,255,0.08)',
            '--tw-prose-td-borders': 'rgba(255,255,255,0.08)',
          },
        },
      },
    },
  },
  plugins: [
    typography,
  ],
}
