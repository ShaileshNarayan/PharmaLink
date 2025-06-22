import React from 'react';
import SearchBar from './SearchBar';

const Hero: React.FC = () => {
  return (
    <section className="bg-gradient-to-r from-blue-50 to-indigo-50 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-dark mb-4">
            Find Reliable Information About Medicines
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Search for medications by name or symptoms to get doctor-verified information.
          </p>
          
          <SearchBar />
        </div>
      </div>
    </section>
  );
};

export default Hero;

