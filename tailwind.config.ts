import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#0F0A1E',
          2: '#150E2B',
          card: '#1E1535',
        },
        white: '#F2F0EB',
        dim: '#9590A8',
        accent: {
          DEFAULT: '#7C3AED',
          2: '#7DF9C0',
          3: '#C8F135',
        },
        danger: '#FF4545',
        border: 'rgba(255,255,255,0.08)',
      },
      fontFamily: {
        display: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
        body: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      borderRadius: {
        card: '12px',
        pill: '100px',
        input: '4px',
      },
      spacing: {
        section: '160px',
        'section-sm': '120px',
        'section-xs': '80px',
        'section-mobile': '64px',
      },
    },
  },
  plugins: [],
};
export default config;
