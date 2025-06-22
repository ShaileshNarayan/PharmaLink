import React from 'react';
import { CheckCircle } from 'lucide-react';

interface DoctorVerifiedBadgeProps {
  className?: string;
}

const DoctorVerifiedBadge: React.FC<DoctorVerifiedBadgeProps> = ({ className }) => {
  return (
    <div className={`bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center shadow-md ${className}`}>
      <CheckCircle className="h-3.5 w-3.5 mr-1.5" />
      Doctor Verified
    </div>
  );
};

export default DoctorVerifiedBadge;


