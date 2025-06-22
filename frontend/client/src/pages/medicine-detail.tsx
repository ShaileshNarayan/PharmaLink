import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams, useLocation } from 'wouter';
import MedicineDetail from '@/components/medicine/MedicineDetail';

const MedicineDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [_, navigate] = useLocation();
  
  const { data: medicine, isLoading, error } = useQuery({
    queryKey: [`/api/medicines/${id}`],
    queryFn: async () => {
      return fetch(`/api/medicines/${id}`).then(res => res.json());
    }
  });
  
  const handleBack = () => {
    navigate('/');
  };
  
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-xl">Loading medicine information...</p>
      </div>
    );
  }
  
  if (error || !medicine) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Medicine Not Found</h2>
        <p className="text-gray-600 mb-6">
          The medicine you're looking for could not be found or an error occurred.
        </p>
        <button 
          onClick={handleBack}
          className="bg-primary text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Return to Home
        </button>
      </div>
    );
  }
  
  return <MedicineDetail medicine={medicine} onBack={handleBack} />;
};

export default MedicineDetailPage;
