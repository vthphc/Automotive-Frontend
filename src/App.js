import React from 'react'
import { Routes, Route } from 'react-router-dom';

import HomePage from './ui/HomePage'
import Introduction from './ui/Introduction'
import Cars from './ui/Cars';
import CarDetails from './components/CarDetails';
import NavBar from './components/NavBar';
import Welcome from './ui/Welcome';
import Wishlist from './ui/Wishlist';
import Orders from './ui/Orders';
import Profile from './ui/Profile';
import SignUp from './ui/SignUp';
import AddAddress from './components/AddAddress/index.js';

import './App.css';
import Checkout from './ui/Checkout/index.js';

export default function App() {
  return (
    <div className='fixed-nav'>
      <NavBar className='' />
      <Routes>
        <Route path='/' element={<Welcome />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/homepage' element={<HomePage />} />
        <Route path='/introduction' element={<Introduction />} />
        <Route path='/cars' element={<Cars />} />
        <Route path='/cars/:id' element={<CarDetails />} />
        <Route path='/wishlist' element={<Wishlist />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/add-address' element={<AddAddress />} />
        <Route path='/checkout/:id' element={<Checkout />} />
        <Route path='*' element={
          <div className='flex justify-center h-[35rem] items-center'>
            <h1 className='text-4xl font-bold'>sorry, page not found</h1>
            <img
              className='w-[34rem]'
              src='https://static.vecteezy.com/system/resources/previews/003/337/475/original/404-error-concept-illustration-free-vector.jpg'
              alt='404 Not Found' />
          </div>
        } />
      </Routes>
    </div>
  )
}
