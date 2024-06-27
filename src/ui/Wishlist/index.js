import React from 'react'
import WishlistCard from '../../components/WishlistCard';

export default function Wishlist() {
    const [user, setUser] = React.useState({});
    const token = localStorage.getItem('token');

    const [wishlist, setWishlist] = React.useState({});
    const [wishlistCars, setWishlistCars] = React.useState([]);


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

                    const userData = await response.json();
                    setUser(userData);
                    return userData;
                }
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        const fetchWishlist = async () => {
            try {
                if (token) {
                    const response = await fetch(`http://localhost:5000/wishlists/${user.wishlistId}`, {
                        method: 'GET',
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    if (!response.ok) {
                        throw new Error('Failed to fetch wishlist');
                    }

                    const wishlistData = await response.json();
                    setWishlist(wishlistData);
                }
            } catch (error) {
                console.error('Error fetching wishlist:', error);
            }
        };

        const fetchData = async () => {
            const userData = await fetchUserProfile();
            if (userData && userData.wishlistId) {
                fetchWishlist();
            }
        };

        fetchData();

    }, [token, user.wishlistId]);

    React.useEffect(() => {
        const fetchWishlistCars = async () => {
            try {
                if (wishlist.cars && wishlist.cars.length > 0) {
                    const response = await fetch(`http://localhost:5000/cars?ids=${wishlist.cars.join(',')}`, {
                        method: 'GET',
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    if (!response.ok) {
                        throw new Error('Failed to fetch wishlist cars');
                    }

                    const wishlistCarsData = await response.json();
                    setWishlistCars(wishlistCarsData);
                }
            } catch (error) {
                console.error('Error fetching wishlist cars:', error);
            }
        };

        fetchWishlistCars();
    }, [token, wishlist.cars]);

    if (!token) {
        return <h1 className='text-4xl font-bold text-center my-8'>Please log in to view your wishlist!</h1>
    }

    return (
        <div>
            <h1 className='text-4xl font-bold text-center my-8'>
                {user.fullName}'s Wishlist
            </h1>
            <div className='flex items-center flex-col space-y-8'>
                {wishlistCars.map(car => (
                    <WishlistCard wishlistId={wishlist._id} key={car._id} car={car} />
                ))}
            </div>
        </div>
    )
}
