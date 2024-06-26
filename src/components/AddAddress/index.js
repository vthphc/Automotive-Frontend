import React from 'react'

export default function AddAddress() {
    const token = localStorage.getItem('token')
    const [user, setUser] = React.useState({})

    const [addressLine, setAddressLine] = React.useState('')
    const [city, setCity] = React.useState('')
    const [country, setCountry] = React.useState('')

    const [newAddress, setNewAddress] = React.useState({})

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

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const addressResponse = await fetch('http://localhost:5000/addresses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    userId: user._id,
                    addressLine,
                    city,
                    country,
                }),
            });

            if (!addressResponse.ok) {
                throw new Error('Failed to add address');
            }

            const newAddress = await addressResponse.json();

            const userResponse = await fetch('http://localhost:5000/users/addresses', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    userId: user._id,
                    addressId: newAddress._id,
                }),
            });

            if (!userResponse.ok) {
                throw new Error('Failed to update user with new address');
            }

            setNewAddress(newAddress);
            alert('Address added successfully');
            window.location.href = '/profile';
        } catch (error) {
            console.error('Error adding address:', error);
        }
    };

    return (
        <div className='flex flex-col justify-center'>
            <h1 className='text-4xl font-bold text-center my-8'>Add Address</h1>
            <div className='flex w-[26rem] space-y-8 self-center flex-col'>
                <input
                    type='text'
                    className='bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent w-full p-2 rounded-md'
                    placeholder='Address Line'
                    value={addressLine}
                    onChange={(event) => setAddressLine(event.target.value)}
                />
                <input
                    type='text'
                    className='bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent w-full p-2 rounded-md'
                    placeholder='City'
                    value={city}
                    onChange={(event) => setCity(event.target.value)}
                />
                <input
                    type='text'
                    className='bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent w-full p-2 rounded-md'
                    placeholder='Country'
                    value={country}
                    onChange={(event) => setCountry(event.target.value)}
                />
                <button
                    type='submit'
                    className='bg-purple-600 font-bold w-full text-white p-2 rounded-md my-2'
                    onClick={handleSubmit}
                >
                    Add Address
                </button>
            </div>
        </div>
    )
}
