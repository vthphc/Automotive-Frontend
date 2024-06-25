import React from 'react'
import WishlistCard from '../../components/WishlistCard';

export default function Wishlist() {
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
    }, []);

    const [wishlist, setWishlist] = React.useState({});
    const [wishlistCars, setWishlistCars] = React.useState([]);

    React.useEffect(() => {
        fetch(`http://localhost:5000/wishlists/${user.wishlistId}`)
            .then(response => response.json())
            .then(data => {
                setWishlist(data);
            });
    }, [user.wishlistId]);

    React.useEffect(() => {
        if (wishlist.cars) {
            fetch(`http://localhost:5000/cars?ids=${wishlist.cars.join(',')}`)
                .then(response => response.json())
                .then(data => {
                    setWishlistCars(data);
                });
        } else {
            setWishlistCars([]);
        }
    }, [wishlist.cars]);

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
                    <WishlistCard wishlistId={wishlist._id} key={car.id} car={car} />
                ))}
            </div>
        </div>
    )
}
