// import React, { useState } from 'react';
// import { useQuery } from '@tanstack/react-query';
// import { useSearch } from 'wouter';
// import Hero from '@/components/home/Hero';
// import MedicineCard from '@/components/medicine/MedicineCard';
// import Features from '@/components/home/Features';
// import CallToAction from '@/components/home/CallToAction';
// import fallbackImage from "../assets/medicine-placeholder.jpg";
// import { X } from 'lucide-react';

// function extractTextFromBlocks(blocks: any): string {
//   try {
//     return blocks?.[0]?.children?.[0]?.text?.trim() || "No description available.";
//   } catch {
//     return "No description available.";
//   }
// }

// const symptomSuggestions = ['head ache', 'fever', 'anxiety', 'body pain'];

// const Home: React.FC = () => {
//   const search = useSearch();
//   const combinedSearchQuery = new URLSearchParams(search).get('search') || '';

//   const [showAll, setShowAll] = useState(false);
//   const [selectedSymptom, setSelectedSymptom] = useState('');
//   const [selectedSimilar, setSelectedSimilar] = useState('');
//   const [sortOrder, setSortOrder] = useState('');

//   const { data: medicines = [], isLoading } = useQuery({
//     queryKey: ["medicines"],
//     queryFn: async () => {
//       const res = await fetch("http://localhost:1337/api/medicines?populate=*");
//       const json = await res.json();
//       return json.data;
//     }
//   });

//   const filteredMedicines = medicines
//     .filter((item: any) => {
//       const nameMatch = item.name.toLowerCase().includes(combinedSearchQuery.toLowerCase());
//       const symptomMatch = selectedSymptom
//         ? item.symptoms?.toLowerCase().includes(selectedSymptom.toLowerCase())
//         : true;
//       const similarMatch = selectedSimilar
//         ? item.similarMedicines?.some((med: any) =>
//             med.name.toLowerCase().includes(selectedSimilar.toLowerCase())
//           )
//         : true;
//       return nameMatch && symptomMatch && similarMatch;
//     })
//     .sort((a: any, b: any) => {
//       if (sortOrder === 'asc') return a.name.localeCompare(b.name);
//       if (sortOrder === 'desc') return b.name.localeCompare(a.name);
//       return 0;
//     });

//   const clearSymptom = () => setSelectedSymptom('');
//   const clearSimilar = () => setSelectedSimilar('');
//   const clearAll = () => {
//     setSelectedSymptom('');
//     setSelectedSimilar('');
//     setSortOrder('');
//   };

//   return (
//     <>
//       <Hero />

//       <section id="medicines" className="py-16 bg-white">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">

//           {/* Applied filters */}
//           {(selectedSymptom || selectedSimilar || sortOrder) && (
//             <div className="mb-6 flex flex-wrap gap-2 justify-center">
//               {selectedSymptom && (
//                 <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center gap-1">
//                   Symptom: {selectedSymptom} <X className="h-4 w-4 cursor-pointer" onClick={clearSymptom} />
//                 </span>
//               )}
//               {selectedSimilar && (
//                 <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm flex items-center gap-1">
//                   Similar: {selectedSimilar} <X className="h-4 w-4 cursor-pointer" onClick={clearSimilar} />
//                 </span>
//               )}
//               {sortOrder && (
//                 <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm flex items-center gap-1">
//                   Sort: {sortOrder === 'asc' ? 'A → Z' : 'Z → A'}
//                   <X className="h-4 w-4 cursor-pointer" onClick={() => setSortOrder('')} />
//                 </span>
//               )}
//               <button onClick={clearAll} className="ml-2 text-sm underline text-gray-600">Clear all</button>
//             </div>
//           )}

//           {/* Sort & Filter Inputs */}
//           <div className="mb-8 flex flex-col md:flex-row gap-4 justify-center">
//             <input
//               type="text"
//               placeholder="Filter by symptom..."
//               value={selectedSymptom}
//               onChange={(e) => setSelectedSymptom(e.target.value)}
//               className="px-4 py-2 border rounded-md w-full md:w-1/3"
//             />
//             <input
//               type="text"
//               placeholder="Filter by similar medicine..."
//               value={selectedSimilar}
//               onChange={(e) => setSelectedSimilar(e.target.value)}
//               className="px-4 py-2 border rounded-md w-full md:w-1/3"
//             />
//             <select
//               value={sortOrder}
//               onChange={(e) => setSortOrder(e.target.value)}
//               className="px-4 py-2 border rounded-md w-full md:w-1/4"
//             >
//               <option value="">Sort by Name</option>
//               <option value="asc">A → Z</option>
//               <option value="desc">Z → A</option>
//             </select>
//           </div>

//           {/* Suggested symptom filters */}
//           <div className="mb-6 flex flex-wrap justify-center gap-3">
//             {symptomSuggestions.map((symptom) => (
//               <button
//                 key={symptom}
//                 className={`px-3 py-1 rounded-full border ${
//                   selectedSymptom === symptom ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'
//                 } hover:bg-blue-100 transition text-sm`}
//                 onClick={() => setSelectedSymptom(symptom)}
//               >
//                 {symptom}
//               </button>
//             ))}
//           </div>

//           {/* Cards */}
//           {isLoading ? (
//             <div className="text-center py-12">
//               <p className="text-lg text-gray-600">Loading medicines...</p>
//             </div>
//           ) : filteredMedicines.length > 0 ? (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//               {(showAll ? filteredMedicines : filteredMedicines.slice(0, 6)).map((item: any) => {
//                 try {
//                   const doctorName = item.Added_by?.name || 'Doctor';
//                   const name = item.name;
//                   const summary = extractTextFromBlocks(item.overview);
//                   const imageUrl = item.image?.url
//                     ? `http://localhost:1337${item.image.url}`
//                     : fallbackImage;

//                   return (
//                     <MedicineCard
//                       key={item.id}
//                       medicine={{
//                         id: item.id,
//                         documentId: item.documentId,
//                         name,
//                         summary,
//                         imageUrl,
//                         doctorName,
//                       }}
//                     />
//                   );
//                 } catch (err) {
//                   console.warn("Error rendering medicine item:", item, err);
//                   return null;
//                 }
//               })}
//             </div>
//           ) : (
//             <div className="text-center py-12">
//               <p className="text-lg text-gray-600">No medicines found. Try a different search term.</p>
//             </div>
//           )}

//           <div className="text-center mt-12">
//             <button
//               onClick={() => setShowAll(!showAll)}
//               className="bg-white text-primary hover:bg-gray-50 font-medium py-3 px-6 rounded-md border border-primary transition duration-150 ease-in-out"
//             >
//               {showAll ? "Show Less" : "View All Medicines"}
//             </button>
//           </div>
//         </div>
//       </section>

//       <Features />
//       <CallToAction />
//     </>
//   );
// };

// export default Home;

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearch } from 'wouter';
import Hero from '@/components/home/Hero';
import MedicineCard from '@/components/medicine/MedicineCard';
import Features from '@/components/home/Features';
import CallToAction from '@/components/home/CallToAction';
import fallbackImage from "../assets/medicine-placeholder.jpg";
import { X } from 'lucide-react';

function extractTextFromBlocks(blocks: any): string {
  try {
    return blocks?.[0]?.children?.[0]?.text?.trim() || "No description available.";
  } catch {
    return "No description available.";
  }
}

const symptomSuggestions = ['headache', 'fever', 'anxiety', 'body pain'];

const Home: React.FC = () => {
  const search = useSearch();
  const combinedSearchQuery = new URLSearchParams(search).get('search') || '';

  const [showAll, setShowAll] = useState(false);
  const [selectedSymptom, setSelectedSymptom] = useState('');
  const [sortOrder, setSortOrder] = useState('');

  const { data: medicines = [], isLoading } = useQuery({
    queryKey: ["medicines"],
    queryFn: async () => {
      const res = await fetch("http://localhost:1337/api/medicines?populate=*");
      const json = await res.json();
      return json.data;
    }
  });

  const filteredMedicines = medicines
    .filter((item: any) => {
      const query = combinedSearchQuery.toLowerCase();
      const nameMatch = item.name.toLowerCase().includes(query);
      const symptomSearchMatch = item.symptoms?.toLowerCase().includes(query);

      const symptomFilterMatch = selectedSymptom
        ? item.symptoms?.toLowerCase().includes(selectedSymptom.toLowerCase())
        : true;

      return (nameMatch || symptomSearchMatch) && symptomFilterMatch;
    })
    .sort((a: any, b: any) => {
      if (sortOrder === 'asc') return a.name.localeCompare(b.name);
      if (sortOrder === 'desc') return b.name.localeCompare(a.name);
      return 0;
    });

  const clearSymptom = () => setSelectedSymptom('');
  const clearAll = () => {
    setSelectedSymptom('');
    setSortOrder('');
  };

  return (
    <>
      <Hero />

      <section id="medicines" className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">

          {/* Applied filters */}
          {(selectedSymptom || sortOrder) && (
            <div className="mb-6 flex flex-wrap gap-2 justify-center">
              {selectedSymptom && (
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                  Symptom: {selectedSymptom} <X className="h-4 w-4 cursor-pointer" onClick={clearSymptom} />
                </span>
              )}
              {sortOrder && (
                <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                  Sort: {sortOrder === 'asc' ? 'A → Z' : 'Z → A'}
                  <X className="h-4 w-4 cursor-pointer" onClick={() => setSortOrder('')} />
                </span>
              )}
              <button onClick={clearAll} className="ml-2 text-sm underline text-gray-600">Clear all</button>
            </div>
          )}

          {/* Sort & Filter Inputs */}
          <div className="mb-8 flex flex-col md:flex-row gap-4 justify-center">
            <input
              type="text"
              placeholder="Filter by symptom..."
              value={selectedSymptom}
              onChange={(e) => setSelectedSymptom(e.target.value)}
              className="px-4 py-2 border rounded-md w-full md:w-1/3"
            />
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="px-4 py-2 border rounded-md w-full md:w-1/4"
            >
              <option value="">Sort by Name</option>
              <option value="asc">A → Z</option>
              <option value="desc">Z → A</option>
            </select>
          </div>

          {/* Suggested symptom filters */}
          <div className="mb-6 flex flex-wrap justify-center gap-3">
            {symptomSuggestions.map((symptom) => (
              <button
                key={symptom}
                className={`px-3 py-1 rounded-full border ${
                  selectedSymptom === symptom ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'
                } hover:bg-blue-100 transition text-sm`}
                onClick={() => setSelectedSymptom(symptom)}
              >
                {symptom}
              </button>
            ))}
          </div>

          {/* Cards */}
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600">Loading medicines...</p>
            </div>
          ) : filteredMedicines.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(showAll ? filteredMedicines : filteredMedicines.slice(0, 6)).map((item: any) => {
                try {
                  const doctorName = item.Added_by?.name || 'Doctor';
                  const name = item.name;
                  const summary = extractTextFromBlocks(item.overview);
                  const imageUrl = item.image?.url
                    ? `http://localhost:1337${item.image.url}`
                    : fallbackImage;

                  return (
                    <MedicineCard
                      key={item.id}
                      medicine={{
                        id: item.id,
                        documentId: item.documentId,
                        name,
                        summary,
                        imageUrl,
                        doctorName,
                      }}
                    />
                  );
                } catch (err) {
                  console.warn("Error rendering medicine item:", item, err);
                  return null;
                }
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600">No medicines found. Try a different search term.</p>
            </div>
          )}

          <div className="text-center mt-12">
            <button
              onClick={() => setShowAll(!showAll)}
              className="bg-white text-primary hover:bg-gray-50 font-medium py-3 px-6 rounded-md border border-primary transition duration-150 ease-in-out"
            >
              {showAll ? "Show Less" : "View All Medicines"}
            </button>
          </div>
        </div>
      </section>

      <Features />
      <CallToAction />
    </>
  );
};

export default Home;
