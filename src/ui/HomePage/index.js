import React from 'react'
import { Link } from 'react-router-dom'
import Footer from '../../components/Footer'

export default function HomePage() {
    const [categories, setCategories] = React.useState([])

    React.useEffect(() => {
        fetch('http://localhost:5000/categories')
            .then(response => response.json())
            .then(data => setCategories(data))
    }, [])

    return (
        <div className=''>
            <section className='bg-cover bg-center h-[24rem] text-black flex flex-col items-center justify-center' style={{ backgroundImage: "url('path_to_your_image.jpg')" }}>
                <h1 className='text-4xl md:text-6xl font-bold'>Find Your Dream Car Today</h1>
                <Link
                    className='mt-4 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded'
                    to='/cars'
                >Shop Now</Link>
            </section>

            <section className='p-8 mx-6 mb-2'>
                <h2 className='text-2xl font-bold mb-4'>Popular Categories</h2>
                <div className='font-medium grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7 gap-4'>
                    {categories.map((category) => (
                        <div key={category._id} className='flex hover:bg-gray-100 justify-center w-[12rem] bg-white p-4 rounded shadow-md'>{category.categoryName}</div>
                    ))}
                    <div className='flex hover:bg-gray-100 justify-center w-[12rem] bg-white p-4 rounded shadow-md'>View All</div>
                </div>
            </section>

            <Footer />
        </div>
    )
}
