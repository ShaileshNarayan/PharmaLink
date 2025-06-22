import React from 'react';
import { Button } from '@/components/ui/button';
import { Smartphone, DownloadCloud } from 'lucide-react';

const CallToAction: React.FC = () => {
  return (
    <section className="py-16 bg-primary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center text-white max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Get the PharmaLink Mobile App</h2>
          <p className="text-lg opacity-90 mb-8">
            Access reliable medicine information anytime, anywhere. Download our free mobile app today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              variant="secondary" 
              className="bg-white text-primary hover:bg-gray-100 font-medium flex items-center justify-center"
            >
              <Smartphone className="mr-2 h-5 w-5" /> App Store
            </Button>
            <Button 
              variant="secondary" 
              className="bg-white text-primary hover:bg-gray-100 font-medium flex items-center justify-center"
            >
              <DownloadCloud className="mr-2 h-5 w-5" /> Google Play
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
