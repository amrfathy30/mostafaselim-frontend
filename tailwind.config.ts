
import type { Config } from 'tailwindcss'
import colors from 'tailwindcss/colors';

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // fontFamily: {
      //   'expo': ['ExpoArabicBold', 'sans-serif'],
      // },
      // colors: {
      //   ...colors,
      //   'primary': '#1da1f2',
      // },
    },
  },
  plugins: [],
}
export default config;