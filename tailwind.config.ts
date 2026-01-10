
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      'sm': '640px',   // Mobile & Small Tablets
      'md': '768px',   // Standard Tablets (Portrait)
      'lg': '1280px',  // 13" to 14" Laptops
      'xl': '1440px',  // 14" to 15" Laptops
      'xxl': '1600px', // 15" Laptops and Desktops
    },
    extend: {
    },
  },
  plugins: [],
}
export default config;
