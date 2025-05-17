// src/pages/HomePage.jsx
import React from 'react';
import Hero from '../components/Hero';
import RanksSlider from '../components/RanksSlider';
// import './HomePage.css'; // Если нужны специфичные стили для HomePage

const HomePage = () => {
  return (
    <main>
      <Hero />
      <RanksSlider />
      {/* Здесь могут быть другие секции */}
    </main>
  );
};

export default HomePage;