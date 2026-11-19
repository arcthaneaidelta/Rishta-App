/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Backgrounds
        'warm-bg': '#F7F8F5',
        'soft-bg': '#F0F2EE',
        'surface': '#FFFFFF',
        
        // Primary text
        'charcoal': '#202722',
        'charcoal-muted': '#747C76',
        'charcoal-light': '#9CA3AF',
        
        // Forest green brand
        'forest': {
          50: '#F2F7F4',
          100: '#E8F0EA',
          200: '#C5DDD0',
          300: '#95C2AD',
          400: '#5F9F83',
          500: '#39785C', // Secondary green
          600: '#245C45', // Primary forest green
          700: '#1C4A37',
          800: '#15382A',
          900: '#0E261D',
        },
        
        // Supporting
        'sand': '#E9E2D5',
        'sand-light': '#F4F0E7',
        'gold': '#B69A60',
        'gold-light': '#FAF5EB',
        'blue-grey': '#E9EFF1',
        'blue-grey-dark': '#5A6B7C',
        
        // Status colors
        'status-win': '#245C45',
        'status-win-bg': '#E8F5E9',
        'status-loss': '#A93226',
        'status-loss-bg': '#FDEDEC',
        'status-draw': '#B7791F',
        'status-draw-bg': '#FEF3C7',
        'status-pending': '#5A6B7C',
        'status-pending-bg': '#E9EFF1',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Manrope', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(0, 0, 0, 0.04), 0 1px 2px -1px rgba(0, 0, 0, 0.04)',
        'card': '0 2px 8px -2px rgba(32, 39, 34, 0.06), 0 1px 3px 0 rgba(32, 39, 34, 0.04)',
        'elevated': '0 10px 25px -5px rgba(32, 39, 34, 0.08), 0 8px 10px -6px rgba(32, 39, 34, 0.04)',
        'modal': '0 20px 40px -15px rgba(32, 39, 34, 0.16)',
      },
      borderRadius: {
        'card': '14px',
        'panel': '18px',
      },
    },
  },
  plugins: [],
}
