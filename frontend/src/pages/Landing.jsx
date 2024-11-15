import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';

const Landing = () => {
  document.title = 'Local Services Marketplace'
  return (
    <div>
        <Navbar/>
        <Hero/>
    </div>
  )
}

export default Landing;