import React from 'react'
import { Link } from 'react-router-dom';

export default function NavBar() {
    const [user, setUser] = React.useState({});
    const token = localStorage.getItem('token');

    const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
    const dropdownRef = React.useRef(null);

    React.useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.reload();
    };

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

    return (
        <nav className='flex py-2 bg-white flex-row text-lg font-medium justify-between sticky top-0'>
            <Link className='flex mt-1 mx-12' to='/introduction'>
                <img
                    className='w-[271px] h-[51px] object-contain'
                    src='https://investor.cars.com/images/cars-comm_logo_tm_hrz_rgb_pos[1].png'
                    alt='logo' />
            </Link>
            <div className='flex w-2/4 flex-row justify-evenly'>
                <Link
                    className='flex px-4 items-center rounded-md text-purple-950
                    hover:bg-purple-600
                    hover:text-zinc-50
                    transition-colors duration-300 ease-in-out'
                    to='/homepage'>Home</Link>
                <Link
                    className='flex px-4 items-center rounded-md text-purple-950
                    hover:bg-purple-600
                    hover:text-zinc-50
                    transition-colors duration-300 ease-in-out'
                    to='/cars'>Cars</Link>
                <Link
                    className='flex px-4 items-center rounded-md text-purple-950
                    hover:bg-purple-600
                    hover:text-zinc-50
                    transition-colors duration-300 ease-in-out'
                    to={`/wishlist`}>Wishlist</Link>

                <Link
                    className='flex px-4 items-center rounded-md text-purple-950
                    hover:bg-purple-600
                    hover:text-zinc-50
                    transition-colors duration-300 ease-in-out'
                    to={`/orders`}>Orders</Link>

                {token ? (
                    <div
                        className='relative flex px-4 items-center rounded-md text-purple-950
                    hover:bg-purple-600
                    hover:text-zinc-50
                    transition-colors duration-300 ease-in-out cursor-pointer'
                        onClick={toggleDropdown}>Hi, {user.fullName}!
                        {isDropdownOpen && (
                            <div ref={dropdownRef} className='absolute top-16 right-0 bg-white shadow-md rounded-md p-2 z-50'>
                                <Link to={`/profile`} className='block w-full rounded text-purple-950 text-left mb-2 py-2 px-4 hover:bg-purple-600 hover:text-white duration-300 ease-in-out'>
                                    Profile
                                </Link>
                                <button onClick={handleLogout} className='block w-full rounded text-purple-950 text-left py-2 px-4 hover:bg-red-500 hover:text-white duration-300 ease-in-out'>
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <Link
                        className='flex px-4 items-center rounded-md text-purple-950
                        hover:bg-purple-600
                        hover:text-zinc-50
                        transition-colors duration-300 ease-in-out'
                        to='/'>Login</Link>
                )}
            </div>
        </nav>
    )
}
