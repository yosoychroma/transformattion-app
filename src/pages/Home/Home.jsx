import React from 'react';
import Hero from '../../components/sections/Hero/Hero';
import About from '../../components/sections/About/About';
import Services from '../../components/sections/Services/Services';
import Testimonials from '../../components/sections/Testimonials/Testimonials';
import ProjectGallery from '../../components/sections/Portfolio/ProjectGallery';
import BookingSystem from '../../components/sections/Booking/BookingSystem';

const Home = () => {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <ProjectGallery />
      <Testimonials />
      <BookingSystem />
    </>
  );
};

export default Home; 