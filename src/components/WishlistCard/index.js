import React from 'react'
import { Link } from 'react-router-dom';

export default function WishlistCard({ car, wishlistId }) {
    const [carImages, setCarImages] = React.useState([]);

    React.useEffect(() => {
        fetch(`http://localhost:5000/images/${car.images}`)
            .then(response => response.json())
            .then(data => setCarImages(data))
            .catch(error => {
                console.error('Error fetching images:', error);
            });
    }, [car.images]);

    const handleRemoveFromWishlist = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Unauthorized');
            }

            const response = await fetch(`http://localhost:5000/wishlists/remove/${wishlistId}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    cars: car._id,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to remove car from wishlist');
            }

            window.location.reload();
        } catch (error) {
            console.error('Error removing car from wishlist:', error);
        }
    };

    return (
        <div>
            <div className='flex p-4 rounded-xl flex-row bg-gray-100 w-[44rem] justify-between'>
                <Link className='flex flex-row' to={`/cars/${car._id}`}>
                    <img
                        className='w-[100px] h-[100px] rounded-xl object-cover'
                        src={carImages.previewImage || carImages.images?.[0] || 'https://via.placeholder.com/150'}
                        alt='car' />
                    <div className='flex flex-col justify-between ml-4'>
                        <p className='text-xl font-bold'>{car.brand} {car.model}</p>
                        <p className='text-lg'>Mileage: {car.mileage} kms</p>
                        <p className='text-lg'>Year: {car.year}</p>
                    </div>
                </Link>
                <div className='flex items-center justify-center'>
                    <p className='text-lg font-bold'>Price:</p>
                    <p className='text-lg ml-4'>${car.price}</p>
                </div>
                <div>
                    <button className='bg-purple-600 font-semibold text-white px-4 py-2 rounded-lg'
                        onClick={handleRemoveFromWishlist}
                    >Remove</button>
                </div>
            </div>
        </div>
    )
}
