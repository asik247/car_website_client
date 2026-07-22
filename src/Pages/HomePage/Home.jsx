import React from 'react';
import Hero1 from '../Heros/Hero1';
import FeaturedCars from '../FeaturedCars/FeaturedCars';

const Home = () => {
    return (
        <div>
          {/* hero 1  */}
          <Hero1></Hero1>
          {/* Featured cars */}
          <FeaturedCars></FeaturedCars>
        </div>
    );
};

export default Home;