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

import './App.css';

export default function App() {
  return (
    <div className='fixed-nav'>
      <NavBar className='' />
      <Routes>
        <Route path='/' element={<Welcome />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/homepage' element={<HomePage />} />
        <Route path='/introduction' element={<Introduction />} />
        <Route path='/cars' element={<Cars />} />
        <Route path='/cars/:id' element={<CarDetails />} />
        <Route path='/wishlist' element={<Wishlist />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </div>
  )
}
