import React from 'react'

export default function Profile() {
    const [user, setUser] = React.useState({});
    const token = localStorage.getItem('token');

    React.useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                if (token) {
                    const response = await fetch('http://localhost:5000/auth/profile', {
                        method: 'POST',
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    if (!response.ok) {
                        throw new Error('Failed to fetch user profile');
                    }
                    setUser(await response.json());
                }
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        fetchUserProfile();
    }, [token]);

    const [userAddresses, setUserAddresses] = React.useState([]);

    React.useEffect(() => {
        const fetchAddresses = async () => {
            try {
                if (user.addresses && user.addresses.length > 0) {
                    const response = await fetch(`http://localhost:5000/addresses?ids=${user.addresses.join(',')}`, {
                        method: 'GET',
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    if (!response.ok) {
                        throw new Error('Failed to fetch addresses');
                    }
                    setUserAddresses(await response.json());
                }
            } catch (error) {
                console.error('Error fetching addresses:', error);
            }
        }

        fetchAddresses();
    }, [user.addresses]);

    return (
        <div className='flex flex-col'>
            <h1 className='text-4xl font-bold text-center my-8'>Welcome, {user.fullName}!</h1>
            <div className='flex flex-col space-y-4 self-center w-[36rem]'>
                <div className='flex flex-row justify-between'>
                    <p className='text-xl font-semibold'>Name: </p>
                    <p className='text-xl'>{user.fullName}</p>
                </div>
                <div className='flex flex-row justify-between'>
                    <p className='text-xl font-semibold'>Email: </p>
                    <p className='text-lg font-medium'>{user.email}</p>
                </div>
                <div className='flex flex-row justify-between'>
                    <p className='text-xl font-semibold'>Phone Number: </p>
                    <p className='text-lg font-medium'>{user.phoneNumber}</p>
                </div>
                <p className='text-xl font-semibold'>Addresses: </p>
                {
                    userAddresses.length > 0 ? userAddresses.map((address, index) => (
                        <div key={index} className='flex flex-col space-y-2'>
                            <p className='text-lg font-medium'>{address.addressLine1}</p>
                            <p className='text-lg font-medium'>{address.addressLine2}</p>
                            <p className='text-lg font-medium'>{address.city}, {address.state} {address.zipCode}</p>
                        </div>
                    )) : <p className='text-lg font-medium'>No addresses added yet!</p>
                }
                <div className='flex flex-row space-x-8'>
                    <button className='bg-gray-200 w-full text-purple-600 font-bold py-2 rounded-md self-center'>Edit Profile</button>
                    <button className='bg-purple-500 w-full text-white font-bold py-2 rounded-md self-center'>Add Address</button>
                </div>
            </div>
        </div>
    )
}
