import React from 'react';
import { UserCheck, Search, MapPin, Shield } from 'lucide-react';

const Features: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-neutral-dark">Why Choose PharmaLink</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            We provide reliable, doctor-verified information to help you make informed decisions about your medications.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard 
            icon={<UserCheck />} 
            title="Doctor Verified" 
            description="All information is reviewed and verified by licensed medical professionals."
          />
          
          <FeatureCard 
            icon={<Search />} 
            title="Easy Search" 
            description="Find medicines by name or symptoms with our powerful search functionality."
          />
          
          <FeatureCard 
            icon={<MapPin />} 
            title="Pharmacy Locator" 
            description="Easily find nearby pharmacies to fill your prescriptions quickly."
          />
          
          <FeatureCard 
            icon={<Shield />} 
            title="Trusted Source" 
            description="Reliable and up-to-date information you can trust for your health needs."
          />
        </div>
      </div>
    </section>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-center w-12 h-12 rounded-md bg-primary text-white mb-4 mx-auto">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-neutral-dark text-center mb-2">{title}</h3>
      <p className="text-gray-600 text-center">{description}</p>
    </div>
  );
};

export default Features;
