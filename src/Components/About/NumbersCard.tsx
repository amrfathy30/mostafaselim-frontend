import React from 'react';

const NumbersCard = ({ item }) => {
    const { icon ,title,number} = item
    return (
        <div className="relative flex w-full h-[132px] rounded-[17px] bg-white px-4" >
            <div className='w-[92px] h-full flex items-center justify-center'>
                {icon}
            </div>
            <div className='h-full flex flex-col items-center justify-center'>
                <p className='text-primary text-[22px] font-bold'>
                    {title}
                </p>
                <p className='text-primary text-[22px] font-normal'>
                    {number}
                </p>
            </div>

        </div>
    );
};

export default NumbersCard;