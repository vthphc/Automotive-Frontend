import React from 'react'
import CarCard from '../CarCard';
import { useParams } from 'react-router-dom'

export default function CarDetails() {
    const [user, setUser] = React.useState({})
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

    const { id } = useParams();

    const [car, setCar] = React.useState({})
    const [carImages, setCarImages] = React.useState([])
    const [carCategories, setCarCategories] = React.useState({})

    const [selectedImage, setSelectedImage] = React.useState(0)

    const [otherCars, setOtherCars] = React.useState([])

    React.useEffect(() => {
        try {
            fetch(`http://localhost:5000/cars/${id}`)
                .then(response => response.json())
                .then(data => setCar(data))
        } catch (error) {
            console.error(error)
        }
    }, [id])

    React.useEffect(() => {
        try {
            fetch(`http://localhost:5000/images/${car.images}`)
                .then(response => response.json())
                .then(data => setCarImages(data))
        } catch (error) {
            console.error(error)
        }
    }, [car.images])

    React.useEffect(() => {
        try {
            fetch(`http://localhost:5000/categories/${car.categories}`)
                .then(response => response.json())
                .then(data => setCarCategories(data))
        } catch (error) {
            console.error(error)
        }
    }, [car.categories])

    React.useEffect(() => {
        try {
            fetch(`http://localhost:5000/cars/exclude/${id}`)
                .then(response => response.json())
                .then(data => setOtherCars(data))
        } catch (error) {
            console.error(error)
        }
    }, [id])

    const handleAddToWishlist = async () => {
        if (token != undefined) {
            try {
                const response = await fetch(`http://localhost:5000/wishlists/${user.wishlistId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        wishlistId: user.wishlistId,
                        cars: id
                    })
                });
                if (!response.ok) {
                    throw new Error('Failed to update wishlist');
                }
                alert('Wishlist updated successfully!');
            } catch (error) {
                console.error(error);
            }
        } else {
            alert('You need to be logged in to add to wishlist')
        }
    };

    return (
        <div className='flex flex-col items-center'>
            <div className='flex justify-center'>
                <div className='flex bg-zinc-50 h-[26rem] rounded-3xl flex-row w-[88rem]'>
                    <img
                        className='rounded-l-3xl min-w-screen-md w-[32rem] object-cover'
                        fill sizes="900px"
                        src={carImages?.images?.[selectedImage]} alt={car.make} />
                    <div className='w-[14rem] pl-4 my-4 overflow-y-scroll no-scrollbar'>
                        <div className="flex flex-col space-y-2">
                            {carImages.images?.map((image, index) => (
                                <img
                                    key={index} className={`w-24 h-24 border-2 border-zinc-300 object-cover ${selectedImage === index ? " border-zinc-800" : "border-zinc-300"}`}
                                    onClick={() => setSelectedImage(index)}
                                    src={image} alt={`${car.brand}-${index}`} />
                            ))}
                        </div>
                    </div>
                    <div className='flex flex-col py-4 px-6 w-full text-zinc-950 font-medium text-lg justify-between'>
                        <div>
                            <div className='flex p-2 flex-row justify-between'>
                                <p className='font-bold'>Name:</p>
                                <p>{car.brand} {car.model}</p>
                            </div>
                            <div className='flex p-2 bg-gray-100 flex-row justify-between'>
                                <p className='font-bold'>Year:</p>
                                <p>{car.year}</p>
                            </div>
                            <div className='flex p-2 flex-row justify-between'>
                                <p className='font-bold'>Mileage:</p>
                                <p>{car.mileage?.toLocaleString()} kms</p>
                            </div>
                            <div className='flex p-2 bg-gray-100 flex-row justify-between'>
                                <p className='font-bold'>Dealer's Description:</p>
                                <p>{car.description}</p>
                            </div>
                            <div className='flex p-2 flex-row justify-between'>
                                <p className='font-bold'>Category:</p>
                                <p>{carCategories.categoryName}</p>
                            </div>
                        </div>
                        <div className='flex flex-col w-full'>
                            <div className='flex w-full justify-between mt-4'>
                                <div className='flex flex-row text-2xl justify-between'>
                                    <p className='flex font-bold mr-2'>Price:</p>
                                    <p>${car.price?.toLocaleString()}</p>
                                </div>
                                <div className='flex'>
                                    <button className='flex justify-center self-center bg-purple-700 text-zinc-50 font-medium text-lg rounded-md px-4 py-2 mr-2 
                            hover:bg-purple-800 transition-colors duration-300 ease-in-out'
                                        onClick={handleAddToWishlist}
                                    >Add to Wishlist</button>
                                    <button className='flex justify-center self-center bg-purple-700 text-zinc-50 font-medium text-lg rounded-md px-4 py-2 ml-2
                            hover:bg-purple-800 transition-colors duration-300 ease-in-out'>Buy Now</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-[88rem]'>
                <h1 className='text-2xl mt-8 font-bold text-gray-800'>Other Cars You Might Like</h1>
                <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-x-10 my-4'>
                    {otherCars.map(car => (
                        <CarCard key={car.id} car={car} />
                    ))}
                </div>
            </div>
        </div>
    )
}
