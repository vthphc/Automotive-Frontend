import React from 'react'
import OrderCard from '../../components/OrderCard';

export default function Orders() {
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
    }, [token]);


    const [orders, setOrders] = React.useState([]);

    React.useEffect(() => {
        const fetchOrders = async () => {
            try {
                if (token) {
                    const response = await fetch(`http://localhost:5000/orders?ids=${user.orderIds.join(',')}`, {
                        method: 'GET',
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    if (!response.ok) {
                        throw new Error('Failed to fetch orders');
                    }
                    setOrders(await response.json());
                    console.log(orders);
                }
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, [user.orderIds, token]);

    if (!token) {
        return <h1 className='text-4xl font-bold text-center my-8'>Please log in to view your orders!</h1>
    }

    return (
        <div>
            <h1 className='text-4xl font-bold text-center my-8'>
                {user.fullName}'s Orders
            </h1>
            <div className='flex items-center flex-col space-y-8'>
                {orders.map(order => (
                    <OrderCard key={order._id} order={order} />
                ))}
            </div>
        </div>
    )
}
