import React from 'react'
import WishlistCard from '../../components/WishlistCard';

export default function Wishlist() {
    const userId = window.location.pathname.split('/')[2];
    const [user, setUser] = React.useState({});

    const [wishlist, setWishlist] = React.useState({});
    const [wishlistCars, setWishlistCars] = React.useState([]);


    React.useEffect(() => {
        if (userId !== undefined && wishlist) {
            fetch(`http://localhost:5000/users/${userId}`)
                .then(response => response.json())
                .then(data => {
                    setUser(data);
                });
        }
    }, [userId]);

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

    if (userId === 'undefined') {
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
