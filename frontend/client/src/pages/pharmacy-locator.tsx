import React, { useEffect, useRef, useState } from "react";
import { Button } from '@/components/ui/button';

interface Pharmacy {
  name: string;
  lat: number;
  lng: number;
  stock: boolean;
}

const PharmacyLocator: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [location, setLocation] = useState("");
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [pharmacies, setPharmacies] = useState<Pharmacy[]>([]);

  // Fetch nearby pharmacies from backend based on lat/lng
  const fetchPharmacies = (lat: number, lng: number) => {
    fetch(`http://localhost:8000/api/pharmacies/?lat=${lat}&lng=${lng}`)
      .then((res) => res.json())
      .then((data) => {
        setPharmacies(data);
        if (map) {
          map.setCenter({ lat, lng });
        }
      });
  };

  // Geocode location string to coordinates
  const handleSearch = () => {
    if (!window.google) return;
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: location }, (results, status) => {
      if (status === "OK" && results && results[0]) {
        const { lat, lng } = results[0].geometry.location;
        fetchPharmacies(lat(), lng());
      } else {
        alert("Location not found");
      }
    });
  };

  // Initialize map on mount
  useEffect(() => {
    if (mapRef.current && !map && window.google) {
      const initialMap = new window.google.maps.Map(mapRef.current, {
        center: { lat: 13.0827, lng: 80.2707 }, // Default: Chennai
        zoom: 13,
      });
      setMap(initialMap);
    }
  }, [mapRef, map]);

  // Display markers
  useEffect(() => {
  if (!map || !window.google) return;

  const infoWindow = new window.google.maps.InfoWindow();

  pharmacies.forEach((pharmacy) => {
    const marker = new window.google.maps.Marker({
  position: { lat: pharmacy.lat, lng: pharmacy.lng },
  map,
  title: pharmacy.name,
  icon: {
    url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
    scaledSize: new window.google.maps.Size(38, 38),
  },
});


    const content = `
      <div style="font-family: sans-serif;">
        <strong>${pharmacy.name}</strong><br/>
        ${pharmacy.address}<br/>
        Phone: <a href="tel:${pharmacy.phone}" style="color:blue;text-decoration:underline;">
          ${pharmacy.phone || 'N/A'}
        </a>
      </div>
    `;

    marker.addListener("click", () => {
      infoWindow.setContent(content);
      infoWindow.open(map, marker);
    });
  });
}, [pharmacies, map]);



  return (
    <div className="bg-white p-6 rounded-xl shadow-md border max-w-4xl mx-auto">
  <h2 className="text-xl font-semibold mb-4 text-neutral-dark">
    Search Pharmacies Near You
  </h2>
  <div className="flex gap-2 mb-6">
    <input
      className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      type="text"
      placeholder="Enter your location..."
      value={location}
      onChange={(e) => setLocation(e.target.value)}
    />
    <Button className="hidden md:block"
      onClick={handleSearch}
      // className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
    >
      Search
    </Button>
  </div>
  <div
    ref={mapRef}
    className="rounded-lg overflow-hidden border shadow-sm"
    style={{ width: '100%', height: '450px' }}
  />
</div>

  );
};

export default PharmacyLocator;
