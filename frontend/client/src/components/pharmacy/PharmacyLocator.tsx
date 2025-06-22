import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { MapPin, Clock, User } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Pharmacy } from '@shared/schema';

interface PharmacyLocatorProps {
  medicineId?: string;
}

const PharmacyLocator: React.FC<PharmacyLocatorProps> = ({ medicineId }) => {
  const [locationQuery, setLocationQuery] = useState('');
  
  const { data: pharmacies, isLoading } = useQuery({
    queryKey: ['/api/pharmacies'],
    queryFn: async () => {
      return fetch('/api/pharmacies').then(res => res.json());
    }
  });
  
  const handleSearch = () => {
    // This would normally use the location to find nearby pharmacies
    console.log('Searching for pharmacies near:', locationQuery);
  };
  
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-neutral-dark">Find a Pharmacy Near You</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            {medicineId 
              ? "Locate nearby pharmacies to fill your prescription."
              : "Locate nearby pharmacies to fill your prescriptions and get the medications you need."}
          </p>
        </div>
        
        <Card className="bg-gray-50">
          <CardContent className="p-6">
            <div className="mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPin className="h-5 w-5 text-gray-500" />
                    </div>
                    <Input
                      type="text"
                      className="pl-10 pr-3 py-6"
                      placeholder="Enter your location or ZIP code"
                      value={locationQuery}
                      onChange={(e) => setLocationQuery(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <Button 
                    className="w-full md:w-auto py-6"
                    onClick={handleSearch}
                  >
                    Search Pharmacies
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="md:flex">
              {/* Map Container */}
              <div className="md:w-2/3 bg-gray-200 rounded-lg overflow-hidden h-96 md:mr-6 mb-6 md:mb-0 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                    <p className="text-neutral-dark font-medium">Interactive Map Would Load Here</p>
                    <p className="text-sm text-gray-600">Showing nearby pharmacies based on your location</p>
                  </div>
                </div>
              </div>
              
              {/* Pharmacy List */}
              <div className="md:w-1/3 bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="p-4 bg-gray-50 border-b border-gray-200">
                  <h3 className="font-medium text-neutral-dark">Nearby Pharmacies</h3>
                </div>
                
                <div className="overflow-y-auto h-80">
                  {isLoading ? (
                    <div className="p-4 text-center">
                      <p className="text-gray-600">Loading pharmacies...</p>
                    </div>
                  ) : pharmacies && pharmacies.length > 0 ? (
                    pharmacies.map((pharmacy: Pharmacy) => (
                      <PharmacyListItem key={pharmacy.id} pharmacy={pharmacy} />
                    ))
                  ) : (
                    <div className="p-4 text-center">
                      <p className="text-gray-600">No pharmacies found. Try a different location.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

interface PharmacyListItemProps {
  pharmacy: Pharmacy;
}

const PharmacyListItem: React.FC<PharmacyListItemProps> = ({ pharmacy }) => {
  return (
    <div className="p-4 border-b border-gray-200 hover:bg-gray-50 cursor-pointer">
      <h4 className="font-medium text-neutral-dark">{pharmacy.name}</h4>
      <p className="text-sm text-gray-600 mb-2">{pharmacy.address}, {pharmacy.city}, {pharmacy.state} {pharmacy.zipCode}</p>
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-600 flex items-center">
          <Clock className="h-3 w-3 mr-1" /> {pharmacy.hours}
        </span>
        <span className="text-sm text-gray-600 flex items-center">
          <User className="h-3 w-3 mr-1" /> {pharmacy.distance}
        </span>
      </div>
    </div>
  );
};

export default PharmacyLocator;
