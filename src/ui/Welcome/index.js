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
                    <h1 className='text-6xl text-zinc-50 font-bold ml-20'>
                        Getting started with
                    </h1>
                    <img src='https://www.cars.com/images/cars-comm_white_text.png'
                        className='mt-5 ml-20' alt='big-logo' />
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
                    <div className="flex items-center space-x-6 justify-center">
                        <button
                            className="bg-gray-100 w-full hover:bg-gray-200 text-purple-600 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            onClick={handleLogin}
                        >
                            Sign up
                        </button>
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
