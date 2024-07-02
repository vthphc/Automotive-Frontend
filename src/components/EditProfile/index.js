import React from 'react'

export default function EditProfile() {

    const [updatedUser, setUpdatedUser] = React.useState({});
    const token = localStorage.getItem('token');

    React.useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                if (token) {
                    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/profile`, {
                        method: 'POST',
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    if (!response.ok) {
                        throw new Error('Failed to fetch user profile');
                    }
                    setUpdatedUser(await response.json());
                }
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        fetchUserProfile();
    }, [token]);

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        if (!updatedUser.fullName || !updatedUser.email || !updatedUser.phoneNumber) {
            alert('Please fill in all fields');
            return;
        } else {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/profile`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ updatedUser }),
                });

                if (!response.ok) {
                    throw new Error('Update profile failed');
                }

                console.log('Update profile successful');
                alert('Profile updated successfully!');
                window.location.href = '/profile';
            } catch (error) {
                console.error('Update profile error:', error);
            }
        }
    }

    return (
        <div className='flex justify-center'>
            <div className='w-[30rem] space-y-4'>
                <h1 className='text-4xl font-bold text-center my-8'>Edit {updatedUser.username}'s' Profile</h1>
                <div className=''>
                    <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='username'>
                        Username
                    </label>
                    <input
                        type='text'
                        id='username'
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
                        value={updatedUser.username}
                        disabled
                    />
                </div>
                <div className=''>
                    <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='password'>
                        Password
                    </label>
                    <input
                        type='password'
                        id='password'
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
                        value={updatedUser.password}
                        disabled
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
                        placeholder='Full Name'
                        value={updatedUser.fullName}
                        onChange={(e) => setUpdatedUser({ ...updatedUser, fullName: e.target.value })}
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
                        value={updatedUser.email}
                        onChange={(e) => setUpdatedUser({ ...updatedUser, email: e.target.value })}
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
                        value={updatedUser.phoneNumber}
                        onChange={(e) => setUpdatedUser({ ...updatedUser, phoneNumber: e.target.value })}
                    />
                </div>
                <div className="flex items-center space-x-6 justify-center">
                    <button
                        className="bg-purple-700 w-full hover:bg-purple-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        onClick={handleUpdateProfile}
                    >Update Profile</button>
                </div>
            </div>
        </div>
    )
}
