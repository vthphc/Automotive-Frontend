import React from 'react'
import CarCard from '../../components/CarCard'

export default function Cars() {
    const [cars, setCars] = React.useState([])
    const [searchQuery, setSearchQuery] = React.useState('');
    const [searchYear, setSearchYear] = React.useState('');

    React.useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/cars`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })

                if (!response.ok) {
                    throw new Error('Failed to fetch cars');
                }

                const carsData = await response.json();
                setCars(carsData);
            } catch (error) {
                console.error('Error fetching cars:', error);
            }
        }

        fetchCars();
    }, [])

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleYearSearchChange = (event) => {
        setSearchYear(event.target.value);
    };

    const filteredCars = cars.filter(car =>
        car.model.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (searchYear === '' || car.year.toString() === searchYear)
    );

    return (
        <div className='flex flex-col items-center'>
            <div className='flex flex-row space-x-16'>
                <input
                    type='text'
                    placeholder='Model...'
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className='bg-gray-100 text-zinc-800 mt-2 p-2 rounded-md w-[42rem] focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent'
                />
                <input
                    type='number'
                    placeholder='Years...'
                    value={searchYear}
                    onChange={handleYearSearchChange}
                    className='bg-gray-100 text-zinc-800 mt-2 p-2 rounded-md w-[42rem] focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent'
                />
            </div>
            <div className='w-[88rem]'>
                <h1 className='text-2xl mt-6 font-bold text-gray-800'>Cars</h1>
                <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-y-4 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-4 gap-x-10 my-4'>
                    {filteredCars.map(car => (
                        <CarCard key={car._id} car={car} />
                    ))}
                </div>
            </div>
        </div>
    )
}
