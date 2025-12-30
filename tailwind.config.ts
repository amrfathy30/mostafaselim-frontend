import type { Config } from "tailwindcss";

const Config: Config = {
    content:["./src/**/*.{js,ts,jsx,tsx}"],
    theme:{
        extend:{
            fontFamily:{
                'expo':['ExpoArabicBold','sans-serif'],
            },
        },
    },
   plugins: [],
}
export default Config;