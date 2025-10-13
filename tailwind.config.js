/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{css,xml,html,vue,svelte,ts,tsx}'],
  // use the .ns-dark class to control dark mode (applied by NativeScript) - since 'media' (default) does not work on NativeScript
  darkMode: ['class', '.ns-dark'],
  theme: {
    extend: {
      colors: {
        // OrbitRate 品牌色
        primary: {
          DEFAULT: '#6366f1',
          dark: '#4f46e5',
          light: '#818cf8',
        },
        accent: {
          DEFAULT: '#10b981',
          dark: '#059669',
          light: '#34d399',
        },
        // 背景色
        bg: {
          primary: '#09090b',
          secondary: '#18181b',
          tertiary: '#27272a',
        },
        // 文字色
        text: {
          primary: '#fafafa',
          secondary: '#a1a1aa',
          tertiary: '#71717a',
          muted: '#52525b',
        },
      },
      fontFamily: {
        // 使用系统字体
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto'],
        mono: ['Menlo', 'Monaco', 'Courier New', 'monospace'],
      },
      spacing: {
        page: '24',
        section: '32',
        card: '16',
      },
      borderRadius: {
        card: '16',
        button: '12',
        input: '12',
      },
    },
  },
  plugins: [
    // add custom variants for platform-specific styling
    require('tailwindcss/plugin')(function ({ addVariant }) {
      addVariant('android', '.ns-android &')
      addVariant('ios', '.ns-ios &')
    }),
  ],
  corePlugins: {
    preflight: false, // disables browser-specific resets
  },
}


