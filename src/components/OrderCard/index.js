import React from 'react'

export default function OrderCard({ order }) {
    function formatDate(date) {
        const d = new Date(date);
        return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`
    }

    const [orderCars, setOrderCars] = React.useState([]);

    React.useEffect(() => {
        const fetchOrderCars = async () => {
            try {
                const response = await fetch(`http://localhost:5000/cars?ids=${order.cars.join(',')}`, {
                    method: 'GET',
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch order cars');
                }
                setOrderCars(await response.json());
            } catch (error) {
                console.error('Error fetching order cars:', error);
            }
        };

        fetchOrderCars();
    }, [order.cars]);

    return (
        <div key={order._id} className='flex p-4 rounded-xl flex-row bg-gray-100 w-[88rem] justify-between'>
            <div className='flex flex-col space-y-4 justify-between'>
                <div className='flex flex-row space-x-8 '>
                    <p className='text-xl font-bold'>Order ID: {order._id}</p>
                    <p className='text-lg'>Order Date: {formatDate(order.orderDate)}</p>
                    <p className='text-lg'>Payment Date: {formatDate(order.paymentDate)}</p>
                </div>
                <div className='flex flex-col'>
                    <p className='text-xl font-bold'>Cars:</p>
                    {orderCars.map((car, index) => (
                        <p key={car._id} className='text-lg'>{index + 1}. {car.brand} {car.model}</p>
                    ))}
                </div>
            </div>
            <div className='flex flex-col items-center justify-between'>
                <div className='flex items-center justify-center'>
                    <p className='text-lg font-bold'>Status:</p>
                    <p className='text-lg ml-4'>{order.status}</p>
                </div>
                <div className='flex items-center justify-center'>
                    <p className='text-lg font-bold'>Total Price:</p>
                    <p className='text-lg ml-4'>${order.total.toLocaleString()}</p>
                </div>
            </div>
        </div>
    )
}
