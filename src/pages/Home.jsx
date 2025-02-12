import React from 'react';
import Hero from '../components/sections/Hero/Hero';
import Services from '../components/sections/Services/Services';
import About from '../components/sections/About/About';
import Portfolio from '../components/sections/Portfolio/ProjectGallery';
import Testimonials from '../components/sections/Testimonials/Testimonials';
import Stats from '../components/sections/Stats/Stats';
import ClientLogos from '../components/sections/ClientLogos/ClientLogos';
import BookingSystem from '../components/sections/Booking/BookingSystem';

const Home = () => {
  return (
    <>
      <Hero />
      <Services />
      <About />
      <Portfolio />
      <Testimonials />
      <Stats />
      <ClientLogos />
      <BookingSystem />
    </>
  );
};

export default Home; 