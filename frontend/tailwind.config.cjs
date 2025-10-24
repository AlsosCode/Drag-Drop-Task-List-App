/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // macOS-inspired color palette (light and dark)
        macos: {
          // Light mode
          bg: '#f5f5f7',
          'bg-secondary': '#ffffff',
          border: '#d2d2d7',
          'border-light': '#e5e5ea',
          text: '#1d1d1f',
          'text-secondary': '#6e6e73',

          // Dark mode
          'dark-bg': '#1c1c1e',
          'dark-bg-secondary': '#2c2c2e',
          'dark-border': '#38383a',
          'dark-border-light': '#48484a',
          'dark-text': '#ffffff',
          'dark-text-secondary': '#98989d',

          // Universal colors
          blue: '#2997ff',
          'blue-hover': '#409eff',
          red: '#ff3b30',
          green: '#34c759',
          yellow: '#ffcc00',
          shadow: 'rgba(0, 0, 0, 0.1)',
          'dark-shadow': 'rgba(0, 0, 0, 0.3)',
        },
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Text', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      },
      borderRadius: {
        'macos': '10px',
        'macos-lg': '14px',
      },
      boxShadow: {
        'macos': '0 2px 8px rgba(0, 0, 0, 0.08)',
        'macos-hover': '0 4px 16px rgba(0, 0, 0, 0.12)',
        'macos-drag': '0 8px 24px rgba(0, 0, 0, 0.15)',
      },
      backdropBlur: {
        'macos': '20px',
      },
    },
  },
  plugins: [],
};
