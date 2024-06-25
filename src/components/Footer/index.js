import React from 'react'

export default function Footer() {
    return (
        <div className='flex h-[8rem] justify-between flex-col p-4'>
            <img
                className='w-[271px] h-[51px] ml-1.5 object-contain'
                src='https://investor.cars.com/images/cars-comm_logo_tm_hrz_rgb_pos[1].png'
                alt='logo' />
            <div className='flex flex-row justify-between mx-4'>
                <p className=''>
                    © 2024 Cars.com Inc. All rights reserved.
                </p>
                <a className='text-sky-700' href="https://github.com/vthphc" target="_blank" rel="noopener noreferrer">
                    GitHub Repository
                </a>
            </div>
        </div>
    )
}
