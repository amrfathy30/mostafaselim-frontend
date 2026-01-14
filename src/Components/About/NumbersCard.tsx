import React from 'react';

const NumbersCard = ({ item }) => {
    const { icon ,title,number} = item
    return (
        <div className="relative flex w-full h-[100px] sm:h-[115px] md:h-[132px] rounded-[17px] bg-white px-3 md:px-4" >
            <div className='w-[60px] sm:w-[75px] md:w-[92px] h-full flex items-center justify-center'>
                {icon}
            </div>
            <div className='h-full flex flex-col items-center justify-center'>
                <p className='text-primary text-[16px] sm:text-[18px] md:text-[22px] font-bold'>
                    {title}
                </p>
                <p className='text-primary text-[16px] sm:text-[18px] md:text-[22px] font-normal'>
                    {number}
                </p>
            </div>

        </div>
    );
};

export default NumbersCard;