import React from 'react';
import { useLocation } from 'wouter';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import DoctorVerifiedBadge from '@/components/ui/doctor-verified-badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star, StarHalf, Image } from 'lucide-react';
import { Medicine } from '@shared/schema';
import { CheckCircle } from 'lucide-react';

interface MedicineCardProps {
  medicine: {
    id: number;
    documentId: string;
    name: string;
    imageUrl: string | null;
    summary: string;
    rating?: number;
    categories?: string[];
    doctorName?:string;
  };
}


const MedicineCard: React.FC<MedicineCardProps> = ({ medicine }) => {
  const [_, navigate] = useLocation();
  
  const handleViewDetails = () => {
    navigate(`/medicine/${medicine.documentId}`);
  };
  
  // Default rating if none provided
  const rating = medicine.rating || 4;
  
  return (
    <Card 
      className="overflow-hidden border border-gray-100 hover:shadow-lg transition duration-300 cursor-pointer"
      onClick={handleViewDetails}
    >
      <div className="relative">
  {medicine.imageUrl ? (
    <img 
      src={medicine.imageUrl as string}
      alt={`${medicine.name} medication`} 
      className="w-full h-48 object-cover"
    />
  ) : (
    <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
      <Image className="h-12 w-12 text-gray-400" />
    </div>
  )}
  <div className="absolute top-4 right-4 flex items-center space-x-1 text-right">
    <Badge>{medicine.doctorName || 'Doctor'}</Badge>
    <DoctorVerifiedBadge />
</div>

</div>

      <CardContent className="p-6">
        <h3 className="text-xl font-bold text-neutral-dark mb-2">{medicine.name}</h3>
        <p className="text-gray-600 mb-4">
          {medicine.summary ? 
             `${medicine.summary.substring(0, 100)}...` : 
              'No description available.'}

        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {medicine.categories && medicine.categories.length > 0 ? 
            medicine.categories.slice(0, 3).map((category, index) => (
              <Badge key={index} variant="outline">{category}</Badge>
            )) : 
            <Badge variant="outline">General</Badge>
          }
        </div>
        <div className="flex justify-between items-center">
          <div 
            className="text-primary hover:text-blue-700 font-medium flex items-center"
          >
            View Details <ArrowRight className="ml-2 h-4 w-4" />
          </div>
          <div className="flex items-center text-amber-500">
            {[...Array(Math.floor(rating))].map((_, i) => (
              <Star key={i} className="fill-current h-4 w-4" />
            ))}
            {rating % 1 >= 0.5 && (
              <StarHalf className="fill-current h-4 w-4" />
            )}
            <span className="ml-1 text-gray-600 text-sm">(487)</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MedicineCard;
