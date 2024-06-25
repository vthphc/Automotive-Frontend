import React from 'react'
import { Link } from 'react-router-dom'

export default function Introduction() {
    const token = localStorage.getItem('token');
    return (
        <div className='bg-purple-950 min-h-screen'>
            <div className='flex flex-row items-center justify-between'>
                <div className='flex w-2/4 flex-col'>
                    <div className='flex flex-col'>
                        <h1 className='text-6xl text-zinc-50 font-bold mt-20 ml-20'>Welcome to</h1>
                        <img src='https://www.cars.com/images/cars-comm_white_text.png'
                            className='mt-5 ml-20' />
                        <h2 className='text-3xl text-zinc-50 font-medium mt-5 ml-20'>The best place to find your next car</h2>
                    </div>
                    {/* <div className='flex flex-col mt-10 ml-20'>
                        <p className='text-lg text-zinc-50 font-medium'>We have the best selection of cars for you to choose from. Whether you are looking for a new car, a used car, or a certified pre-owned car, we have it all. We have cars from all the top manufacturers, including Ford, Chevrolet, Toyota, Honda, and many more. We also have a wide selection of luxury cars, sports cars, and electric cars. We have something for everyone, no matter what your budget or preferences are. So why wait? Start shopping for your next car today!</p>
                    </div> */}
                </div>
                <div className='flex w-2/3 flex-col'>
                    <img
                        className=''
                        src='https://vinfastvinh.net.vn/images/detailed/12/CE18_tgvr-jx.png'
                        alt='car' />
                    <div className='flex'>
                        {token ?
                            (<Link
                                className='flex justify-center self-center min-w-80 bg-zinc-50 
                            text-purple-950 font-medium text-lg
                            rounded-md px-4 py-2 mt-5 ml-20
                            hover:bg-purple-700
                            hover:text-zinc-50
                            transition-colors duration-300 ease-in-out'
                                to='/homepage'
                            >Learn More</Link>) :
                            (<Link
                                className='flex justify-center self-center min-w-80 bg-zinc-50 
                            text-purple-950 font-medium text-lg
                            rounded-md px-4 py-2 mt-5 ml-20
                            hover:bg-purple-700
                            hover:text-zinc-50
                            transition-colors duration-300 ease-in-out'
                                to='/'
                            >Learn More</Link>)}
                        <Link
                            className='flex justify-center self-center min-w-80 bg-purple-700 
                            text-zinc-50 font-medium text-lg
                            rounded-md px-4 py-2 mt-5 ml-20
                            hover:bg-purple-800
                            transition-colors duration-300 ease-in-out'
                            to='/cars'
                        >Shop Now</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
