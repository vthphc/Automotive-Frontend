import React from 'react'
import { Link } from 'react-router-dom'

export default function CarCard({ car }) {
    const [carImages, setCarImages] = React.useState([])

    React.useEffect(() => {
        fetch(`http://localhost:5000/images/${car.images}`)
            .then(response => response.json())
            .then(data => setCarImages(data))
    }, [])
    return (
        <Link to={`/cars/${car._id}`}>
            <div
                className='flex flex-col w-[20rem] hover:scale-105 transform ease-in-out duration-300
                items-center justify-center bg-white rounded-lg shadow-md'>
                <img className='w-[20rem] h-48 object-cover rounded-t-lg' src={carImages.previewImage} alt={car.make} />
                <div className='flex flex-col p-4 w-full'>
                    <h1 className='text-xl font-bold text-gray-800'>{car.brand} {car.model}</h1>
                    <p className='text-gray-600'>{car.year}</p>
                    <div className='flex flex-row justify-between'>
                        <div className='flex '>
                            <p className='text-gray-600'>{car.mileage.toLocaleString()} kms</p>
                        </div>
                        <p className='text-zinc-800 font-bold'>$ {car.price.toLocaleString()}</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}
