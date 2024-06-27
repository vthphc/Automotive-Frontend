import React from 'react'

export default function SignUp() {
    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [fullName, setFullName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [phoneNumber, setPhoneNumber] = React.useState('')

    const handleSignUp = async (e) => {
        e.preventDefault()
        if (!username || !password || !fullName || !email || !phoneNumber) {
            alert('Please fill in all fields')
            return;
        } else {
            try {
                const response = await fetch('http://localhost:5000/auth/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username, password, fullName, email, phoneNumber, addesses: [] }),
                })

                if (!response.ok) {
                    throw new Error('Sign up failed')
                }

                console.log('Sign up successful')
                window.location.href = '/'
            } catch (error) {
                console.error('Sign up error:', error)
            }
        }
    }

    return (
        <div className='flex flex-col justify-center'>
            <h1 className='text-4xl font-bold text-center my-8'>
                Create an account
            </h1>
            <div className='w-[24rem] self-center space-y-4'>
                <div className="">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>

                <div className="">
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

                <div className="">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fullName">
                        Full Name
                    </label>
                    <input
                        type="text"
                        id="fullName"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                    />
                </div>

                <div className="">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phoneNumber">
                        Phone Number
                    </label>
                    <input
                        type="tel"
                        id="phoneNumber"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                </div>

                <div className="flex items-center space-x-6 justify-center">
                    <button
                        className="bg-purple-700 w-full hover:bg-purple-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        onClick={handleSignUp}
                    >
                        Sign up
                    </button>
                </div>
            </div>
        </div>
    )
}
