import React from 'react';

// For SVG icons
export interface IconProps extends React.SVGProps<SVGSVGElement> {
    size?: number | string;
    className?: string;
}

export const TikTokIcon = ({ size = 28, className, ...props }: IconProps) => (
    <svg 
        width={size} 
        height={size} 
        viewBox="0 0 28 28" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        {...props}
    >
        <path fillRule="evenodd" clipRule="evenodd" d="M27.3438 3.86101C27.3438 1.72864 25.6151 0 23.4827 0H3.86101C1.72864 0 0 1.72864 0 3.86101V23.4827C0 25.6151 1.72864 27.3438 3.86101 27.3438H23.4827C25.6151 27.3438 27.3438 25.6151 27.3438 23.4827V3.86101ZM22.6529 11.9258C20.8887 11.9456 19.2448 11.4122 17.8015 10.4244V17.3586C17.8015 20.4404 15.6919 23.0878 12.7089 23.7792C8.63916 24.7077 5.19398 21.7642 4.75945 18.2477C4.30507 14.7312 6.5478 11.6493 9.98525 10.9578C10.6569 10.8196 11.6672 10.8196 12.1884 10.9381V14.6521C12.028 14.6127 11.8779 14.5732 11.7198 14.5534C10.3764 14.3163 9.07532 14.988 8.54191 16.2128C8.00854 17.4378 8.36555 18.8601 9.45208 19.6899C10.3608 20.4011 11.3691 20.4998 12.3963 20.0256C13.4237 19.5714 13.9758 18.7416 14.0942 17.6156C14.114 17.4576 14.1129 17.2797 14.1129 17.1019V3.76681C14.1129 3.39148 14.1158 3.40785 14.4912 3.40785H17.4348C17.6521 3.40785 17.7312 3.43913 17.7509 3.69609C17.9089 5.98773 19.6488 7.93939 21.8811 8.23577C22.1182 8.27524 22.3722 8.2909 22.6529 8.31062V11.9258Z" fill="currentColor"/>
    </svg>
);

export const Facebook = ({ size = 28, className, ...props }: IconProps) => (
    <svg 
        width={size} 
        height={size} 
        viewBox="0 0 30 30" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        {...props}
    >
        <path d="M29.1667 14.5833C29.1667 6.53333 22.6333 0 14.5833 0C6.53333 0 0 6.53333 0 14.5833C0 21.6417 5.01667 27.5187 11.6667 28.875V18.9583H8.75V14.5833H11.6667V10.9375C11.6667 8.12292 13.9563 5.83333 16.7708 5.83333H20.4167V10.2083H17.5C16.6979 10.2083 16.0417 10.8646 16.0417 11.6667V14.5833H20.4167V18.9583H16.0417V29.0938C23.4062 28.3646 29.1667 22.1521 29.1667 14.5833Z" fill="currentColor"/>
    </svg>
);

export const Instagram = ({ size = 28, className, ...props }: IconProps) => (
    <svg 
        width={size} 
        height={size} 
        viewBox="0 0 28 28" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        {...props}
    >
        <path fillRule="evenodd" clipRule="evenodd" d="M0 12.3333C0 6.51971 -1.83781e-07 3.61212 1.80683 1.80683C3.61367 0.00154155 6.51971 0 12.3333 0H15.4167C21.2303 0 24.1379 -1.83781e-07 25.9432 1.80683C27.7485 3.61367 27.75 6.51971 27.75 12.3333V15.4167C27.75 21.2303 27.75 24.1379 25.9432 25.9432C24.1363 27.7485 21.2303 27.75 15.4167 27.75H12.3333C6.51971 27.75 3.61212 27.75 1.80683 25.9432C0.00154155 24.1363 0 21.2303 0 15.4167V12.3333ZM23.125 6.9375C23.125 7.55081 22.8814 8.13901 22.4477 8.57268C22.014 9.00636 21.4258 9.25 20.8125 9.25C20.1992 9.25 19.611 9.00636 19.1773 8.57268C18.7436 8.13901 18.5 7.55081 18.5 6.9375C18.5 6.32419 18.7436 5.73599 19.1773 5.30232C19.611 4.86864 20.1992 4.625 20.8125 4.625C21.4258 4.625 22.014 4.86864 22.4477 5.30232C22.8814 5.73599 23.125 6.32419 23.125 6.9375ZM16.9583 15.4167C16.9583 16.2344 16.6335 17.0187 16.0552 17.5969C15.477 18.1751 14.6928 18.5 13.875 18.5C13.0572 18.5 12.273 18.1751 11.6948 17.5969C11.1165 17.0187 10.7917 16.2344 10.7917 15.4167C10.7917 14.5989 11.1165 13.8147 11.6948 13.2364C12.273 12.6582 13.0572 12.3333 13.875 12.3333C14.6928 12.3333 15.477 12.6582 16.0552 13.2364C16.6335 13.8147 16.9583 14.5989 16.9583 15.4167ZM20.0417 15.4167C20.0417 17.0522 19.392 18.6207 18.2355 19.7772C17.079 20.9336 15.5105 21.5833 13.875 21.5833C12.2395 21.5833 10.671 20.9336 9.51451 19.7772C8.35803 18.6207 7.70833 17.0522 7.70833 15.4167C7.70833 13.7812 8.35803 12.2126 9.51451 11.0562C10.671 9.8997 12.2395 9.25 13.875 9.25C15.5105 9.25 17.079 9.8997 18.2355 11.0562C19.392 12.2126 20.0417 13.7812 20.0417 15.4167Z" fill="currentColor"/>
    </svg>
);

export const Logo = ({ variant = 'dark', className = "", ...props }: { variant?: 'dark' | 'light', className?: string } & React.SVGProps<SVGSVGElement>) => {
    // #3A5F7D is the secondary color used in the design.
    // Use white for light variant (on dark backgrounds).
    const fillColor = variant === 'light' ? '#FFFFFF' : '#3A5F7D';

    return (
        <svg 
            viewBox="0 0 262 70" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className={`h-12 w-auto transition-colors duration-300 ${className}`}
            {...props}
        >
            <path d="M239.304 32.9131V29.9009H236.254V32.9131H239.304ZM246.472 40.1197H219.209V32.9131H229.047V22.6943H246.472V40.1197Z" fill={fillColor}/>
            <path d="M218.828 32.9131V29.9009H205.521V32.9131H218.828ZM226.035 40.1197H178.258V32.9131H188.095V22.6943H195.302V32.9131H198.352V22.6943H226.035V40.1197Z" fill={fillColor}/>
            <path d="M164.569 32.9132H177.877V29.9009H164.569V32.9132ZM147.525 40.1197V32.9132H157.401V1.28244H164.569V22.6943H185.045V40.1197H147.525Z" fill={fillColor}/>
            <path d="M147.106 22.6943V19.6439H144.055V22.6943H147.106ZM154.312 40.1197H123.019V32.9131H147.106V29.9009H136.887V12.4755H154.312V40.1197Z" fill={fillColor}/>
            <path d="M123.617 40.1197H116.449V29.9009H103.141V32.9131H113.398V50.3767H85.7158V32.9131H92.9224V43.1701H106.192V40.1197H95.9728V22.6943H123.617V40.1197Z" fill={fillColor}/>
            <path d="M78.8144 40.1197H41.2944V32.9131H51.1701V22.6562H58.3385V32.9131H61.3889V22.6562H68.5955V32.9131H71.6459V22.6562H78.8144V40.1197Z" fill={fillColor}/>
            <path d="M48.1203 40.1197H31.0762V32.9131H40.9518V10.5436L48.1203 10.5436V40.1197Z" fill={fillColor}/>
            <path d="M37.9015 40.1197H20.8574V32.9131H30.7331V22.6943H37.9015V40.1197Z" fill={fillColor}/>
            <path d="M17.4635 32.9131H20.5139V29.8627H17.4635V32.9131ZM10.257 40.1197V29.8627H7.20657V69.1578H6.4277e-05L0 22.6943H27.6824V40.1197H10.257Z" fill={fillColor}/>
            <rect x="141.435" y="4.37851" width="6.19215" height="6.19215" transform="rotate(-45 141.435 4.37851)" fill="#BA0202"/>
            <rect x="33.1006" y="57.8198" width="5.26308" height="5.26308" transform="rotate(-135 33.1006 57.8198)" fill="#BA0202"/>
            <rect x="33.1006" y="50.3766" width="5.26308" height="5.26308" transform="rotate(-135 33.1006 50.3766)" fill="#BA0202"/>
            <path d="M0 1.28238H133.836V7.47453H0V1.28238Z" fill={fillColor}/>
            <path d="M170.839 1.28238H256.142V7.47453H170.839V1.28238Z" fill={fillColor}/>
            <path d="M261.13 1.28238L261.13 69.1245L254.938 69.1245L254.938 1.28238L261.13 1.28238Z" fill={fillColor}/>
            <path d="M0 61.0731H261.13V69.1245H0V61.0731Z" fill={fillColor}/>
        </svg>
    );
};

export const MenuIcon = ({ size = 32, className, ...props }: { size?: number | string, className?: string } & React.SVGProps<SVGSVGElement>) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width={size} 
        height={size} 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className={className}
        {...props}
    >
        <line x1="4" x2="20" y1="12" y2="12" />
        <line x1="4" x2="20" y1="6" y2="6" />
        <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
);

export const CloseIcon = ({ size = 32, className, ...props }: { size?: number | string, className?: string } & React.SVGProps<SVGSVGElement>) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width={size} 
        height={size} 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className={className}
        {...props}
    >
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
    </svg>
);
