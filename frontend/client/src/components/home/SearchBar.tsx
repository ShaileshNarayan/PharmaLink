// import React, { useState } from 'react';
// import { Search, X } from 'lucide-react';
// import { useLocation } from 'wouter';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';

// interface SearchBarProps {
//   className?: string;
// }

// const SearchBar: React.FC<SearchBarProps> = ({ className }) => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [_, navigate] = useLocation();

//   const handleSearch = () => {
//     if (searchQuery.trim()) {
//       navigate(`/?search=${encodeURIComponent(searchQuery)}`);
//     }
//   };

//   const handleKeyPress = (e: React.KeyboardEvent) => {
//     if (e.key === 'Enter') {
//       handleSearch();
//     }
//   };

//   const clearSearch = () => {
//     setSearchQuery('');
//   };

//   return (
//     <div className={`bg-white p-4 rounded-lg shadow-lg ${className}`}>
//       <div className="flex flex-col">
//         <div className="flex-1">
//           <div className="relative">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <Search className="h-5 w-5 text-neutral-gray" />
//             </div>
//             <Input
//               type="text"
//               className="pl-10 pr-10 py-6 text-lg"
//               placeholder="Search medicine by name or symptoms..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               onKeyPress={handleKeyPress}
//             />
//             {searchQuery.length > 0 && (
//               <button 
//                 className="absolute inset-y-0 right-0 pr-3 flex items-center" 
//                 onClick={clearSearch}
//                 type="button"
//               >
//                 <X className="h-5 w-5 text-neutral-gray hover:text-neutral-dark" />
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//       <div className="mt-4">
//         <Button 
//           className="w-full md:w-auto py-6" 
//           size="lg" 
//           onClick={handleSearch}
//         >
//           Search Medicines
//         </Button>
//       </div>
//       <div className="mt-2 text-center text-sm text-gray-500">
//         Example: "Paracetamol", "Headache", "Allergy relief"
//       </div>
//     </div>
//   );
// };

// export default SearchBar;

import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface SearchBarProps {
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ className }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, navigate] = useLocation();

  // Set input state if there's a query param already
  useEffect(() => {
    const query = new URLSearchParams(location.split('?')[1]);
    const existing = query.get('search') || '';
    setSearchQuery(existing);
  }, [location]);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    navigate('/'); // resets the search by navigating to root
  };

  return (
    <div className={`bg-white p-4 rounded-lg shadow-lg ${className}`}>
      <div className="flex flex-col">
        <div className="flex-1">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-neutral-gray" />
            </div>
            <Input
              type="text"
              className="pl-10 pr-10 py-6 text-lg"
              placeholder="Search medicine by name or symptoms..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            {searchQuery.length > 0 && (
              <button 
                className="absolute inset-y-0 right-0 pr-3 flex items-center" 
                onClick={clearSearch}
                type="button"
              >
                <X className="h-5 w-5 text-neutral-gray hover:text-neutral-dark" />
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="mt-4">
        <Button 
          className="w-full md:w-auto py-6" 
          size="lg" 
          onClick={handleSearch}
        >
          Search Medicines
        </Button>
      </div>
      <div className="mt-2 text-center text-sm text-gray-500">
        Example: "Paracetamol", "Headache"
      </div>
    </div>
  );
};

export default SearchBar;
