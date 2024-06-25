import React, { useState } from 'react';

export default function Welcome() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const { token } = await response.json();
            localStorage.setItem('token', token);

            console.log('Login successful');
            window.location.href = '/homepage';
        } catch (error) {
            console.error('Login error:', error);
            setError('Invalid username or password');
        }
    };

    return (
        <div className="flex flex-row items-center justify-between min-h-screen bg-purple-950">
            <div className='flex w-2/4 flex-col'>
                <div className='flex flex-col'>
                    <h1 className='text-6xl text-zinc-50 font-bold ml-20'>Welcome to Cars Commerce</h1>
                    <h2 className='text-3xl text-zinc-50 font-medium mt-5 ml-20'>The best place to find your next car</h2>
                </div>
                <div className='flex flex-col mt-10 ml-20'>
                    <p className='text-lg text-zinc-50 font-medium'>We have the best selection of cars for you to choose from. Whether you are looking for a new car, a used car, or a certified pre-owned car, we have it all. We have cars from all the top manufacturers, including Ford, Chevrolet, Toyota, Honda, and many more. We also have a wide selection of luxury cars, sports cars, and electric cars. We have something for everyone, no matter what your budget or preferences are. So why wait? Start shopping for your next car today!</p>
                </div>
            </div>
            <div className="bg-white p-6 mr-20 rounded shadow-md min-w-[24rem] max-w-sm">
                <h2 className="text-2xl font-bold mb-6 text-start">Login with password</h2>
                <div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center justify-center">
                        <button
                            className="bg-purple-700 w-full hover:bg-purple-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            onClick={handleLogin}
                        >
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
