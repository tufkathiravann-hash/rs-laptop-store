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
        titanium: {
          950: '#020202', // Jet black canvas
          900: '#090909', // Dark obsidian card background
          850: '#111111', // Elevated dark surface
          800: '#161616', // Slate carbon border/hover
          700: '#222222', // Charcoal borders
          600: '#333333', // Mid graphite
          500: '#555555', // Muted steel
        },
        cyber: {
          cyan: '#FF0033', // Primary Crimson Red (powers all interactive highlights)
          red: '#FF0033',
          crimson: '#E50914',
          ruby: '#991B1B',
          white: '#FFFFFF',
          purple: '#FF2A4D',
          emerald: '#10B981',
          amber: '#F59E0B',
          rose: '#FF0033',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Space Grotesk', 'Outfit', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'cyber-glow': 'radial-gradient(circle at 50% 0%, rgba(255, 0, 51, 0.22), transparent 70%)',
        'red-glow': 'radial-gradient(circle at 50% 0%, rgba(255, 0, 51, 0.3), transparent 70%)',
        'white-glow': 'radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 0.15), transparent 70%)',
        'purple-glow': 'radial-gradient(circle at 50% 0%, rgba(255, 42, 77, 0.2), transparent 70%)',
      },
      boxShadow: {
        'neon-cyan': '0 0 25px -2px rgba(255, 0, 51, 0.55)',
        'neon-red': '0 0 30px -2px rgba(255, 0, 51, 0.65)',
        'neon-white': '0 0 25px -2px rgba(255, 255, 255, 0.4)',
        'neon-purple': '0 0 25px -2px rgba(255, 42, 77, 0.5)',
        'glass-card': '0 8px 32px 0 rgba(0, 0, 0, 0.7)',
        'inner-glow': 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.15)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}
