import React from 'react'
import { useParams } from 'react-router-dom'


export default function Checkout() {
    const token = localStorage.getItem('token');
    const [user, setUser] = React.useState({})

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

    const [payments, setPayments] = React.useState([]);

    React.useEffect(() => {
        fetch('http://localhost:5000/payments')
            .then(response => response.json())
            .then(data => setPayments(data))
    }, [])

    const [car, setCar] = React.useState({})
    const carId = window.location.pathname.split('/').pop()

    React.useEffect(() => {
        try {
            fetch(`http://localhost:5000/cars/${carId}`)
                .then(response => response.json())
                .then(data => setCar(data))
        } catch (error) {
            console.error(error)
        }
    }, [carId])

    function formatDate(date) {
        const d = new Date(date);
        return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`
    }
    const orderDate = new Date();
    const paymentDate = new Date();

    const [status, setStatus] = React.useState('Pending');

    const [paymentId, setPaymentId] = React.useState('');

    const handlePaymentChange = (event) => {
        setPaymentId(event.target.value);
    };

    const [newOrder, setNewOrder] = React.useState({})

    const handleCheckout = async (event) => {
        event.preventDefault();

        try {
            const orderResponse = await fetch('http://localhost:5000/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    userId: user._id,
                    orderDate,
                    status,
                    cars: car._id,
                    paymentId,
                    total: car.price,
                    paymentDate,
                }),
            });

            if (!orderResponse.ok) {
                throw new Error('Failed to place order');
            }

            const newOrder = await orderResponse.json();

            const userResponse = await fetch(`http://localhost:5000/users/orders`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    userId: user._id,
                    orderId: newOrder._id,
                }),
            });

            if (!userResponse.ok) {
                throw new Error('Failed to add order to user');
            }

            setNewOrder(newOrder);
            alert('Order placed successfully');
            window.location.href = '/orders';
        } catch (error) {
            console.error('Error placing order:', error);
        }
    };

    return (
        <div className='flex flex-col'>
            <h1 className='text-4xl font-bold text-center my-8'>Checkout</h1>
            <div className='flex flex-col w-[60rem] self-center items-center'>
                <div>
                    <div className='bg-white w-[full] p-4 rounded-md shadow-md hover:bg-gray-100 cursor-default'>
                        <h1 className='text-xl font-bold'>{car.brand} {car.model}</h1>
                        <p className='text-gray-700 mt-2'>Year: {car.year}</p>
                        <p className='text-gray-700 mt-2'>Mileage: {car.mileage?.toLocaleString()} kms</p>
                    </div>
                </div>
                <div className='w-[60rem]'>
                    <h1 className='text-2xl mt-6 font-bold text-gray-800'>Payments</h1>
                    <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-y-4 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-4 gap-x-10 my-4'>
                        {payments.map(payment => (
                            <div key={payment._id}
                                className={paymentId === payment._id ? 'bg-purple-600 text-zinc-50 p-4 rounded-md shadow-md cursor-pointer hover:bg-purple-700 transition-colors duration-300 ease-in-out' : 'bg-white p-4 rounded-md shadow-md hover:bg-gray-100 cursor-pointer'}
                                onClick={
                                    () => handlePaymentChange({ target: { value: payment._id } })
                                }
                            >
                                <h1 className='text-xl font-bold'>{payment.method}</h1>
                                <p className='mt-2'>Price: ${car.price?.toLocaleString()}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className='flex justify-center mt-4'>
                <button
                    className='flex w-[60rem] justify-center bg-purple-700 text-zinc-50 font-bold text-xl rounded-md px-4 py-4
                    hover:bg-purple-800 transition-colors duration-300 ease-in-out'
                    onClick={handleCheckout}
                >Checkout</button>
            </div>
        </div>
    )
}
